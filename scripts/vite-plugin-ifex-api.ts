import type { Plugin, ViteDevServer } from 'vite';
import type { IncomingMessage, ServerResponse } from 'node:http';

/**
 * Local dev plugin that mounts the Edge-style handlers in api/ifex/*.ts
 * as real routes on the Vite dev server. Lets us test without vercel CLI.
 *
 * The handlers export a default (req: Request) => Response (or Promise<Response>).
 */
export function ifexApiPlugin(): Plugin {
  const routes: Record<string, string> = {
    '/api/ifex/chat': '/api/ifex/chat.ts',
    '/api/ifex/wrap': '/api/ifex/wrap.ts',
  };

  return {
    name: 'ifex-api',
    apply: 'serve',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0] ?? '';
        const modulePath = routes[url];
        if (!modulePath) return next();

        try {
          const mod = await server.ssrLoadModule(modulePath);
          const handler = mod.default as (req: Request) => Promise<Response> | Response;
          if (typeof handler !== 'function') {
            res.statusCode = 500;
            res.end('Handler not found');
            return;
          }

          const webReq = await toWebRequest(req);
          const webRes = await handler(webReq);
          await writeWebResponse(webRes, res);
        } catch (err) {
          console.error(`[ifex-api] ${url} failed:`, err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: (err as Error).message }));
          }
        }
      });
    },
  };
}

async function toWebRequest(req: IncomingMessage): Promise<Request> {
  const host = req.headers.host ?? 'localhost';
  const protocol = 'http';
  const url = `${protocol}://${host}${req.url ?? '/'}`;

  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (Array.isArray(v)) headers.set(k, v.join(', '));
    else if (v != null) headers.set(k, v);
  }

  const method = (req.method ?? 'GET').toUpperCase();
  let body: BodyInit | undefined;
  if (method !== 'GET' && method !== 'HEAD') {
    const chunks: Buffer[] = [];
    for await (const c of req) chunks.push(c as Buffer);
    if (chunks.length) body = Buffer.concat(chunks);
  }

  return new Request(url, { method, headers, body, duplex: 'half' } as RequestInit & { duplex?: 'half' });
}

async function writeWebResponse(webRes: Response, nodeRes: ServerResponse): Promise<void> {
  nodeRes.statusCode = webRes.status;
  webRes.headers.forEach((value, key) => {
    nodeRes.setHeader(key, value);
  });

  if (!webRes.body) {
    nodeRes.end();
    return;
  }

  const reader = webRes.body.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      nodeRes.write(Buffer.from(value));
      // Flush SSE events immediately.
      const flushable = nodeRes as ServerResponse & { flush?: () => void };
      if (typeof flushable.flush === 'function') flushable.flush();
    }
  } finally {
    nodeRes.end();
  }
}
