import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Light-touch .env loader so this script works outside of Vite.
function loadEnv(path) {
  if (!existsSync(path)) return;
  const content = readFileSync(path, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnv(join(__dirname, '..', '.env.local'));
loadEnv(join(__dirname, '..', '.env'));

const LOGIN = 'ifeobi';
const OUT_PATH = join(__dirname, '..', 'lib', 'ifex', 'github-stats.json');
const token = process.env.GITHUB_TOKEN;

if (!token) {
  console.warn('[github-stats] GITHUB_TOKEN not set — skipping refresh, keeping existing snapshot.');
  process.exit(0);
}

const now = new Date();
const startOfYear = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));

const query = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      createdAt
      repositories(privacy: PUBLIC) { totalCount }
      contributionsCollection {
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { date contributionCount }
          }
        }
      }
      thisYear: contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        contributionCalendar { totalContributions }
      }
    }
  }
`;

let data;
try {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'ifex-portfolio',
    },
    body: JSON.stringify({
      query,
      variables: { login: LOGIN, from: startOfYear.toISOString(), to: now.toISOString() },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.warn(`[github-stats] API ${res.status}: ${text}. Keeping existing snapshot.`);
    process.exit(0);
  }

  const payload = await res.json();
  if (payload.errors) {
    console.warn('[github-stats] GraphQL errors:', JSON.stringify(payload.errors));
    process.exit(0);
  }
  data = payload.data;
} catch (err) {
  console.warn('[github-stats] Network error, keeping existing snapshot:', err.message);
  process.exit(0);
}

const user = data.user;
if (!user) {
  console.warn('[github-stats] No user in response, keeping existing snapshot.');
  process.exit(0);
}

const cal = user.contributionsCollection.contributionCalendar;
const days = cal.weeks.flatMap((w) => w.contributionDays);

// Longest streak across the full window.
let longestStreak = 0;
let running = 0;
let lastActiveDate = null;
for (const d of days) {
  if (d.contributionCount > 0) {
    running += 1;
    longestStreak = Math.max(longestStreak, running);
    lastActiveDate = d.date;
  } else {
    running = 0;
  }
}

// Current streak: count consecutive active days from today backward.
let currentStreak = 0;
for (let i = days.length - 1; i >= 0; i--) {
  if (days[i].contributionCount > 0) currentStreak += 1;
  else break;
}

const snapshot = {
  generatedAt: now.toISOString(),
  login: LOGIN,
  createdAt: user.createdAt,
  publicRepos: user.repositories.totalCount,
  lastTwelveMonths: {
    totalContributions: cal.totalContributions,
    commits: user.contributionsCollection.totalCommitContributions,
    prs: user.contributionsCollection.totalPullRequestContributions,
    issues: user.contributionsCollection.totalIssueContributions,
    reviews: user.contributionsCollection.totalPullRequestReviewContributions,
  },
  thisYear: {
    year: now.getUTCFullYear(),
    totalContributions: user.thisYear.contributionCalendar.totalContributions,
    commits: user.thisYear.totalCommitContributions,
  },
  currentStreak,
  longestStreak,
  lastActiveDate,
};

writeFileSync(OUT_PATH, JSON.stringify(snapshot, null, 2) + '\n');
console.log('[github-stats] wrote', OUT_PATH);
console.log(snapshot);
