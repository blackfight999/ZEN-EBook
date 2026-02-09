/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Send, Quote, RefreshCw } from 'lucide-react';

// --- BREATHING PACER ---
export const BreathingPacer: React.FC = () => {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Wait'>('Inhale');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(t => {
        if (t >= 3) {
          setPhase(p => {
            if (p === 'Inhale') return 'Hold';
            if (p === 'Hold') return 'Exhale';
            if (p === 'Exhale') return 'Wait';
            return 'Inhale';
          });
          return 0;
        }
        return t + 0.05;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getScale = () => {
    if (phase === 'Inhale') return 1 + (timer / 3) * 0.8;
    if (phase === 'Hold') return 1.8;
    if (phase === 'Exhale') return 1.8 - (timer / 3) * 0.8;
    return 1;
  };

  const getMessage = () => {
    switch (phase) {
      case 'Inhale': return 'หายใจเข้าเบาๆ...';
      case 'Hold': return 'กลั้นและรู้สึก...';
      case 'Exhale': return 'ปล่อยลมหายใจช้าๆ...';
      case 'Wait': return 'อยู่ในความว่าง...';
    }
  };

  const getPhaseLabel = (p: string) => {
    switch (p) {
      case 'Inhale': return 'หายใจเข้า';
      case 'Hold': return 'กลั้น';
      case 'Exhale': return 'หายใจออก';
      case 'Wait': return 'รอ';
      default: return p;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-full shadow-2xl border border-sage-100 w-[400px] h-[400px] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-sage-50 to-transparent opacity-50"></div>

      <motion.div
        className="w-48 h-48 bg-sage-200 rounded-full flex items-center justify-center relative z-10"
        animate={{ scale: getScale() }}
        transition={{ duration: 0.05 }}
      >
        <motion.div
          className="w-full h-full bg-sage-600/20 rounded-full absolute inset-0 blur-xl"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
        <Wind className="text-sage-600" size={40} />
      </motion.div>

      <div className="mt-16 text-center z-10">
        <h3 className="font-serif text-2xl text-stone-900 mb-2 transition-opacity duration-500">
          {getMessage()}
        </h3>
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-sage-400">
          เทคนิคหายใจแบบกล่อง
        </p>
      </div>

      <div className="absolute bottom-10 flex gap-2">
        {['Inhale', 'Hold', 'Exhale', 'Wait'].map(p => (
          <div key={p} className={`w-2 h-2 rounded-full transition-all duration-500 ${phase === p ? 'bg-sage-600 scale-125' : 'bg-sage-200'}`}></div>
        ))}
      </div>
    </div>
  );
};

// --- GRATITUDE GARDEN ---
export const GratitudeGarden: React.FC = () => {
  const [input, setInput] = useState('');
  const [seeds, setSeeds] = useState<string[]>(["แสงแดดอุ่นๆ", "อากาศยามเช้าสดชื่น", "รอยยิ้มของครอบครัว"]);

  const plantSeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setSeeds(prev => [input, ...prev].slice(0, 5));
      setInput('');
    }
  };

  return (
    <div className="bg-white p-10 rounded-3xl border border-sage-100 shadow-xl max-w-md mx-auto">
      <h3 className="font-serif text-2xl mb-6 text-stone-900 text-center">สวนประจำวันของคุณ</h3>

      <form onSubmit={plantSeed} className="flex gap-2 mb-8">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ฉันรู้สึกขอบคุณสำหรับ..."
          className="flex-1 bg-sage-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-sage-200 outline-none transition-all"
        />
        <button className="p-3 bg-sage-600 text-white rounded-xl hover:bg-sage-700 transition-colors shadow-lg">
          <Send size={18} />
        </button>
      </form>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {seeds.map((seed, idx) => (
            <motion.div
              key={seed + idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-4 bg-white border border-sage-100 rounded-2xl flex items-center gap-4 text-stone-600 text-sm shadow-sm"
            >
              <div className="w-2 h-2 bg-sage-400 rounded-full"></div>
              {seed}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <p className="mt-8 text-center text-[10px] text-stone-400 uppercase tracking-widest font-bold">
        หว่านเมล็ดแห่งความสุข
      </p>
    </div>
  );
};

// --- WISDOM QUOTES ---
const QUOTES = [
  "ความสุขไม่ใช่สิ่งสำเร็จรูป มันมาจากการกระทำของคุณเอง",
  "จงอยู่ตรงที่คุณอยู่ มิฉะนั้นคุณจะพลาดชีวิตของคุณ",
  "ช่วงเวลาปัจจุบันคือเวลาเดียวที่เราสามารถควบคุมได้",
  "จิตใจของคุณคือสวน ความคิดของคุณคือเมล็ดพันธุ์",
  "สิ่งที่เราให้ความสนใจ เราให้พลังและขยายมัน"
];

export const WisdomQuotes: React.FC = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex(i => (i + 1) % QUOTES.length);

  return (
    <div className="flex flex-col items-center text-center">
      <Quote size={24} className="text-sage-400 mb-6" />
      <div className="h-24 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="font-serif italic text-xl text-stone-200 leading-relaxed"
          >
            {QUOTES[index]}
          </motion.p>
        </AnimatePresence>
      </div>
      <button
        onClick={next}
        className="mt-8 flex items-center gap-2 text-xs font-bold tracking-widest text-sage-400 hover:text-white transition-colors"
      >
        <RefreshCw size={14} /> คำคมใหม่
      </button>
    </div>
  );
};
