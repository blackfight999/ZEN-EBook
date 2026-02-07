/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf, Wind, Heart, Sun, Eye, Moon, Sparkles, Quote,
  Send, RefreshCw, BookOpen, ArrowRight,
} from 'lucide-react';

import { BreathingPacer, GratitudeGarden } from './Practices';
import {
  MeditationTimer, BodyScanGuide, MoodTracker, MantraCounter,
  AffirmationCards, MindfulMinute, SleepWindDown, SoundScapeSelector,
  IntentionSetter, ZenToolsGrid,
} from './ZenTools';

import type { Chapter } from './EbookReader';

// ─── SHARED EBOOK COMPONENTS ─────────────────────────────────────

const ChapterHeader: React.FC<{
  number: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}> = ({ number, title, subtitle, icon }) => (
  <div className="text-center mb-10 pt-2">
    <div className="w-16 h-16 bg-sage-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-sage-100">
      {icon}
    </div>
    <p className="text-[10px] uppercase tracking-[0.4em] text-sage-500 font-bold mb-3">
      Chapter {String(number).padStart(2, '0')}
    </p>
    <h1 className="font-serif text-3xl leading-tight text-stone-900 mb-3">{title}</h1>
    <p className="text-sm text-stone-400 italic">{subtitle}</p>
    <div className="w-12 h-[2px] bg-sage-200 mx-auto mt-5" />
  </div>
);

const Paragraph: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`text-[16px] leading-[1.8] text-stone-600 mb-6 ${className}`}>{children}</p>
);

const PullQuote: React.FC<{ text: string; author?: string }> = ({ text, author }) => (
  <div className="my-8 px-5 py-6 bg-sage-50/60 rounded-2xl border-l-4 border-sage-600">
    <Quote size={16} className="text-sage-400 mb-2" />
    <p className="font-serif text-lg italic text-stone-700 leading-relaxed">{text}</p>
    {author && <p className="mt-3 text-xs text-sage-600 font-bold uppercase tracking-wider">&mdash; {author}</p>}
  </div>
);

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[10px] uppercase tracking-[0.3em] text-sage-500 font-bold mb-4 mt-10">{children}</p>
);

const InteractiveBox: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="my-8 bg-white rounded-2xl border border-sage-100 shadow-sm overflow-hidden">
    <div className="px-5 py-3 bg-sage-50 border-b border-sage-100">
      <p className="text-[10px] uppercase tracking-[0.25em] text-sage-600 font-bold flex items-center gap-2">
        <Sparkles size={12} /> {label}
      </p>
    </div>
    <div className="p-5">
      {children}
    </div>
  </div>
);

const Insight: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="flex gap-4 my-5 p-4 bg-white rounded-xl border border-sage-100">
    <div className="shrink-0 w-10 h-10 bg-sage-50 rounded-full flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h4 className="font-medium text-sm text-stone-800 mb-1">{title}</h4>
      <p className="text-[13px] text-stone-500 leading-relaxed">{text}</p>
    </div>
  </div>
);

const PageEnd: React.FC<{ hint?: string }> = ({ hint = 'Swipe or tap to continue' }) => (
  <div className="mt-12 mb-4 text-center">
    <div className="w-8 h-[2px] bg-sage-200 mx-auto mb-4" />
    <p className="text-[10px] uppercase tracking-[0.3em] text-stone-300 font-bold flex items-center justify-center gap-2">
      {hint} <ArrowRight size={10} />
    </p>
  </div>
);

