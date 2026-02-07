/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, BookOpen, List, X, Leaf,
} from 'lucide-react';

export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

interface EbookReaderProps {
  chapters: Chapter[];
}

// ─── TABLE OF CONTENTS DRAWER ─────────────────────────────────────
const TOCDrawer: React.FC<{
  chapters: Chapter[];
  current: number;
  onSelect: (i: number) => void;
  onClose: () => void;
  open: boolean;
}> = ({ chapters, current, onSelect, onClose, open }) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-[320px] bg-calm-cream z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 pb-4 border-b border-sage-100">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-sage-600" />
                  <span className="font-serif text-lg text-stone-900">Contents</span>
                </div>
                <button onClick={onClose} className="p-2 -mr-2 rounded-full hover:bg-sage-50 text-stone-400">
                  <X size={18} />
                </button>
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-sage-500 font-bold">
                {chapters.length} Chapters
              </p>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain py-2">
              {chapters.map((ch, i) => (
                <button
                  key={ch.id}
                  onClick={() => { onSelect(i); onClose(); }}
                  className={`w-full text-left px-6 py-4 flex items-start gap-4 transition-colors ${
                    i === current ? 'bg-sage-50' : 'hover:bg-sage-50/50'
                  }`}
                >
                  <span className={`text-sm font-bold tabular-nums mt-0.5 ${
                    i === current ? 'text-sage-600' : i < current ? 'text-sage-400' : 'text-stone-300'
                  }`}>
                    {String(ch.number).padStart(2, '0')}
                  </span>
                  <div>
                    <p className={`text-sm font-medium leading-tight ${
                      i === current ? 'text-sage-800' : 'text-stone-700'
                    }`}>{ch.title}</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">{ch.subtitle}</p>
                  </div>
                  {i < current && (
                    <div className="ml-auto mt-1 w-1.5 h-1.5 rounded-full bg-sage-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── PROGRESS BAR ─────────────────────────────────────────────────
const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  const progress = ((current + 1) / total) * 100;
  return (
    <div className="w-full h-[3px] bg-sage-100">
      <motion.div
        className="h-full bg-sage-600 rounded-r-full"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </div>
  );
};

// ─── MAIN EBOOK READER ───────────────────────────────────────────
const SWIPE_THRESHOLD = 50;

export const EbookReader: React.FC<EbookReaderProps> = ({ chapters }) => {
  const [page, setPage] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const [direction, setDirection] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  const goTo = useCallback((target: number) => {
    if (target < 0 || target >= chapters.length) return;
    setDirection(target > page ? 1 : -1);
    setPage(target);
  }, [page, chapters.length]);

  const next = useCallback(() => goTo(page + 1), [goTo, page]);
  const prev = useCallback(() => goTo(page - 1), [goTo, page]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  // Scroll to top on page change
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [page]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD && info.velocity.x < -100) {
      next();
    } else if (info.offset.x > SWIPE_THRESHOLD && info.velocity.x > 100) {
      prev();
    }
  };

  // Tap zones: left 25% = prev, right 25% = next
  const handleTap = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const tapX = e.clientX - rect.left;
    const zone = tapX / rect.width;
    if (zone < 0.25) prev();
    else if (zone > 0.75) next();
  };

  const currentChapter = chapters[page];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '30%' : '-30%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-30%' : '30%', opacity: 0 }),
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-calm-cream">
      {/* Top Bar */}
      <header className="shrink-0 safe-top">
        <ProgressBar current={page} total={chapters.length} />
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setTocOpen(true)}
            className="p-2 -ml-2 rounded-full hover:bg-sage-50 text-stone-500 active:bg-sage-100 transition-colors"
          >
            <List size={20} />
          </button>

          <div className="text-center flex-1 min-w-0 px-2">
            <p className="text-[10px] uppercase tracking-[0.25em] text-sage-500 font-bold truncate">
              Chapter {currentChapter.number}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <div className="w-6 h-6 bg-sage-600 rounded-full flex items-center justify-center">
              <Leaf size={12} className="text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main
        ref={contentRef}
        className="flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain"
        onClick={handleTap}
      >
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            style={{ x, opacity }}
            className="min-h-full"
          >
            <div className="px-6 pt-4 pb-32 max-w-lg mx-auto">
              {currentChapter.content}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="shrink-0 bg-white/90 backdrop-blur-lg border-t border-sage-100 safe-bottom">
        <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
          <button
            onClick={prev}
            disabled={page === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all active:scale-95 disabled:opacity-30 text-stone-500 hover:bg-sage-50"
          >
            <ChevronLeft size={18} />
            <span className="hidden min-[360px]:inline">Back</span>
          </button>

          <div className="flex items-center gap-1">
            {chapters.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === page
                    ? 'w-6 h-2 bg-sage-600'
                    : i < page
                      ? 'w-2 h-2 bg-sage-300'
                      : 'w-2 h-2 bg-sage-100'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={page === chapters.length - 1}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all active:scale-95 disabled:opacity-30 ${
              page < chapters.length - 1
                ? 'bg-sage-600 text-white shadow-md hover:bg-sage-700'
                : 'text-stone-500'
            }`}
          >
            <span className="hidden min-[360px]:inline">Next</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </nav>

      {/* Table of Contents Drawer */}
      <TOCDrawer
        chapters={chapters}
        current={page}
        onSelect={goTo}
        onClose={() => setTocOpen(false)}
        open={tocOpen}
      />
    </div>
  );
};
