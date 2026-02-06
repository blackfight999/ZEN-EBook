/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Timer, Brain, Smile, Hash, Sparkles, Moon, Eye, Volume2,
  Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Check,
  X, Plus, Minus, Flame, Droplets, Mountain, CloudRain,
} from 'lucide-react';

// ─── MEDITATION TIMER ─────────────────────────────────────────────
const TIMER_PRESETS = [
  { label: '1 min', seconds: 60 },
  { label: '3 min', seconds: 180 },
  { label: '5 min', seconds: 300 },
  { label: '10 min', seconds: 600 },
  { label: '15 min', seconds: 900 },
];

export const MeditationTimer: React.FC = () => {
  const [duration, setDuration] = useState(300);
  const [remaining, setRemaining] = useState(300);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining(r => {
          if (r <= 1) {
            setRunning(false);
            setFinished(true);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, remaining]);

  const reset = () => {
    setRunning(false);
    setFinished(false);
    setRemaining(duration);
  };

  const selectPreset = (seconds: number) => {
    setRunning(false);
    setFinished(false);
    setDuration(seconds);
    setRemaining(seconds);
  };

  const progress = 1 - remaining / duration;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const circumference = 2 * Math.PI * 70;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48 mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" className="text-sage-100" strokeWidth="6" />
          <motion.circle
            cx="80" cy="80" r="70" fill="none" stroke="currentColor"
            className="text-sage-600"
            strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: circumference * (1 - progress) }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {finished ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
              <Check size={32} className="text-sage-600 mx-auto mb-1" />
              <p className="text-xs text-sage-600 font-bold uppercase tracking-widest">Namaste</p>
            </motion.div>
          ) : (
            <>
              <span className="font-serif text-4xl text-stone-900 tabular-nums">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">
                {running ? 'Meditating' : 'Ready'}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => running ? setRunning(false) : (finished ? reset() : setRunning(true))}
          className="p-3 bg-sage-600 text-white rounded-full hover:bg-sage-700 transition-colors shadow-lg"
        >
          {running ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button onClick={reset} className="p-3 bg-stone-100 text-stone-500 rounded-full hover:bg-stone-200 transition-colors">
          <RotateCcw size={18} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {TIMER_PRESETS.map(p => (
          <button
            key={p.seconds}
            onClick={() => selectPreset(p.seconds)}
            className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
              duration === p.seconds
                ? 'bg-sage-600 text-white border-sage-600'
                : 'bg-white text-stone-500 border-sage-100 hover:border-sage-300'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── BODY SCAN GUIDE ──────────────────────────────────────────────
const BODY_SCAN_STEPS = [
  { area: 'Crown', instruction: 'Bring gentle awareness to the top of your head. Notice any warmth or tingling.', icon: '🧠' },
  { area: 'Forehead & Eyes', instruction: 'Soften the muscles of your forehead. Let your eyelids grow heavy and relaxed.', icon: '👁' },
  { area: 'Jaw & Throat', instruction: 'Unclench your jaw. Allow your tongue to rest gently against the roof of your mouth.', icon: '🫁' },
  { area: 'Shoulders', instruction: 'Let your shoulders drop away from your ears. Feel the weight releasing downward.', icon: '💪' },
  { area: 'Chest & Heart', instruction: 'Feel your heartbeat. Let each beat radiate warmth through your chest.', icon: '❤️' },
  { area: 'Belly', instruction: 'Let your belly be soft. Notice the gentle rise and fall with each breath.', icon: '🌊' },
  { area: 'Hands', instruction: 'Feel the energy in your palms. Notice any tingling in your fingertips.', icon: '✋' },
  { area: 'Legs & Feet', instruction: 'Feel the grounding through your legs. Let your feet connect you to the earth.', icon: '🦶' },
];

export const BodyScanGuide: React.FC = () => {
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setTimeout(() => {
      if (step < BODY_SCAN_STEPS.length - 1) {
        setStep(s => s + 1);
      } else {
        setAutoPlay(false);
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, [autoPlay, step]);

  const current = BODY_SCAN_STEPS[step];

  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex gap-1.5 mb-6">
        {BODY_SCAN_STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              i === step ? 'w-8 bg-sage-600' : i < step ? 'w-3 bg-sage-300' : 'w-3 bg-sage-100'
            }`}
            onClick={() => { setStep(i); setAutoPlay(false); }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-6"
        >
          <div className="text-4xl mb-3">{current.icon}</div>
          <h4 className="font-serif text-xl text-stone-900 mb-3">{current.area}</h4>
          <p className="text-sm text-stone-500 leading-relaxed max-w-xs">{current.instruction}</p>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <button
          onClick={() => { setStep(s => Math.max(0, s - 1)); setAutoPlay(false); }}
          disabled={step === 0}
          className="p-2 rounded-full bg-stone-100 text-stone-400 hover:bg-stone-200 disabled:opacity-30 transition-all"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => setAutoPlay(!autoPlay)}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
            autoPlay ? 'bg-sage-600 text-white' : 'bg-sage-100 text-sage-600 hover:bg-sage-200'
          }`}
        >
          {autoPlay ? 'Guided' : 'Auto-Guide'}
        </button>
        <button
          onClick={() => { setStep(s => Math.min(BODY_SCAN_STEPS.length - 1, s + 1)); setAutoPlay(false); }}
          disabled={step === BODY_SCAN_STEPS.length - 1}
          className="p-2 rounded-full bg-stone-100 text-stone-400 hover:bg-stone-200 disabled:opacity-30 transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <p className="mt-4 text-[10px] text-stone-400 uppercase tracking-widest">
        {step + 1} of {BODY_SCAN_STEPS.length} regions
      </p>
    </div>
  );
};

// ─── MOOD TRACKER ─────────────────────────────────────────────────
const MOODS = [
  { emoji: '😌', label: 'Calm', color: 'bg-green-100 border-green-300 text-green-700' },
  { emoji: '😊', label: 'Happy', color: 'bg-yellow-100 border-yellow-300 text-yellow-700' },
  { emoji: '😐', label: 'Neutral', color: 'bg-stone-100 border-stone-300 text-stone-700' },
  { emoji: '😔', label: 'Low', color: 'bg-blue-100 border-blue-300 text-blue-700' },
  { emoji: '😤', label: 'Tense', color: 'bg-red-100 border-red-300 text-red-700' },
  { emoji: '🥱', label: 'Tired', color: 'bg-purple-100 border-purple-300 text-purple-700' },
];

interface MoodEntry {
  mood: typeof MOODS[number];
  note: string;
  time: string;
}

export const MoodTracker: React.FC = () => {
  const [selected, setSelected] = useState<typeof MOODS[number] | null>(null);
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  const logMood = () => {
    if (!selected) return;
    const entry: MoodEntry = {
      mood: selected,
      note,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setEntries(prev => [entry, ...prev].slice(0, 5));
    setSelected(null);
    setNote('');
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-sm text-stone-500 mb-4">How are you feeling right now?</p>

      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {MOODS.map(m => (
          <button
            key={m.label}
            onClick={() => setSelected(m)}
            className={`flex flex-col items-center gap-1 p-3 rounded-2xl border-2 transition-all ${
              selected?.label === m.label ? m.color + ' scale-110 shadow-md' : 'border-transparent hover:border-sage-100 bg-white'
            }`}
          >
            <span className="text-2xl">{m.emoji}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">{m.label}</span>
          </button>
        ))}
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="w-full max-w-xs">
          <input
            type="text"
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="A brief note (optional)..."
            className="w-full bg-sage-50 rounded-xl px-4 py-2.5 text-sm border-none outline-none focus:ring-2 focus:ring-sage-200 mb-3"
          />
          <button onClick={logMood} className="w-full py-2.5 bg-sage-600 text-white rounded-xl text-sm font-bold hover:bg-sage-700 transition-colors">
            Log Feeling
          </button>
        </motion.div>
      )}

      {entries.length > 0 && (
        <div className="mt-5 w-full max-w-xs space-y-2">
          <AnimatePresence>
            {entries.map((e, i) => (
              <motion.div
                key={e.time + i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-sage-100 text-sm"
              >
                <span className="text-lg">{e.mood.emoji}</span>
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-stone-700">{e.mood.label}</span>
                  {e.note && <p className="text-xs text-stone-400 truncate">{e.note}</p>}
                </div>
                <span className="text-[10px] text-stone-400 shrink-0">{e.time}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

// ─── MANTRA COUNTER ───────────────────────────────────────────────
const MANTRAS = [
  'Om Mani Padme Hum',
  'Om Shanti Shanti Shanti',
  'So Hum (I Am That)',
  'Lokah Samastah Sukhino Bhavantu',
  'Om Namah Shivaya',
];

export const MantraCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(108);
  const [mantraIndex, setMantraIndex] = useState(0);
  const [pulse, setPulse] = useState(false);

  const increment = () => {
    if (count < target) {
      setCount(c => c + 1);
      setPulse(true);
      setTimeout(() => setPulse(false), 200);
    }
  };

  const progress = count / target;

  return (
    <div className="flex flex-col items-center">
      <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Current Mantra</p>
      <button
        onClick={() => setMantraIndex(i => (i + 1) % MANTRAS.length)}
        className="text-sm font-serif italic text-sage-600 mb-5 hover:text-sage-800 transition-colors cursor-pointer"
      >
        {MANTRAS[mantraIndex]}
      </button>

      <motion.button
        onClick={increment}
        animate={{ scale: pulse ? 1.1 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className="w-36 h-36 rounded-full bg-gradient-to-br from-sage-100 to-sage-200 border-4 border-sage-300 flex flex-col items-center justify-center shadow-xl hover:shadow-2xl transition-shadow mb-5 active:scale-95"
      >
        <span className="font-serif text-4xl text-sage-800">{count}</span>
        <span className="text-[10px] text-sage-500 uppercase tracking-widest">/ {target}</span>
      </motion.button>

      <div className="w-full max-w-[200px] h-2 bg-sage-100 rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full bg-sage-600 rounded-full"
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => { setTarget(t => Math.max(9, t === 108 ? 54 : t === 54 ? 27 : t === 27 ? 9 : 108)); setCount(0); }}
          className="p-1.5 rounded-full bg-stone-100 text-stone-400 hover:bg-stone-200 transition-colors"
        >
          <Minus size={14} />
        </button>
        <span className="text-xs text-stone-500 w-20 text-center">Target: {target}</span>
        <button
          onClick={() => { setTarget(t => t === 9 ? 27 : t === 27 ? 54 : t === 54 ? 108 : 108); setCount(0); }}
          className="p-1.5 rounded-full bg-stone-100 text-stone-400 hover:bg-stone-200 transition-colors"
        >
          <Plus size={14} />
        </button>
      </div>

      {count >= target && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 text-center">
          <p className="text-sm font-serif text-sage-600">Cycle Complete</p>
          <button onClick={() => setCount(0)} className="mt-2 text-xs text-sage-500 underline hover:text-sage-700">Start New Cycle</button>
        </motion.div>
      )}
    </div>
  );
};

// ─── AFFIRMATION CARDS ────────────────────────────────────────────
const AFFIRMATIONS = [
  { text: 'I am exactly where I need to be in this moment.', theme: 'Presence' },
  { text: 'I release what I cannot control and embrace what I can.', theme: 'Surrender' },
  { text: 'My inner peace is unshakeable.', theme: 'Strength' },
  { text: 'I breathe in calm, I breathe out tension.', theme: 'Breath' },
  { text: 'I am worthy of rest, of joy, of love.', theme: 'Self-Worth' },
  { text: 'Each moment is a fresh beginning.', theme: 'Renewal' },
  { text: 'I choose to respond with grace and patience.', theme: 'Compassion' },
  { text: 'My thoughts do not define me. I observe them with kindness.', theme: 'Awareness' },
  { text: 'I am grateful for the life flowing through me right now.', theme: 'Gratitude' },
  { text: 'I trust the timing of my journey.', theme: 'Trust' },
];

export const AffirmationCards: React.FC = () => {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * AFFIRMATIONS.length));
  const [direction, setDirection] = useState(1);

  const next = () => { setDirection(1); setIndex(i => (i + 1) % AFFIRMATIONS.length); };
  const prev = () => { setDirection(-1); setIndex(i => (i - 1 + AFFIRMATIONS.length) % AFFIRMATIONS.length); };

  const current = AFFIRMATIONS[index];

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-xs h-44 mb-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-br from-sage-50 to-white border border-sage-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-sage-500 font-bold mb-3">{current.theme}</p>
            <p className="font-serif text-lg text-stone-800 italic leading-relaxed">"{current.text}"</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={prev} className="p-2 rounded-full bg-stone-100 text-stone-400 hover:bg-stone-200 transition-all">
          <ChevronLeft size={16} />
        </button>
        <span className="text-[10px] text-stone-400 uppercase tracking-widest">{index + 1} / {AFFIRMATIONS.length}</span>
        <button onClick={next} className="p-2 rounded-full bg-stone-100 text-stone-400 hover:bg-stone-200 transition-all">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

// ─── FOCUS / MINDFUL MINUTE ───────────────────────────────────────
const FOCUS_PROMPTS = [
  { prompt: 'Name 5 things you can see right now.', sense: 'Sight', icon: Eye },
  { prompt: 'Listen for 3 different sounds around you.', sense: 'Hearing', icon: Volume2 },
  { prompt: 'Feel the texture of something near you.', sense: 'Touch', icon: Droplets },
  { prompt: 'Take one deep breath and notice the scent in the air.', sense: 'Smell', icon: CloudRain },
  { prompt: 'Notice the taste in your mouth right now.', sense: 'Taste', icon: Flame },
];

export const MindfulMinute: React.FC = () => {
  const [active, setActive] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!active || secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) {
          setActive(false);
          setCompleted(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [active, secondsLeft]);

  useEffect(() => {
    if (!active) return;
    const promptTimer = setInterval(() => {
      setPromptIndex(i => (i + 1) % FOCUS_PROMPTS.length);
    }, 12000);
    return () => clearInterval(promptTimer);
  }, [active]);

  const reset = () => {
    setActive(false);
    setCompleted(false);
    setSecondsLeft(60);
    setPromptIndex(0);
  };

  const current = FOCUS_PROMPTS[promptIndex];
  const CurrentIcon = current.icon;

  return (
    <div className="flex flex-col items-center text-center">
      {completed ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
          <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mb-4">
            <Check size={28} className="text-sage-600" />
          </div>
          <h4 className="font-serif text-xl text-stone-900 mb-2">Minute Complete</h4>
          <p className="text-sm text-stone-500 mb-4">You just gifted yourself presence.</p>
          <button onClick={reset} className="text-xs text-sage-600 underline hover:text-sage-800">Go Again</button>
        </motion.div>
      ) : active ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
          <div className="w-14 h-14 bg-sage-50 rounded-full flex items-center justify-center mb-4">
            <CurrentIcon size={24} className="text-sage-600" />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={promptIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-sage-500 font-bold mb-2">{current.sense}</p>
              <p className="font-serif text-lg text-stone-800 mb-4 max-w-xs leading-relaxed">{current.prompt}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center gap-2 text-stone-400">
            <div className="w-24 h-1.5 bg-sage-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-sage-500 rounded-full"
                animate={{ width: `${((60 - secondsLeft) / 60) * 100}%` }}
              />
            </div>
            <span className="text-xs tabular-nums">{secondsLeft}s</span>
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-sm text-stone-500 mb-5 max-w-xs">
            A grounding exercise that walks you through your senses in 60 seconds.
          </p>
          <button
            onClick={() => { setActive(true); setSecondsLeft(60); setPromptIndex(0); }}
            className="px-6 py-3 bg-sage-600 text-white rounded-full text-sm font-bold hover:bg-sage-700 transition-colors shadow-lg flex items-center gap-2"
          >
            <Play size={16} /> Begin Mindful Minute
          </button>
        </div>
      )}
    </div>
  );
};

// ─── SLEEP WIND-DOWN ──────────────────────────────────────────────
const WIND_DOWN_STEPS = [
  { title: 'Dim the Lights', desc: 'Lower screen brightness. Soften external lights. Signal to your body that rest is coming.', icon: Moon },
  { title: 'Release Tension', desc: 'Starting from your toes, tense each muscle group for 5 seconds, then release completely.', icon: Flame },
  { title: '4-7-8 Breath', desc: 'Inhale for 4 counts, hold for 7, exhale slowly for 8. Repeat 3 times.', icon: Droplets },
  { title: 'Gratitude Scan', desc: 'Think of 3 moments from today that made you smile, however small.', icon: Sparkles },
  { title: 'Body Melt', desc: 'Imagine your body slowly melting into the bed, becoming heavier and warmer with each breath.', icon: Mountain },
];

export const SleepWindDown: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggleCheck = (i: number) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const step = WIND_DOWN_STEPS[currentStep];
  const StepIcon = step.icon;

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2 mb-6">
        {WIND_DOWN_STEPS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentStep(i)}
            className={`w-8 h-8 rounded-full text-xs font-bold transition-all flex items-center justify-center ${
              checked.has(i)
                ? 'bg-sage-600 text-white'
                : i === currentStep
                  ? 'bg-sage-200 text-sage-800 ring-2 ring-sage-400'
                  : 'bg-stone-100 text-stone-400 hover:bg-stone-200'
            }`}
          >
            {checked.has(i) ? <Check size={14} /> : i + 1}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="text-center mb-5"
        >
          <div className="w-12 h-12 bg-sage-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <StepIcon size={20} className="text-sage-600" />
          </div>
          <h4 className="font-serif text-lg text-stone-900 mb-2">{step.title}</h4>
          <p className="text-sm text-stone-500 max-w-xs leading-relaxed">{step.desc}</p>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => {
          toggleCheck(currentStep);
          if (currentStep < WIND_DOWN_STEPS.length - 1) {
            setTimeout(() => setCurrentStep(s => s + 1), 300);
          }
        }}
        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
          checked.has(currentStep)
            ? 'bg-stone-100 text-stone-400'
            : 'bg-sage-600 text-white hover:bg-sage-700 shadow-lg'
        }`}
      >
        {checked.has(currentStep) ? 'Completed' : 'Done — Next Step'}
      </button>

      {checked.size === WIND_DOWN_STEPS.length && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 text-sm font-serif italic text-sage-600">
          You are ready for deep, restorative rest. Goodnight.
        </motion.p>
      )}
    </div>
  );
};

// ─── FOCUS SOUND VISUALIZER ───────────────────────────────────────
const SOUNDSCAPES = [
  { name: 'Rain', icon: CloudRain, color: 'from-blue-100 to-blue-50' },
  { name: 'Ocean', icon: Droplets, color: 'from-cyan-100 to-cyan-50' },
  { name: 'Forest', icon: Mountain, color: 'from-green-100 to-green-50' },
  { name: 'Fire', icon: Flame, color: 'from-orange-100 to-orange-50' },
];

export const SoundScapeSelector: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);
  const [bars, setBars] = useState<number[]>(Array(16).fill(0.3));

  useEffect(() => {
    if (!active) { setBars(Array(16).fill(0.3)); return; }
    const interval = setInterval(() => {
      setBars(prev => prev.map(() => 0.2 + Math.random() * 0.8));
    }, 150);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="flex flex-col items-center">
      <p className="text-sm text-stone-500 mb-5">Choose an ambient soundscape to focus with.</p>

      <div className="grid grid-cols-2 gap-3 mb-6 w-full max-w-xs">
        {SOUNDSCAPES.map(s => {
          const Icon = s.icon;
          const isActive = active === s.name;
          return (
            <button
              key={s.name}
              onClick={() => setActive(isActive ? null : s.name)}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                isActive
                  ? `bg-gradient-to-br ${s.color} border-sage-300 shadow-md`
                  : 'bg-white border-sage-100 hover:border-sage-200'
              }`}
            >
              <Icon size={22} className={isActive ? 'text-sage-700' : 'text-stone-400'} />
              <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-sage-700' : 'text-stone-400'}`}>
                {s.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-end justify-center gap-1 h-12 w-full max-w-xs">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className={`w-2 rounded-full ${active ? 'bg-sage-400' : 'bg-sage-100'}`}
            animate={{ height: `${h * 100}%` }}
            transition={{ duration: 0.15 }}
          />
        ))}
      </div>

      <p className="mt-3 text-[10px] text-stone-400 uppercase tracking-widest">
        {active ? `Playing — ${active}` : 'Select to begin'}
      </p>
    </div>
  );
};

// ─── INTENTION SETTER ─────────────────────────────────────────────
export const IntentionSetter: React.FC = () => {
  const [intention, setIntention] = useState('');
  const [savedIntention, setSavedIntention] = useState<string | null>(null);
  const [breathe, setBreathe] = useState(false);

  const setIt = (e: React.FormEvent) => {
    e.preventDefault();
    if (intention.trim()) {
      setSavedIntention(intention.trim());
      setIntention('');
      setBreathe(true);
      setTimeout(() => setBreathe(false), 4000);
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      {savedIntention ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
          <motion.div
            className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mb-4"
            animate={breathe ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 4, ease: 'easeInOut' }}
          >
            <Sparkles size={28} className="text-sage-600" />
          </motion.div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-sage-500 font-bold mb-3">Your Intention</p>
          <p className="font-serif text-xl text-stone-800 italic leading-relaxed max-w-xs mb-5">
            "{savedIntention}"
          </p>
          <button
            onClick={() => setSavedIntention(null)}
            className="text-xs text-stone-400 hover:text-sage-600 transition-colors flex items-center gap-1"
          >
            <RotateCcw size={12} /> Set New Intention
          </button>
        </motion.div>
      ) : (
        <div className="w-full max-w-xs">
          <p className="text-sm text-stone-500 mb-4">
            Set a conscious intention for this moment, hour, or day.
          </p>
          <form onSubmit={setIt} className="flex flex-col gap-3">
            <input
              type="text"
              value={intention}
              onChange={e => setIntention(e.target.value)}
              placeholder="Today I intend to..."
              className="w-full bg-sage-50 rounded-xl px-4 py-3 text-sm border-none outline-none focus:ring-2 focus:ring-sage-200"
            />
            <button
              type="submit"
              disabled={!intention.trim()}
              className="py-2.5 bg-sage-600 text-white rounded-xl text-sm font-bold hover:bg-sage-700 disabled:opacity-40 transition-all"
            >
              Set Intention
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

// ─── ZEN TOOLS GRID (Main Export) ─────────────────────────────────
const TOOLS = [
  { id: 'timer', name: 'Meditation Timer', desc: 'Timed silent meditation', icon: Timer, component: MeditationTimer },
  { id: 'bodyscan', name: 'Body Scan', desc: 'Guided body awareness', icon: Brain, component: BodyScanGuide },
  { id: 'mood', name: 'Mood Check-In', desc: 'Track how you feel', icon: Smile, component: MoodTracker },
  { id: 'mantra', name: 'Mantra Counter', desc: 'Digital mala beads', icon: Hash, component: MantraCounter },
  { id: 'affirmation', name: 'Affirmations', desc: 'Positive reminders', icon: Sparkles, component: AffirmationCards },
  { id: 'mindful', name: 'Mindful Minute', desc: '60-second grounding', icon: Eye, component: MindfulMinute },
  { id: 'sleep', name: 'Sleep Wind-Down', desc: 'Pre-sleep ritual', icon: Moon, component: SleepWindDown },
  { id: 'sound', name: 'Soundscapes', desc: 'Ambient focus sounds', icon: Volume2, component: SoundScapeSelector },
  { id: 'intention', name: 'Set Intention', desc: 'Daily purpose setting', icon: Flame, component: IntentionSetter },
];

export const ZenToolsGrid: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const ActiveComponent = TOOLS.find(t => t.id === activeTool)?.component;
  const activeInfo = TOOLS.find(t => t.id === activeTool);

  const handleClose = useCallback(() => setActiveTool(null), []);

  useEffect(() => {
    if (activeTool && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeTool]);

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-9 gap-3 md:gap-4">
        {TOOLS.map(tool => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <motion.button
              key={tool.id}
              onClick={() => setActiveTool(isActive ? null : tool.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`flex flex-col items-center text-center p-5 md:p-6 rounded-2xl border-2 transition-all duration-300 ${
                isActive
                  ? 'bg-sage-600 text-white border-sage-600 shadow-xl shadow-sage-600/20'
                  : 'bg-white text-stone-600 border-sage-100 hover:border-sage-300 hover:shadow-md'
              }`}
            >
              <Icon size={24} className={`mb-3 ${isActive ? 'text-white' : 'text-sage-500'}`} />
              <span className={`text-xs font-bold uppercase tracking-wider leading-tight ${isActive ? 'text-white' : 'text-stone-700'}`}>
                {tool.name}
              </span>
              <span className={`text-[10px] mt-1 ${isActive ? 'text-white/70' : 'text-stone-400'}`}>
                {tool.desc}
              </span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {activeTool && ActiveComponent && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-3xl border border-sage-100 shadow-xl p-8 md:p-12 relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-all"
              >
                <X size={18} />
              </button>

              <div className="text-center mb-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-sage-500 font-bold mb-1">{activeInfo?.desc}</p>
                <h3 className="font-serif text-2xl text-stone-900">{activeInfo?.name}</h3>
              </div>

              <ActiveComponent />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