// ─── CHAPTER 1: WELCOME ──────────────────────────────────────────
const Chapter1 = () => (
  <div>
    <div className="text-center pt-12 mb-10">
      <div className="w-20 h-20 bg-sage-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
        <Leaf size={32} className="text-white" />
      </div>
      <p className="text-[10px] uppercase tracking-[0.4em] text-sage-500 font-bold mb-4">An Interactive Ebook</p>
      <h1 className="font-serif text-4xl leading-[1.15] text-stone-900 mb-4">
        The Path to<br /><span className="italic text-sage-600">Mindful Living</span>
      </h1>
      <div className="w-12 h-[2px] bg-sage-200 mx-auto mt-6 mb-6" />
      <p className="text-sm text-stone-400 italic px-4">A pocket guide to stillness, presence, and inner peace</p>
    </div>

    <Paragraph>
      Welcome, dear reader. You are holding in your hands a guide designed not just to be read, but to be experienced. Each chapter introduces a mindfulness concept and invites you to practice it immediately.
    </Paragraph>

    <Paragraph>
      There is no rush. You can read one chapter a day, or explore them all in one sitting. The only rule is: be fully here for whatever you do.
    </Paragraph>

    <PullQuote
      text="The journey of a thousand miles begins with a single step."
      author="Lao Tzu"
    />

    <SectionLabel>How to Use This Book</SectionLabel>

    <Insight
      icon={<BookOpen size={18} className="text-sage-600" />}
      title="Read the Lessons"
      text="Each chapter opens with a short teaching about a mindfulness practice."
    />
    <Insight
      icon={<Sparkles size={18} className="text-sage-600" />}
      title="Try the Exercises"
      text="Interactive tools are woven into each chapter. Tap, breathe, and engage."
    />
    <Insight
      icon={<Heart size={18} className="text-sage-600" />}
      title="Carry It With You"
      text="The final chapter gives you all tools in one place for daily use."
    />

    <InteractiveBox label="Your First Practice: Set an Intention">
      <IntentionSetter />
    </InteractiveBox>

    <PageEnd hint="Begin your journey" />
  </div>
);

// ─── CHAPTER 2: THE PRESENT MOMENT ───────────────────────────────
const Chapter2 = () => (
  <div>
    <ChapterHeader
      number={2}
      title="Being Here"
      subtitle="The power of the present moment"
      icon={<Sun size={24} className="text-sage-600" />}
    />

    <Paragraph>
      <span className="text-3xl float-left mr-3 mt-1 font-serif text-sage-600 leading-[0.9]">T</span>he present moment is the only time that truly exists. The past is a memory. The future is imagination. Right now is where life happens.
    </Paragraph>

    <Paragraph>
      Yet most of us spend our days time-traveling. We replay yesterday's mistakes or rehearse tomorrow's worries. Mindfulness is the gentle art of returning to now.
    </Paragraph>

    <PullQuote
      text="Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present."
      author="Bil Keane"
    />

    <SectionLabel>The Science</SectionLabel>

    <Paragraph>
      Harvard researchers found that people spend 47% of their waking hours thinking about something other than what they are doing. And this mind-wandering consistently made them less happy.
    </Paragraph>

    <Paragraph>
      The antidote is simple but not easy: paying attention on purpose, in the present moment, without judgment. This is the essence of mindfulness.
    </Paragraph>

    <Insight
      icon={<Sun size={18} className="text-sage-600" />}
      title="Clarity"
      text="When you are present, the mental fog lifts. Details become vivid. Decisions become clearer."
    />
    <Insight
      icon={<Heart size={18} className="text-sage-600" />}
      title="Compassion"
      text="Presence opens the door to empathy. When you truly listen, you truly connect."
    />

    <SectionLabel>Try It Now</SectionLabel>

    <Paragraph>
      Pause reading for a moment. Look up from your screen. What do you notice? What sounds are in the background? What does the air feel like on your skin?
    </Paragraph>

    <InteractiveBox label="Quick Practice: Check In With Yourself">
      <MoodTracker />
    </InteractiveBox>

    <PageEnd />
  </div>
);

