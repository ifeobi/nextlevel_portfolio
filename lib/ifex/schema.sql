-- Ifex chat schema — run once against the Neon database.
-- Safe to re-run; all statements use IF NOT EXISTS.

create extension if not exists "pgcrypto";

create table if not exists ifex_conversations (
  id uuid primary key default gen_random_uuid(),
  visitor_id text not null,
  started_at timestamptz not null default now(),
  last_message_at timestamptz not null default now(),
  ended_at timestamptz,
  summary text,
  key_points jsonb
);

create index if not exists ifex_conversations_visitor_idx
  on ifex_conversations (visitor_id, started_at desc);

create table if not exists ifex_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references ifex_conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists ifex_messages_conversation_idx
  on ifex_messages (conversation_id, created_at);
