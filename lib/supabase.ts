/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Supabase client + chapter CRUD.
 * Falls back to localStorage when env vars are not configured.
 *
 * Required Supabase table (run once in your Supabase SQL editor):
 *
 *   create table chapters (
 *     id          text primary key,
 *     number      integer not null,
 *     title       text    not null,
 *     subtitle    text    not null default '',
 *     icon        text    not null default '🌿',
 *     body        text    not null default '',
 *     created_at  bigint  not null,
 *     updated_at  bigint  not null
 *   );
 *
 *   -- Allow public read/write (admin auth is handled by the app PIN)
 *   alter table chapters enable row level security;
 *   create policy "public_all" on chapters for all using (true) with check (true);
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { AdminChapterData } from '../components/AdminConsole';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const LOCAL_KEY = 'zen_admin_chapters';

// ─── CLIENT ──────────────────────────────────────────────────────
let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  if (!_client) _client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return _client;
}

export const isSupabaseConfigured = (): boolean =>
  Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// ─── LOCAL FALLBACK ───────────────────────────────────────────────
function localLoad(): AdminChapterData[] {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY) ?? '[]'); }
  catch { return []; }
}

function localSave(chapters: AdminChapterData[]): void {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(chapters));
}

// ─── CRUD ─────────────────────────────────────────────────────────
export async function fetchChapters(): Promise<AdminChapterData[]> {
  const client = getClient();
  if (!client) return localLoad();

  const { data, error } = await client
    .from('chapters')
    .select('*')
    .order('number', { ascending: true });

  if (error) { console.error('[supabase] fetchChapters:', error.message); return localLoad(); }
  return (data ?? []) as AdminChapterData[];
}

export async function upsertChapter(chapter: AdminChapterData): Promise<void> {
  const client = getClient();
  if (!client) {
    const all = localLoad();
    const idx = all.findIndex(c => c.id === chapter.id);
    if (idx >= 0) all[idx] = chapter; else all.push(chapter);
    localSave(all);
    return;
  }

  const { error } = await client
    .from('chapters')
    .upsert(chapter, { onConflict: 'id' });

  if (error) console.error('[supabase] upsertChapter:', error.message);
}

export async function deleteChapter(id: string): Promise<void> {
  const client = getClient();
  if (!client) {
    localSave(localLoad().filter(c => c.id !== id));
    return;
  }

  const { error } = await client
    .from('chapters')
    .delete()
    .eq('id', id);

  if (error) console.error('[supabase] deleteChapter:', error.message);
}

export async function reorderChapter(id: string, newNumber: number): Promise<void> {
  const client = getClient();
  if (!client) {
    const all = localLoad();
    const idx = all.findIndex(c => c.id === id);
    if (idx >= 0) { all[idx] = { ...all[idx], number: newNumber }; localSave(all); }
    return;
  }

  const { error } = await client
    .from('chapters')
    .update({ number: newNumber, updated_at: Date.now() })
    .eq('id', id);

  if (error) console.error('[supabase] reorderChapter:', error.message);
}