// ─── CHAPTER 3: THE BREATH ───────────────────────────────────────
const Chapter3 = () => (
  <div>
    <ChapterHeader
      number={3}
      title="Breathing Life"
      subtitle="Your built-in calm system"
      icon={<Wind size={24} className="text-sage-600" />}
    />

    <Paragraph>
      <span className="text-3xl float-left mr-3 mt-1 font-serif text-sage-600 leading-[0.9]">B</span>reathing is the only bodily function that is both involuntary and voluntary. You breathe without thinking, but you can also choose to breathe consciously. This makes it a powerful bridge between body and mind.
    </Paragraph>

    <PullQuote
      text="Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor."
      author="Thich Nhat Hanh"
    />

    <SectionLabel>Why It Works</SectionLabel>

    <Paragraph>
      When you are stressed, your breathing becomes shallow and fast, activating the "fight or flight" response. By deliberately slowing your breath, you activate the vagus nerve and trigger your body's relaxation response.
    </Paragraph>

    <Insight
      icon={<Wind size={18} className="text-sage-600" />}
      title="Box Breathing"
      text="Inhale 4 seconds, hold 4 seconds, exhale 4 seconds, hold 4 seconds. Used by Navy SEALs for focus under pressure."
    />

    <SectionLabel>The Technique</SectionLabel>

    <Paragraph>
      Find a comfortable position. Place one hand on your chest and one on your belly. The belly hand should rise more than the chest hand. This means you are breathing deeply into your diaphragm.
    </Paragraph>

    <Paragraph>
      Follow the circle below. Let it guide your rhythm. There is nothing to figure out. Just breathe.
    </Paragraph>

    <InteractiveBox label="Practice: Follow the Breathing Pacer">
      <div className="flex justify-center -mx-2">
        <div className="transform scale-[0.72] origin-center">
          <BreathingPacer />
        </div>
      </div>
    </InteractiveBox>

    <Paragraph className="text-center italic text-stone-400 text-sm">
      Even two minutes of conscious breathing can shift your entire nervous system state.
    </Paragraph>

    <PageEnd />
  </div>
);

// ─── CHAPTER 4: THE BODY ─────────────────────────────────────────
const Chapter4 = () => (
  <div>
    <ChapterHeader
      number={4}
      title="Feeling the Body"
      subtitle="Coming home to your physical self"
      icon={<Heart size={24} className="text-sage-600" />}
    />

    <Paragraph>
      <span className="text-3xl float-left mr-3 mt-1 font-serif text-sage-600 leading-[0.9]">W</span>e live in our heads. We spend so much time thinking that we forget we have a body at all. Yet the body is a constantly broadcasting station of wisdom, if we learn to tune in.
    </Paragraph>

    <PullQuote
      text="The body keeps the score."
      author="Dr. Bessel van der Kolk"
    />

    <SectionLabel>The Body Scan</SectionLabel>

    <Paragraph>
      A body scan is a practice of slowly moving your attention through different parts of your body, from head to toe. You are not trying to change anything. You are simply noticing what is already there.
    </Paragraph>

    <Paragraph>
      You might discover tension you did not know you were holding. You might feel warmth, tingling, heaviness, or nothing at all. All of these are valid experiences.
    </Paragraph>

    <Insight
      icon={<Heart size={18} className="text-sage-600" />}
      title="Why Tension Hides"
      text="Chronic stress causes muscles to contract continuously. Over time, this becomes your 'normal' and you stop noticing it."
    />

    <SectionLabel>Try It Now</SectionLabel>

    <Paragraph>
      Use the guided body scan below. You can step through each region manually, or turn on auto-guide and simply follow along. Allow eight seconds per region.
    </Paragraph>

    <InteractiveBox label="Practice: Guided Body Scan">
      <BodyScanGuide />
    </InteractiveBox>

    <Paragraph className="text-center italic text-stone-400 text-sm">
      After completing a full body scan, most people report feeling noticeably calmer within three to five minutes.
    </Paragraph>

    <PageEnd />
  </div>
);

