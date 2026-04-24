import { Pool } from '@neondatabase/serverless';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL env var is required.');
  process.exit(1);
}

const schemaPath = join(__dirname, '..', 'lib', 'ifex', 'schema.sql');
const schema = readFileSync(schemaPath, 'utf8');

const pool = new Pool({ connectionString: url });

try {
  console.log('Applying ifex schema…');
  await pool.query(schema);
  console.log('Schema applied successfully.');

  const tables = await pool.query(`
    select table_name
    from information_schema.tables
    where table_schema = 'public' and table_name like 'ifex_%'
    order by table_name
  `);
  console.log('Ifex tables:', tables.rows.map((r) => r.table_name).join(', '));
} catch (err) {
  console.error('Migration failed:', err);
  process.exitCode = 1;
} finally {
  await pool.end();
}
