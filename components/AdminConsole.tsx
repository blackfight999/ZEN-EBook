/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Plus, Trash2, Edit3, Eye, Save, ArrowLeft,
  BookOpen, Lock, CheckCircle, AlertCircle, Loader,
  Cloud, HardDrive,
} from 'lucide-react';
import { ChapterRenderer } from './ChapterRenderer';
import {
  fetchChapters, upsertChapter, deleteChapter,
  isSupabaseConfigured,
} from '../lib/supabase';
import type { Chapter } from './EbookReader';

// ─── TYPES ────────────────────────────────────────────────────────
export interface AdminChapterData {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  icon: string;
  body: string;
  createdAt: number;
  updatedAt: number;
}

export function adminChaptersToChapters(data: AdminChapterData[]): Chapter[] {
  return data.map(d => ({
    id: d.id,
    number: d.number,
    title: d.title,
    subtitle: d.subtitle,
    content: (
      <ChapterRenderer
        body={d.body}
        title={d.title}
        subtitle={d.subtitle}
        icon={d.icon}
      />
    ),
  }));
}

// ─── PIN ──────────────────────────────────────────────────────────
const PIN = '1234';

// ─── ICON PICKER ──────────────────────────────────────────────────
const ICONS = [
  '🌿','🌸','🍃','☀️','🌙','💫','🕊️','🌊','🔥','⭐',
  '🌺','🍀','🌻','🦋','🌈','🧘','💎','🪷','🌾','🏔️',
];