// ─── CHAPTER 5: GRATITUDE ────────────────────────────────────────
const Chapter5 = () => (
  <div>
    <ChapterHeader
      number={5}
      title="The Grateful Heart"
      subtitle="Rewiring your brain for joy"
      icon={<Sparkles size={24} className="text-sage-600" />}
    />

    <Paragraph>
      <span className="text-3xl float-left mr-3 mt-1 font-serif text-sage-600 leading-[0.9]">O</span>ur brains are wired with a negativity bias. This was useful when we lived among predators. It is less useful when it causes us to ruminate on a single harsh word for days while ignoring a hundred kind ones.
    </Paragraph>

    <PullQuote
      text="The brain is like Velcro for negative experiences and Teflon for positive ones."
      author="Dr. Rick Hanson"
    />

    <SectionLabel>The Gratitude Practice</SectionLabel>

    <Paragraph>
      Gratitude is not about pretending life is perfect. It is about training your attention to also notice what is going well. Studies show that writing down three things you are grateful for each day can measurably increase happiness in as little as 21 days.
    </Paragraph>

    <Insight
      icon={<Sparkles size={18} className="text-sage-600" />}
      title="Start Small"
      text="Notice the tiny joys: warm sunlight, a good cup of tea, someone holding a door open. These moments exist every day."
    />
    <Insight
      icon={<Heart size={18} className="text-sage-600" />}
      title="Feel It"
      text="Don't just list things. Pause and let the feeling of gratitude land in your chest. This is what creates the neural change."
    />

    <SectionLabel>Plant Your Seeds</SectionLabel>

    <Paragraph>
      Use the gratitude garden below. Type something you are thankful for right now, no matter how small. Watch your garden grow.
    </Paragraph>

    <InteractiveBox label="Practice: Your Gratitude Garden">
      <GratitudeGarden />
    </InteractiveBox>

    <PageEnd />
  </div>
);

// ─── CHAPTER 6: THE MIND ────────────────────────────────────────
const Chapter6 = () => (
  <div>
    <ChapterHeader
      number={6}
      title="The Quiet Mind"
      subtitle="Thoughts are visitors, not residents"
      icon={<Eye size={24} className="text-sage-600" />}
    />

    <Paragraph>
      <span className="text-3xl float-left mr-3 mt-1 font-serif text-sage-600 leading-[0.9]">Y</span>ou are not your thoughts. This might be the single most important lesson in mindfulness. Thoughts arise on their own, like clouds passing through the sky. You do not have to believe them, argue with them, or follow them.
    </Paragraph>

    <PullQuote
      text="You are the sky. Everything else is just the weather."
      author="Pema Chodron"
    />

    <SectionLabel>Working With Thoughts</SectionLabel>

    <Paragraph>
      The goal of mindfulness is not to stop thinking. That would be like trying to stop the ocean from making waves. Instead, we learn to observe our thoughts with kindness, without getting swept away.
    </Paragraph>

    <Paragraph>
      One powerful technique is to replace repetitive negative thoughts with conscious affirmations. Not as denial, but as a deliberate choice to feed a more helpful inner narrative.
    </Paragraph>

    <Insight
      icon={<Eye size={18} className="text-sage-600" />}
      title="Name the Pattern"
      text="When a negative thought appears, try saying: 'I notice I am having the thought that...' This creates distance between you and the thought."
    />

    <SectionLabel>Choose Your Inner Voice</SectionLabel>

    <Paragraph>
      Browse through the affirmation cards below. When one resonates, pause and read it to yourself silently three times, slowly. Let the words land.
    </Paragraph>

    <InteractiveBox label="Practice: Affirmation Cards">
      <AffirmationCards />
    </InteractiveBox>

    <PageEnd />
  </div>
);

// ─── CHAPTER 7: THE SENSES ──────────────────────────────────────
const Chapter7 = () => (
  <div>
    <ChapterHeader
      number={7}
      title="Awakening the Senses"
      subtitle="Grounding yourself in this moment"
      icon={<Eye size={24} className="text-sage-600" />}
    />

    <Paragraph>
      <span className="text-3xl float-left mr-3 mt-1 font-serif text-sage-600 leading-[0.9]">W</span>hen anxiety spirals you into your head, your senses are the fastest way back to your body and the present moment. This technique is sometimes called "grounding" or "5-4-3-2-1."
    </Paragraph>

    <PullQuote
      text="Look at everything always as though you were seeing it either for the first or last time."
      author="Betty Smith"
    />

    <SectionLabel>Why Senses Ground Us</SectionLabel>

    <Paragraph>
      Your five senses only operate in the present tense. You cannot smell the past or taste the future. When you deliberately activate a sense, you anchor your awareness to right now.
    </Paragraph>

    <Insight
      icon={<Eye size={18} className="text-sage-600" />}
      title="Sight"
      text="Look at something nearby as if you have never seen it before. Notice the colors, textures, and shadows."
    />
    <Insight
      icon={<Wind size={18} className="text-sage-600" />}
      title="Sound"
      text="Close your eyes and listen for the most distant sound you can detect. Now the closest one."
    />

    <SectionLabel>A One-Minute Reset</SectionLabel>

    <Paragraph>
      The exercise below guides you through all five senses in just 60 seconds. It is a powerful tool for moments of overwhelm, and can be done anywhere, anytime.
    </Paragraph>

    <InteractiveBox label="Practice: The Mindful Minute">
      <MindfulMinute />
    </InteractiveBox>

    <PageEnd />
  </div>
);

// ─── CHAPTER 8: THE INNER VOICE ─────────────────────────────────
const Chapter8 = () => (
  <div>
    <ChapterHeader
      number={8}
      title="Sacred Repetition"
      subtitle="The practice of mantra and intention"
      icon={<Sparkles size={24} className="text-sage-600" />}
    />

    <Paragraph>
      <span className="text-3xl float-left mr-3 mt-1 font-serif text-sage-600 leading-[0.9]">F</span>or thousands of years, contemplative traditions around the world have used repetitive chanting as a path to stillness. A mantra gives your restless mind something gentle to hold onto, like a handrail on a stairway.
    </Paragraph>

    <PullQuote
      text="Mantra is a sound vibration through which we mindfully focus our thoughts, our feelings, and our highest intention."
      author="Girish"
    />

    <SectionLabel>How Mantras Work</SectionLabel>

    <Paragraph>
      When you repeat a phrase with focus, it occupies the part of your brain that would otherwise be generating anxious chatter. Over time, the repetition creates a groove of calm that you can return to more and more easily.
    </Paragraph>

    <Paragraph>
      Traditionally, mantras are counted on a mala — a string of 108 beads. Each bead marks one repetition. Below is a digital mala for your practice.
    </Paragraph>

    <InteractiveBox label="Practice: Mantra Counter">
      <MantraCounter />
    </InteractiveBox>

    <SectionLabel>Ambient Focus</SectionLabel>

    <Paragraph>
      Many practitioners find it helpful to pair their mantra with ambient sound. Select a soundscape below to create your ideal space for inner focus.
    </Paragraph>

    <InteractiveBox label="Practice: Ambient Soundscapes">
      <SoundScapeSelector />
    </InteractiveBox>

    <PageEnd />
  </div>
);

// ─── CHAPTER 9: THE EVENING ─────────────────────────────────────
const Chapter9 = () => (
  <div>
    <ChapterHeader
      number={9}
      title="The Evening Ritual"
      subtitle="Preparing the mind for rest"
      icon={<Moon size={24} className="text-sage-600" />}
    />

    <Paragraph>
      <span className="text-3xl float-left mr-3 mt-1 font-serif text-sage-600 leading-[0.9]">S</span>leep is not merely the absence of wakefulness. It is an active process of repair, consolidation, and renewal. And just as we prepare the body for exercise with a warm-up, we can prepare the mind for sleep with a wind-down.
    </Paragraph>

    <PullQuote
      text="Sleep is the best meditation."
      author="Dalai Lama"
    />

    <SectionLabel>Why We Struggle to Sleep</SectionLabel>

    <Paragraph>
      Most sleep difficulties are not physical but mental. The body is tired, but the mind is still running. A wind-down ritual signals to your nervous system that the day is complete, and it is safe to let go.
    </Paragraph>

    <Insight
      icon={<Moon size={18} className="text-sage-600" />}
      title="The 4-7-8 Method"
      text="Inhale for 4 counts, hold for 7, exhale for 8. This activates the parasympathetic nervous system and slows the heart rate."
    />

    <SectionLabel>Your Wind-Down Checklist</SectionLabel>

    <Paragraph>
      Follow the five-step wind-down below. Complete each step before moving to the next. By the end, you will have given your mind permission to rest.
    </Paragraph>

    <InteractiveBox label="Practice: Sleep Wind-Down">
      <SleepWindDown />
    </InteractiveBox>

    <PageEnd />
  </div>
);