const IconPicker: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => (
  <div className="flex flex-wrap gap-2 mt-2">
    {ICONS.map(icon => (
      <button key={icon} type="button" onClick={() => onChange(icon)}
        className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all
          ${value === icon ? 'bg-sage-600 ring-2 ring-sage-400 scale-110' : 'bg-stone-100 hover:bg-sage-100'}`}>
        {icon}
      </button>
    ))}
  </div>
);

// ─── PIN SCREEN ───────────────────────────────────────────────────
const PinScreen: React.FC<{ onUnlock: () => void; onClose: () => void }> = ({ onUnlock, onClose }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleKey = (k: string) => {
    if (input.length >= 4) return;
    const next = input + k;
    setInput(next);
    setError(false);
    if (next.length === 4) {
      setTimeout(() => {
        if (next === PIN) { onUnlock(); }
        else { setError(true); setInput(''); }
      }, 200);
    }
  };

  return (
    <div className="fixed inset-0 bg-calm-cream z-[100] flex flex-col items-center justify-center safe-top safe-bottom">
      <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-sage-100 text-stone-400">
        <X size={20} />
      </button>
      <div className="w-14 h-14 bg-sage-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
        <Lock size={24} className="text-white" />
      </div>
      <h2 className="font-serif text-2xl text-stone-900 mb-2">แผงควบคุมผู้ดูแล</h2>
      <p className="text-sm text-stone-400 mb-10">ใส่รหัส PIN เพื่อเข้าสู่ระบบ</p>

      <div className="flex gap-4 mb-4">
        {[0,1,2,3].map(i => (
          <motion.div key={i} animate={{ scale: input.length === i+1 ? 1.3 : 1 }}
            className={`w-4 h-4 rounded-full transition-colors
              ${i < input.length ? (error ? 'bg-red-500' : 'bg-sage-600') : 'bg-stone-200'}`} />
        ))}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-red-500 text-sm mb-4 flex items-center gap-1">
            <AlertCircle size={14} /> รหัส PIN ไม่ถูกต้อง
          </motion.p>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-3 gap-3 mt-4">
        {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((k, i) => (
          k === '' ? <div key={i} /> :
          <button key={i}
            onClick={() => k === '⌫' ? setInput(p => p.slice(0,-1)) : handleKey(k)}
            className="w-16 h-16 rounded-2xl bg-white border border-sage-100 shadow-sm text-xl font-semibold text-stone-700 hover:bg-sage-50 active:scale-95 transition-all">
            {k}
          </button>
        ))}
      </div>
      <p className="mt-8 text-[10px] text-stone-300 uppercase tracking-widest">รหัสเริ่มต้น: 1234</p>
    </div>
  );
};

// ─── SYNTAX HELP ──────────────────────────────────────────────────
const SYNTAX_HELP = [
  { syntax: '## หัวข้อ',        desc: 'หัวข้อส่วน' },
  { syntax: '> คำคม | ผู้แต่ง', desc: 'คำพูดอ้างอิง' },
  { syntax: '[tip] ... [/tip]', desc: 'กล่องข้อคิด' },
  { syntax: '**คำ**',           desc: 'ตัวหนา' },
  { syntax: '*คำ*',             desc: 'ตัวเอียง' },
  { syntax: '---',              desc: 'เส้นขั้น' },
];

const PLACEHOLDER = `เขียนเนื้อหาบทที่นี่...

## หัวข้อส่วน

ย่อหน้าแรก ใช้บรรทัดว่างเพื่อแบ่งย่อหน้า

> คำคมที่สร้างแรงบันดาลใจ | ชื่อผู้แต่ง

[tip]
ข้อความไฮไลต์หรือข้อคิดสำคัญ
[/tip]

ใช้ **ตัวหนา** หรือ *ตัวเอียง* ได้เลย

---`;

// ─── EDITOR ───────────────────────────────────────────────────────
interface EditorProps {
  initial?: AdminChapterData;
  nextNumber: number;
  onSave: (d: AdminChapterData) => Promise<void>;
  onCancel: () => void;
}

const Editor: React.FC<EditorProps> = ({ initial, nextNumber, onSave, onCancel }) => {
  const [title, setTitle]       = useState(initial?.title ?? '');
  const [subtitle, setSubtitle] = useState(initial?.subtitle ?? '');
  const [icon, setIcon]         = useState(initial?.icon ?? '🌿');
  const [body, setBody]         = useState(initial?.body ?? '');
  const [preview, setPreview]   = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);

  const handleSave = async () => {
    if (!title.trim() || saving) return;
    setSaving(true);
    const now = Date.now();
    await onSave({
      id:         initial?.id ?? `admin_${now}`,
      number:     initial?.number ?? nextNumber,
      title:      title.trim(),
      subtitle:   subtitle.trim(),
      icon,
      body,
      createdAt:  initial?.createdAt ?? now,
      updatedAt:  now,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="shrink-0 px-4 py-3 border-b border-sage-100 bg-white flex items-center gap-3">
        <button onClick={onCancel} className="p-2 rounded-full hover:bg-sage-50 text-stone-400">
          <ArrowLeft size={18} />
        </button>
        <h2 className="font-serif text-lg text-stone-900 flex-1 truncate">
          {initial ? `แก้ไข: ${initial.title}` : 'เพิ่มบทใหม่'}
        </h2>
        <button onClick={() => setPreview(p => !p)}
          className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5
            ${preview ? 'bg-sage-600 text-white' : 'bg-sage-100 text-sage-600 hover:bg-sage-200'}`}>
          <Eye size={12} /> {preview ? 'แก้ไข' : 'ตัวอย่าง'}
        </button>
        <button onClick={handleSave} disabled={!title.trim() || saving}
          className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sage-600 text-white hover:bg-sage-700 disabled:opacity-40 transition-all flex items-center gap-1.5">
          {saving ? <Loader size={12} className="animate-spin" /> : saved ? <CheckCircle size={12} /> : <Save size={12} />}
          {saving ? 'กำลังบันทึก' : saved ? 'บันทึกแล้ว' : 'บันทึก'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {preview ? (
          <div className="px-6 pt-4 pb-20 max-w-lg mx-auto">
            <ChapterRenderer body={body} title={title || 'ชื่อบท'} subtitle={subtitle || 'คำบรรยาย'} icon={icon} />
          </div>
        ) : (
          <div className="p-4 space-y-4 max-w-2xl mx-auto">
            {/* Meta */}
            <div className="bg-white rounded-2xl border border-sage-100 p-4 space-y-3">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-sage-500 font-bold block mb-1">ชื่อบท *</label>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="ชื่อบทที่..."
                  className="w-full bg-sage-50 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sage-200" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-sage-500 font-bold block mb-1">คำบรรยาย</label>
                <input value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="คำบรรยายสั้นๆ..."
                  className="w-full bg-sage-50 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sage-200" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-sage-500 font-bold block mb-1">ไอคอน</label>
                <IconPicker value={icon} onChange={setIcon} />
              </div>
            </div>

            {/* Syntax help */}
            <div className="bg-white rounded-2xl border border-sage-100 overflow-hidden">
              <button onClick={() => setShowHelp(h => !h)}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-sage-50 transition-colors">
                <span className="text-[10px] uppercase tracking-widest text-sage-500 font-bold">วิธีใช้มาร์กอัป</span>
                <span className="text-sage-400 text-sm">{showHelp ? '▲' : '▼'}</span>
              </button>
              <AnimatePresence>
                {showHelp && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                      {SYNTAX_HELP.map(({ syntax, desc }) => (
                        <div key={syntax} className="bg-sage-50 rounded-xl p-3">
                          <code className="text-xs text-sage-700 font-mono block mb-1">{syntax}</code>
                          <span className="text-[10px] text-stone-400">{desc}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Body */}
            <div className="bg-white rounded-2xl border border-sage-100 overflow-hidden">
              <div className="px-4 py-3 border-b border-sage-100 bg-sage-50">
                <span className="text-[10px] uppercase tracking-widest text-sage-500 font-bold">เนื้อหา</span>
              </div>
              <textarea value={body} onChange={e => setBody(e.target.value)}
                placeholder={PLACEHOLDER} rows={24}
                className="w-full px-4 py-3 text-sm text-stone-700 leading-relaxed outline-none resize-none font-mono" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── CHAPTER LIST ─────────────────────────────────────────────────
const ChapterList: React.FC<{
  chapters: AdminChapterData[];
  loading: boolean;
  onAdd: () => void;
  onEdit: (ch: AdminChapterData) => void;
  onDelete: (id: string) => Promise<void>;
  onClose: () => void;
}> = ({ chapters, loading, onAdd, onEdit, onDelete, onClose }) => {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const useCloud = isSupabaseConfigured();

  const handleDelete = async (id: string) => {
    setDeleting(id);
    await onDelete(id);
    setDeleting(null);
    setConfirmDelete(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="shrink-0 px-4 py-3 border-b border-sage-100 bg-white flex items-center gap-3">
        <div className="w-8 h-8 bg-sage-600 rounded-full flex items-center justify-center shrink-0">
          <BookOpen size={14} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-serif text-lg text-stone-900">แผงควบคุม</h2>
          <p className="text-[10px] text-stone-400 uppercase tracking-widest flex items-center gap-1">
            {useCloud
              ? <><Cloud size={9} className="text-sage-500" /> Supabase · {chapters.length} บท</>
              : <><HardDrive size={9} /> เครื่องนี้ · {chapters.length} บท</>}
          </p>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-sage-50 text-stone-400 shrink-0">
          <X size={18} />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader size={24} className="text-sage-400 animate-spin" />
            <p className="text-stone-400 text-sm">กำลังโหลด...</p>
          </div>
        ) : chapters.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-stone-500 font-serif text-lg mb-2">ยังไม่มีบท</p>
            <p className="text-stone-400 text-sm">กดปุ่ม "เพิ่มบท" เพื่อเริ่มเขียน</p>
          </div>
        ) : (
          <AnimatePresence>
            {chapters.map(ch => (
              <motion.div key={ch.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl border border-sage-100 p-4 flex items-start gap-4">
                <div className="w-10 h-10 bg-sage-50 rounded-xl flex items-center justify-center text-xl shrink-0">
                  {ch.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-sage-500 uppercase tracking-widest font-bold mb-0.5">บทที่ {ch.number}</p>
                  <p className="font-medium text-stone-800 truncate">{ch.title}</p>
                  <p className="text-xs text-stone-400 truncate">{ch.subtitle}</p>
                  <p className="text-[10px] text-stone-300 mt-1">
                    {ch.body.length} ตัวอักษร · {new Date(ch.updatedAt).toLocaleDateString('th-TH')}
                  </p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button onClick={() => onEdit(ch)}
                    className="p-2 rounded-xl bg-sage-50 text-sage-600 hover:bg-sage-100 transition-colors">
                    <Edit3 size={14} />
                  </button>
                  {confirmDelete === ch.id ? (
                    <button onClick={() => handleDelete(ch.id)}
                      className="p-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors">
                      {deleting === ch.id ? <Loader size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                    </button>
                  ) : (
                    <button onClick={() => setConfirmDelete(ch.id)}
                      className="p-2 rounded-xl bg-stone-50 text-stone-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Add Button */}
      <div className="shrink-0 p-4 border-t border-sage-100 bg-white safe-bottom">
        <button onClick={onAdd}
          className="w-full py-3.5 bg-sage-600 text-white rounded-2xl font-bold text-sm hover:bg-sage-700 transition-colors shadow-lg flex items-center justify-center gap-2">
          <Plus size={18} /> เพิ่มบทใหม่
        </button>
      </div>
    </div>
  );
};

// ─── MAIN ADMIN CONSOLE ───────────────────────────────────────────
interface AdminConsoleProps {
  open: boolean;
  onClose: () => void;
  baseChapterCount: number;
  onChaptersChange: (chapters: AdminChapterData[]) => void;
}

type AdminView = 'pin' | 'list' | 'editor';

export const AdminConsole: React.FC<AdminConsoleProps> = ({
  open, onClose, baseChapterCount, onChaptersChange,
}) => {
  const [view, setView]         = useState<AdminView>('pin');
  const [chapters, setChapters] = useState<AdminChapterData[]>([]);
  const [editing, setEditing]   = useState<AdminChapterData | undefined>();
  const [loading, setLoading]   = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    const data = await fetchChapters();
    setChapters(data);
    onChaptersChange(data);
    setLoading(false);
  }, [onChaptersChange]);

  useEffect(() => {
    if (open) { setView('pin'); }
  }, [open]);

  const handleUnlock = async () => {
    setView('list');
    await reload();
  };

  const handleSave = async (data: AdminChapterData) => {
    await upsertChapter(data);
    await reload();
  };

  const handleDelete = async (id: string) => {
    await deleteChapter(id);
    await reload();
  };

  const handleClose = () => { setView('pin'); onClose(); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90]">
          {view === 'pin' && (
            <PinScreen onUnlock={handleUnlock} onClose={handleClose} />
          )}

          {(view === 'list' || view === 'editor') && (
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-0 bg-calm-cream flex flex-col safe-top">
              {view === 'list' && (
                <ChapterList
                  chapters={chapters}
                  loading={loading}
                  onAdd={() => { setEditing(undefined); setView('editor'); }}
                  onEdit={ch => { setEditing(ch); setView('editor'); }}
                  onDelete={handleDelete}
                  onClose={handleClose}
                />
              )}
              {view === 'editor' && (
                <Editor
                  initial={editing}
                  nextNumber={baseChapterCount + chapters.length + 1}
                  onSave={handleSave}
                  onCancel={() => setView('list')}
                />
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