// ─── CHAPTER 10: YOUR TOOLKIT ───────────────────────────────────
const Chapter10 = () => (
  <div>
    <ChapterHeader
      number={10}
      title="Your Toolkit"
      subtitle="All practices in one place"
      icon={<Leaf size={24} className="text-sage-600" />}
    />

    <Paragraph>
      You have arrived at the end of this book, but the beginning of your practice. Below, you will find every tool from this ebook gathered in one place. Return here whenever you need a moment of calm.
    </Paragraph>

    <PullQuote
      text="We are what we repeatedly do. Excellence, then, is not an act, but a habit."
      author="Aristotle"
    />

    <SectionLabel>Your Daily Practice</SectionLabel>

    <Paragraph>
      You do not need to do everything. Even five minutes a day creates change. Here is a suggested daily micro-routine:
    </Paragraph>

    <Insight
      icon={<Sun size={18} className="text-sage-600" />}
      title="Morning (2 min)"
      text="Set an intention for the day. Take three deep breaths."
    />
    <Insight
      icon={<Eye size={18} className="text-sage-600" />}
      title="Midday (1 min)"
      text="Do a mindful minute. Check in with your mood."
    />
    <Insight
      icon={<Moon size={18} className="text-sage-600" />}
      title="Evening (2 min)"
      text="Write three gratitudes. Follow the sleep wind-down."
    />

    <SectionLabel>All Your Zen Tools</SectionLabel>

    <div className="my-6 -mx-1">
      <ZenToolsGrid />
    </div>

    <div className="mt-16 text-center pb-8">
      <div className="w-16 h-16 bg-sage-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
        <Leaf size={24} className="text-white" />
      </div>
      <p className="font-serif text-xl text-stone-800 italic mb-2">Namaste</p>
      <p className="text-sm text-stone-400">
        The light in me honors the light in you.
      </p>
      <div className="w-8 h-[2px] bg-sage-200 mx-auto mt-6" />
      <p className="mt-4 text-[10px] text-stone-300 uppercase tracking-[0.2em]">
        Breathe in, breathe out.
      </p>
    </div>
  </div>
);

// ─── EXPORT ALL CHAPTERS ─────────────────────────────────────────
export const CHAPTERS: Chapter[] = [
  {
    id: 'welcome',
    number: 1,
    title: 'The Path to Mindful Living',
    subtitle: 'An interactive guide',
    content: <Chapter1 />,
  },
  {
    id: 'present',
    number: 2,
    title: 'Being Here',
    subtitle: 'The present moment',
    content: <Chapter2 />,
  },
  {
    id: 'breath',
    number: 3,
    title: 'Breathing Life',
    subtitle: 'Your built-in calm system',
    content: <Chapter3 />,
  },
  {
    id: 'body',
    number: 4,
    title: 'Feeling the Body',
    subtitle: 'Body awareness',
    content: <Chapter4 />,
  },
  {
    id: 'gratitude',
    number: 5,
    title: 'The Grateful Heart',
    subtitle: 'Rewiring for joy',
    content: <Chapter5 />,
  },
  {
    id: 'mind',
    number: 6,
    title: 'The Quiet Mind',
    subtitle: 'Working with thoughts',
    content: <Chapter6 />,
  },
  {
    id: 'senses',
    number: 7,
    title: 'Awakening the Senses',
    subtitle: 'Grounding yourself',
    content: <Chapter7 />,
  },
  {
    id: 'mantra',
    number: 8,
    title: 'Sacred Repetition',
    subtitle: 'Mantra and intention',
    content: <Chapter8 />,
  },
  {
    id: 'evening',
    number: 9,
    title: 'The Evening Ritual',
    subtitle: 'Preparing for rest',
    content: <Chapter9 />,
  },
  {
    id: 'toolkit',
    number: 10,
    title: 'Your Toolkit',
    subtitle: 'All practices in one place',
    content: <Chapter10 />,
  },
];
