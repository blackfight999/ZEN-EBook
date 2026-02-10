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
      บทที่ {String(number).padStart(2, '0')}
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

const PageEnd: React.FC<{ hint?: string }> = ({ hint = 'ปัดหรือแตะเพื่ออ่านต่อ' }) => (
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
      <p className="text-[10px] uppercase tracking-[0.4em] text-sage-500 font-bold mb-4">อีบุ๊กเชิงโต้ตอบ</p>
      <h1 className="font-serif text-4xl leading-[1.15] text-stone-900 mb-4">
        เส้นทางสู่<br /><span className="italic text-sage-600">การใช้ชีวิตอย่างมีสติ</span>
      </h1>
      <div className="w-12 h-[2px] bg-sage-200 mx-auto mt-6 mb-6" />
      <p className="text-sm text-stone-400 italic px-4">คู่มือพกพาสู่ความสงบ การมีสติ และความสุขภายใน</p>
    </div>

    <Paragraph>
      ยินดีต้อนรับ ผู้อ่านที่รัก คุณกำลังถือคู่มือที่ออกแบบมาไม่เพียงแค่ให้อ่าน แต่ให้สัมผัสและลงมือปฏิบัติ แต่ละบทจะแนะนำแนวคิดเรื่องสติ และเชิญชวนให้คุณฝึกฝนทันที
    </Paragraph>

    <Paragraph>
      ไม่ต้องรีบ คุณสามารถอ่านวันละบท หรือสำรวจทั้งหมดในครั้งเดียว กฎเดียวคือ: อยู่กับปัจจุบันอย่างเต็มที่กับสิ่งที่คุณทำ
    </Paragraph>

    <PullQuote
      text="การเดินทางหมื่นลี้เริ่มต้นด้วยก้าวเดียว"
      author="เล่าจื๊อ"
    />

    <SectionLabel>วิธีใช้หนังสือเล่มนี้</SectionLabel>

    <Insight
      icon={<BookOpen size={18} className="text-sage-600" />}
      title="อ่านบทเรียน"
      text="แต่ละบทเปิดด้วยคำสอนสั้นๆ เกี่ยวกับการฝึกสติ"
    />
    <Insight
      icon={<Sparkles size={18} className="text-sage-600" />}
      title="ลองทำแบบฝึกหัด"
      text="เครื่องมือเชิงโต้ตอบถูกสอดแทรกในแต่ละบท แตะ หายใจ และมีส่วนร่วม"
    />
    <Insight
      icon={<Heart size={18} className="text-sage-600" />}
      title="นำติดตัวไป"
      text="บทสุดท้ายรวบรวมเครื่องมือทั้งหมดไว้ในที่เดียวเพื่อใช้ในชีวิตประจำวัน"
    />

    <InteractiveBox label="แบบฝึกหัดแรก: ตั้งความตั้งใจ">
      <IntentionSetter />
    </InteractiveBox>

    <PageEnd hint="เริ่มต้นเดินทาง" />
  </div>
);

// ─── CHAPTER 2: THE PRESENT MOMENT ───────────────────────────────
const Chapter2 = () => (
  <div>
    <ChapterHeader
      number={2}
      title="อยู่กับปัจจุบัน"
      subtitle="พลังของช่วงเวลาปัจจุบัน"
      icon={<Sun size={24} className="text-sage-600" />}
    />

    <Paragraph>
      <span className="text-3xl float-left mr-3 mt-1 font-serif text-sage-600 leading-[0.9]">ช</span>่วงเวลาปัจจุบันคือเวลาเดียวที่มีอยู่จริง อดีตคือความทรงจำ อนาคตคือจินตนาการ ตอนนี้คือที่ที่ชีวิตเกิดขึ้น
    </Paragraph>

    <Paragraph>
      แต่พวกเราส่วนใหญ่ใช้เวลาเดินทางข้ามเวลา เราเล่นซ้ำความผิดพลาดเมื่อวาน หรือซ้อมความกังวลของพรุ่งนี้ สติคือศิลปะแห่งการกลับมาสู่ปัจจุบันอย่างอ่อนโยน
    </Paragraph>

    <PullQuote
      text="เมื่อวานคือประวัติศาสตร์ พรุ่งนี้คือปริศนา วันนี้คือของขวัญจากพระเจ้า จึงเรียกว่า 'ปัจจุบัน'"
      author="บิล คีน"
    />

    <SectionLabel>วิทยาศาสตร์</SectionLabel>

    <Paragraph>
      นักวิจัยจากฮาร์วาร์ดพบว่าผู้คนใช้เวลา 47% ของชั่วโมงตื่นในการคิดเรื่องอื่นนอกจากสิ่งที่กำลังทำอยู่ และการปล่อยใจลอยนี้ทำให้พวกเขามีความสุขน้อยลงอย่างสม่ำเสมอ
    </Paragraph>

    <Paragraph>
      ยาแก้นั้นเรียบง่ายแต่ไม่ง่าย: การใส่ใจอย่างตั้งใจ ในช่วงเวลาปัจจุบัน โดยไม่ตัดสิน นี่คือแก่นของสติ
    </Paragraph>

    <Insight
      icon={<Sun size={18} className="text-sage-600" />}
      title="ความชัดเจน"
      text="เมื่อคุณอยู่กับปัจจุบัน หมอกในจิตใจจะจางหายไป รายละเอียดชัดเจนขึ้น การตัดสินใจแจ่มใสขึ้น"
    />
    <Insight
      icon={<Heart size={18} className="text-sage-600" />}
      title="ความเมตตา"
      text="การมีสติเปิดประตูสู่ความเห็นอกเห็นใจ เมื่อคุณฟังอย่างแท้จริง คุณจะเชื่อมต่อกันอย่างแท้จริง"
    />

    <SectionLabel>ลองตอนนี้เลย</SectionLabel>

    <Paragraph>
      หยุดอ่านสักครู่ มองขึ้นจากหน้าจอ คุณสังเกตเห็นอะไร? มีเสียงอะไรอยู่รอบตัว? อากาศสัมผัสผิวเป็นอย่างไร?
    </Paragraph>

    <InteractiveBox label="แบบฝึกหัด: สำรวจตัวเอง">
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
      title="ลมหายใจแห่งชีวิต"
      subtitle="ระบบสงบในตัวคุณ"
      icon={<Wind size={24} className="text-sage-600" />}
    />

    <Paragraph>
      <span className="text-3xl float-left mr-3 mt-1 font-serif text-sage-600 leading-[0.9]">ก</span>ารหายใจเป็นการทำงานของร่างกายเพียงอย่างเดียวที่เป็นทั้งอัตโนมัติและตั้งใจ คุณหายใจโดยไม่ต้องคิด แต่ก็สามารถเลือกที่จะหายใจอย่างมีสติ สิ่งนี้ทำให้มันเป็นสะพานเชื่อมระหว่างกายและจิตที่ทรงพลัง
    </Paragraph>

    <PullQuote
      text="ความรู้สึกมาและไปเหมือนเมฆในท้องฟ้าที่มีลม การหายใจอย่างมีสติคือสมอของฉัน"
      author="ติช นัท ฮันห์"
    />

    <SectionLabel>ทำไมมันได้ผล</SectionLabel>

    <Paragraph>
      เมื่อคุณเครียด การหายใจจะตื้นและเร็วขึ้น กระตุ้นการตอบสนองแบบ "สู้หรือหนี" การชะลอลมหายใจอย่างตั้งใจจะกระตุ้นเส้นประสาทเวกัสและเริ่มการตอบสนองแบบผ่อนคลายของร่างกาย
    </Paragraph>

    <Insight
      icon={<Wind size={18} className="text-sage-600" />}
      title="เทคนิคหายใจแบบกล่อง"
      text="หายใจเข้า 4 วินาที กลั้น 4 วินาที หายใจออก 4 วินาที กลั้น 4 วินาที ใช้โดยหน่วยซีลของกองทัพเรือสหรัฐฯ เพื่อมีสมาธิภายใต้ความกดดัน"
    />

    <SectionLabel>เทคนิค</SectionLabel>

    <Paragraph>
      หาท่าที่สบาย วางมือข้างหนึ่งบนหน้าอกและอีกข้างบนท้อง มือที่วางบนท้องควรยกขึ้นมากกว่ามือที่หน้าอก แสดงว่าคุณกำลังหายใจลึกเข้าไปในกระบังลม
    </Paragraph>

    <Paragraph>
      ตามวงกลมด้านล่าง ปล่อยให้มันนำจังหวะของคุณ ไม่มีอะไรต้องคิด แค่หายใจ
    </Paragraph>

    <InteractiveBox label="แบบฝึกหัด: ตามจังหวะการหายใจ">
      <div className="flex justify-center -mx-2">
        <div className="transform scale-[0.72] origin-center">
          <BreathingPacer />
        </div>
      </div>
    </InteractiveBox>

    <Paragraph className="text-center italic text-stone-400 text-sm">
      แม้เพียงสองนาทีของการหายใจอย่างมีสติก็สามารถเปลี่ยนสถานะระบบประสาททั้งหมดของคุณได้
    </Paragraph>

    <PageEnd />
  </div>
);

// ─── CHAPTER 4: THE BODY ─────────────────────────────────────────
const Chapter4 = () => (
  <div>
    <ChapterHeader
      number={4}
      title="สัมผัสร่างกาย"
      subtitle="กลับมาสู่ตัวตนทางกาย"
      icon={<Heart size={24} className="text-sage-600" />}
    />

    <Paragraph>
      <span className="text-3xl float-left mr-3 mt-1 font-serif text-sage-600 leading-[0.9]">เ</span>ราอาศัยอยู่ในหัว เราใช้เวลาคิดมากจนลืมว่ามีร่างกาย แต่ร่างกายคือสถานีกระจายเสียงที่เต็มไปด้วยปัญญา ถ้าเราเรียนรู้ที่จะรับฟัง
    </Paragraph>

    <PullQuote
      text="ร่างกายเก็บบันทึกทุกอย่าง"
      author="ดร. เบสเซล แวน เดอร์ โคลค์"
    />

    <SectionLabel>การสแกนร่างกาย</SectionLabel>

    <Paragraph>
      การสแกนร่างกายคือการฝึกเคลื่อนความสนใจผ่านส่วนต่างๆ ของร่างกายอย่างช้าๆ ตั้งแต่หัวจรดเท้า คุณไม่ได้พยายามเปลี่ยนแปลงอะไร แค่สังเกตสิ่งที่มีอยู่แล้ว
    </Paragraph>

    <Paragraph>
      คุณอาจค้นพบความตึงเครียดที่ไม่รู้ว่ากำลังเก็บไว้ คุณอาจรู้สึกถึงความอบอุ่น เสียวซ่า หนัก หรือไม่รู้สึกอะไรเลย ทั้งหมดนี้ล้วนเป็นประสบการณ์ที่ถูกต้อง
    </Paragraph>

    <Insight
      icon={<Heart size={18} className="text-sage-600" />}
      title="ทำไมความตึงเครียดถึงซ่อนตัว"
      text="ความเครียดเรื้อรังทำให้กล้ามเนื้อหดตัวอย่างต่อเนื่อง เมื่อเวลาผ่านไป สิ่งนี้กลายเป็น 'ปกติ' ของคุณ และคุณหยุดสังเกตมัน"
    />

    <SectionLabel>ลองตอนนี้เลย</SectionLabel>

    <Paragraph>
      ใช้การสแกนร่างกายแบบมีผู้นำด้านล่าง คุณสามารถเลื่อนไปทีละส่วนด้วยตัวเอง หรือเปิดโหมดอัตโนมัติแล้วตามไป ให้เวลาแปดวินาทีต่อส่วน
    </Paragraph>

    <InteractiveBox label="แบบฝึกหัด: สแกนร่างกายแบบมีผู้นำ">
      <BodyScanGuide />
    </InteractiveBox>

    <Paragraph className="text-center italic text-stone-400 text-sm">
      หลังจากสแกนร่างกายครบทั้งหมด คนส่วนใหญ่รายงานว่ารู้สึกสงบลงอย่างเห็นได้ชัดภายในสามถึงห้านาที
    </Paragraph>

    <PageEnd />
  </div>
);

// ─── CHAPTER 5: GRATITUDE ────────────────────────────────────────
const Chapter5 = () => (
  <div>
    <ChapterHeader
      number={5}
      title="หัวใจแห่งความกตัญญู"
      subtitle="ปรับสายสมองเพื่อความสุข"
      icon={<Sparkles size={24} className="text-sage-600" />}
    />

    <Paragraph>
      <span className="text-3xl float-left mr-3 mt-1 font-serif text-sage-600 leading-[0.9]">ส</span>มองของเราถูกตั้งค่าให้มีอคติเชิงลบ สิ่งนี้มีประโยชน์เมื่อเราอาศัยอยู่ท่ามกลางสัตว์นักล่า แต่มีประโยชน์น้อยลงเมื่อมันทำให้เราครุ่นคิดถึงคำพูดรุนแรงเพียงคำเดียวนานหลายวัน ในขณะที่มองข้ามคำพูดดีๆ ร้อยคำ
    </Paragraph>

    <PullQuote
      text="สมองเป็นเหมือนตีนตุ๊กแกสำหรับประสบการณ์เชิงลบ และเป็นเหมือนเทฟลอนสำหรับประสบการณ์เชิงบวก"
      author="ดร. ริค แฮนสัน"
    />

    <SectionLabel>การฝึกความกตัญญู</SectionLabel>

    <Paragraph>
      ความกตัญญูไม่ใช่การแกล้งทำเป็นว่าชีวิตสมบูรณ์แบบ มันคือการฝึกความสนใจให้สังเกตสิ่งดีๆ ที่เกิดขึ้นด้วย การศึกษาแสดงให้เห็นว่าการจดสิ่งที่รู้สึกขอบคุณสามอย่างทุกวันสามารถเพิ่มความสุขได้อย่างวัดผลได้ภายใน 21 วัน
    </Paragraph>

    <Insight
      icon={<Sparkles size={18} className="text-sage-600" />}
      title="เริ่มจากเล็กๆ"
      text="สังเกตความสุขเล็กๆ น้อยๆ: แสงแดดอุ่นๆ ชาดีๆ สักแก้ว ใครสักคนเปิดประตูให้ ช่วงเวลาเหล่านี้มีอยู่ทุกวัน"
    />
    <Insight
      icon={<Heart size={18} className="text-sage-600" />}
      title="สัมผัสมัน"
      text="อย่าแค่ทำรายการ หยุดและปล่อยให้ความรู้สึกขอบคุณเข้ามาในหัวใจ นี่คือสิ่งที่สร้างการเปลี่ยนแปลงทางระบบประสาท"
    />

    <SectionLabel>หว่านเมล็ดของคุณ</SectionLabel>

    <Paragraph>
      ใช้สวนแห่งความกตัญญูด้านล่าง พิมพ์สิ่งที่คุณรู้สึกขอบคุณตอนนี้ ไม่ว่าจะเล็กน้อยแค่ไหน ดูสวนของคุณเติบโต
    </Paragraph>

    <InteractiveBox label="แบบฝึกหัด: สวนแห่งความกตัญญู">
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
      title="จิตใจที่สงบ"
      subtitle="ความคิดเป็นแขก ไม่ใช่ผู้อยู่อาศัย"
      icon={<Eye size={24} className="text-sage-600" />}
    />

    <Paragraph>
      <span className="text-3xl float-left mr-3 mt-1 font-serif text-sage-600 leading-[0.9]">คุ</span>ณไม่ใช่ความคิดของคุณ นี่อาจเป็นบทเรียนที่สำคัญที่สุดในการฝึกสติ ความคิดเกิดขึ้นเอง เหมือนเมฆที่ลอยผ่านท้องฟ้า คุณไม่จำเป็นต้องเชื่อ ไม่ต้องโต้แย้ง หรือตามมันไป
    </Paragraph>

    <PullQuote
      text="คุณคือท้องฟ้า ทุกสิ่งอื่นเป็นเพียงสภาพอากาศ"
      author="เพมา โชดรอน"
    />

    <SectionLabel>การทำงานกับความคิด</SectionLabel>

    <Paragraph>
      เป้าหมายของสติไม่ใช่การหยุดคิด นั่นเหมือนพยายามหยุดมหาสมุทรไม่ให้สร้างคลื่น แทนที่จะทำเช่นนั้น เราเรียนรู้ที่จะสังเกตความคิดด้วยความเมตตา โดยไม่ถูกพัดพาไป
    </Paragraph>

    <Paragraph>
      เทคนิคที่มีพลังอย่างหนึ่งคือการแทนที่ความคิดเชิงลบซ้ำๆ ด้วยคำยืนยันเชิงบวกอย่างมีสติ ไม่ใช่การปฏิเสธ แต่เป็นการเลือกอย่างตั้งใจที่จะป้อนเรื่องเล่าภายในที่เป็นประโยชน์มากกว่า
    </Paragraph>

    <Insight
      icon={<Eye size={18} className="text-sage-600" />}
      title="ตั้งชื่อรูปแบบ"
      text="เมื่อความคิดเชิงลบปรากฏขึ้น ลองพูดว่า: 'ฉันสังเกตว่าฉันกำลังมีความคิดว่า...' สิ่งนี้สร้างระยะห่างระหว่างคุณกับความคิด"
    />

    <SectionLabel>เลือกเสียงภายในของคุณ</SectionLabel>

    <Paragraph>
      เลื่อนดูการ์ดยืนยันด้านล่าง เมื่อเจอคำที่โดนใจ หยุดและอ่านให้ตัวเองฟังในใจสามครั้งอย่างช้าๆ ปล่อยให้คำเหล่านั้นซึมเข้ามา
    </Paragraph>

    <InteractiveBox label="แบบฝึกหัด: การ์ดคำยืนยัน">
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
      title="ปลุกประสาทสัมผัส"
      subtitle="ยึดตัวเองกับช่วงเวลาปัจจุบัน"
      icon={<Eye size={24} className="text-sage-600" />}
    />

    <Paragraph>
      <span className="text-3xl float-left mr-3 mt-1 font-serif text-sage-600 leading-[0.9]">เ</span>มื่อความวิตกกังวลพัดพาคุณเข้าไปในหัว ประสาทสัมผัสคือทางที่เร็วที่สุดในการกลับสู่ร่างกายและปัจจุบัน เทคนิคนี้บางครั้งเรียกว่า "การกราวด์ดิ้ง" หรือ "5-4-3-2-1"
    </Paragraph>

    <PullQuote
      text="จงมองทุกสิ่งเสมือนเห็นเป็นครั้งแรกหรือครั้งสุดท้าย"
      author="เบตตี้ สมิธ"
    />

    <SectionLabel>ทำไมประสาทสัมผัสถึงช่วยยึดเรา</SectionLabel>

    <Paragraph>
      ประสาทสัมผัสทั้งห้าทำงานเฉพาะในปัจจุบันเท่านั้น คุณไม่สามารถดมกลิ่นอดีตหรือชิมรสอนาคต เมื่อคุณกระตุ้นประสาทสัมผัสอย่างตั้งใจ คุณยึดการรับรู้ไว้กับตอนนี้
    </Paragraph>

    <Insight
      icon={<Eye size={18} className="text-sage-600" />}
      title="การมองเห็น"
      text="มองสิ่งที่อยู่ใกล้ตัวเหมือนไม่เคยเห็นมาก่อน สังเกตสี พื้นผิว และเงา"
    />
    <Insight
      icon={<Wind size={18} className="text-sage-600" />}
      title="เสียง"
      text="หลับตาและฟังเสียงที่ไกลที่สุดที่คุณจับได้ แล้วเสียงที่ใกล้ที่สุด"
    />

    <SectionLabel>รีเซ็ตภายในหนึ่งนาที</SectionLabel>

    <Paragraph>
      แบบฝึกหัดด้านล่างจะนำคุณผ่านประสาทสัมผัสทั้งห้าในเวลาเพียง 60 วินาที เป็นเครื่องมือที่ทรงพลังสำหรับช่วงเวลาที่ท่วมท้น และสามารถทำได้ทุกที่ทุกเวลา
    </Paragraph>

    <InteractiveBox label="แบบฝึกหัด: หนึ่งนาทีแห่งสติ">
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
      title="การท่องซ้ำอันศักดิ์สิทธิ์"
      subtitle="การฝึกมนตราและเจตนา"
      icon={<Sparkles size={24} className="text-sage-600" />}
    />

    <Paragraph>
      <span className="text-3xl float-left mr-3 mt-1 font-serif text-sage-600 leading-[0.9]">เ</span>ป็นเวลาหลายพันปีที่ประเพณีการเพ่งพินิจทั่วโลกใช้การสวดซ้ำเป็นเส้นทางสู่ความสงบ มนตราให้จิตใจที่กระสับกระส่ายมีสิ่งอ่อนโยนให้ยึดเกาะ เหมือนราวจับบนบันได
    </Paragraph>

    <PullQuote
      text="มนตราคือการสั่นสะเทือนของเสียงที่ผ่านมัน เราตั้งใจโฟกัสความคิด ความรู้สึก และเจตนาสูงสุดของเรา"
      author="คีริช"
    />

    <SectionLabel>มนตราทำงานอย่างไร</SectionLabel>

    <Paragraph>
      เมื่อคุณท่องวลีด้วยสมาธิ มันจะครอบครองส่วนของสมองที่มิฉะนั้นจะสร้างความกังวลวุ่นวาย เมื่อเวลาผ่านไป การท่องซ้ำสร้างร่องของความสงบที่คุณสามารถกลับมาได้ง่ายขึ้นเรื่อยๆ
    </Paragraph>

    <Paragraph>
      ตามประเพณี มนตราจะนับบนลูกประคำมาลา ซึ่งเป็นสายลูกประคำ 108 เม็ด แต่ละเม็ดหมายถึงหนึ่งการท่อง ด้านล่างคือมาลาดิจิทัลสำหรับการฝึกของคุณ
    </Paragraph>

    <InteractiveBox label="แบบฝึกหัด: ตัวนับมนตรา">
      <MantraCounter />
    </InteractiveBox>

    <SectionLabel>เสียงบรรยากาศเพื่อสมาธิ</SectionLabel>

    <Paragraph>
      ผู้ฝึกหลายคนพบว่าการจับคู่มนตรากับเสียงบรรยากาศช่วยได้ เลือกเสียงด้านล่างเพื่อสร้างพื้นที่ในอุดมคติสำหรับการโฟกัสภายใน
    </Paragraph>

    <InteractiveBox label="แบบฝึกหัด: เสียงบรรยากาศ">
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
      title="พิธีกรรมยามเย็น"
      subtitle="เตรียมจิตใจเพื่อการพักผ่อน"
      icon={<Moon size={24} className="text-sage-600" />}
    />

    <Paragraph>
      <span className="text-3xl float-left mr-3 mt-1 font-serif text-sage-600 leading-[0.9]">ก</span>ารนอนหลับไม่ใช่เพียงแค่การหยุดตื่น แต่เป็นกระบวนการซ่อมแซม จัดระเบียบ และฟื้นฟูอย่างกระตือรือร้น เช่นเดียวกับที่เราเตรียมร่างกายก่อนออกกำลังกายด้วยการวอร์มอัพ เราสามารถเตรียมจิตใจก่อนนอนด้วยการคลายตัว
    </Paragraph>

    <PullQuote
      text="การนอนหลับคือการทำสมาธิที่ดีที่สุด"
      author="ดาไลลามะ"
    />

    <SectionLabel>ทำไมเราถึงนอนไม่หลับ</SectionLabel>

    <Paragraph>
      ปัญหาการนอนหลับส่วนใหญ่ไม่ใช่ทางกายแต่ทางจิต ร่างกายเหนื่อย แต่จิตใจยังทำงานอยู่ พิธีกรรมก่อนนอนเป็นสัญญาณให้ระบบประสาทของคุณรู้ว่าวันจบลงแล้ว และปลอดภัยที่จะปล่อยวาง
    </Paragraph>

    <Insight
      icon={<Moon size={18} className="text-sage-600" />}
      title="เทคนิค 4-7-8"
      text="หายใจเข้า 4 จังหวะ กลั้น 7 จังหวะ หายใจออก 8 จังหวะ วิธีนี้กระตุ้นระบบประสาทพาราซิมพาเทติกและชะลอการเต้นของหัวใจ"
    />

    <SectionLabel>รายการคลายตัวก่อนนอน</SectionLabel>

    <Paragraph>
      ทำตามขั้นตอนคลายตัวห้าขั้นด้านล่าง ทำให้ครบแต่ละขั้นก่อนไปขั้นต่อไป เมื่อจบแล้ว คุณจะได้ให้อนุญาตจิตใจพักผ่อน
    </Paragraph>

    <InteractiveBox label="แบบฝึกหัด: คลายตัวก่อนนอน">
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
      title="ชุดเครื่องมือของคุณ"
      subtitle="แบบฝึกหัดทั้งหมดในที่เดียว"
      icon={<Leaf size={24} className="text-sage-600" />}
    />

    <Paragraph>
      คุณมาถึงจุดสิ้นสุดของหนังสือเล่มนี้ แต่เป็นจุดเริ่มต้นของการฝึกฝน ด้านล่างคุณจะพบเครื่องมือทั้งหมดจากอีบุ๊กนี้รวมไว้ในที่เดียว กลับมาที่นี่ได้ทุกเมื่อที่ต้องการช่วงเวลาแห่งความสงบ
    </Paragraph>

    <PullQuote
      text="เราเป็นสิ่งที่เราทำซ้ำๆ ความเป็นเลิศจึงไม่ใช่การกระทำ แต่เป็นนิสัย"
      author="อริสโตเติล"
    />

    <SectionLabel>การฝึกประจำวัน</SectionLabel>

    <Paragraph>
      คุณไม่จำเป็นต้องทำทุกอย่าง แม้เพียงวันละห้านาทีก็สร้างการเปลี่ยนแปลง นี่คือกิจวัตรย่อยที่แนะนำ:
    </Paragraph>

    <Insight
      icon={<Sun size={18} className="text-sage-600" />}
      title="เช้า (2 นาที)"
      text="ตั้งความตั้งใจสำหรับวัน หายใจลึกสามครั้ง"
    />
    <Insight
      icon={<Eye size={18} className="text-sage-600" />}
      title="กลางวัน (1 นาที)"
      text="ทำหนึ่งนาทีแห่งสติ สำรวจอารมณ์ของคุณ"
    />
    <Insight
      icon={<Moon size={18} className="text-sage-600" />}
      title="เย็น (2 นาที)"
      text="เขียนสิ่งที่ขอบคุณสามอย่าง ทำตามขั้นตอนคลายตัวก่อนนอน"
    />

    <SectionLabel>เครื่องมือเซนทั้งหมดของคุณ</SectionLabel>

    <div className="my-6 -mx-1">
      <ZenToolsGrid />
    </div>

    <div className="mt-16 text-center pb-8">
      <div className="w-16 h-16 bg-sage-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
        <Leaf size={24} className="text-white" />
      </div>
      <p className="font-serif text-xl text-stone-800 italic mb-2">นมัสเต</p>
      <p className="text-sm text-stone-400">
        แสงสว่างในตัวฉันเคารพแสงสว่างในตัวคุณ
      </p>
      <div className="w-8 h-[2px] bg-sage-200 mx-auto mt-6" />
      <p className="mt-4 text-[10px] text-stone-300 uppercase tracking-[0.2em]">
        หายใจเข้า หายใจออก
      </p>
    </div>
  </div>
);

// ─── EXPORT ALL CHAPTERS ─────────────────────────────────────────
export const CHAPTERS: Chapter[] = [
  {
    id: 'welcome',
    number: 1,
    title: 'เส้นทางสู่การใช้ชีวิตอย่างมีสติ',
    subtitle: 'คู่มือเชิงโต้ตอบ',
    content: <Chapter1 />,
  },
  {
    id: 'present',
    number: 2,
    title: 'อยู่กับปัจจุบัน',
    subtitle: 'ช่วงเวลาปัจจุบัน',
    content: <Chapter2 />,
  },
  {
    id: 'breath',
    number: 3,
    title: 'ลมหายใจแห่งชีวิต',
    subtitle: 'ระบบสงบในตัวคุณ',
    content: <Chapter3 />,
  },
  {
    id: 'body',
    number: 4,
    title: 'สัมผัสร่างกาย',
    subtitle: 'การตระหนักรู้ทางกาย',
    content: <Chapter4 />,
  },
  {
    id: 'gratitude',
    number: 5,
    title: 'หัวใจแห่งความกตัญญู',
    subtitle: 'ปรับสายสมองเพื่อความสุข',
    content: <Chapter5 />,
  },
  {
    id: 'mind',
    number: 6,
    title: 'จิตใจที่สงบ',
    subtitle: 'การทำงานกับความคิด',
    content: <Chapter6 />,
  },
  {
    id: 'senses',
    number: 7,
    title: 'ปลุกประสาทสัมผัส',
    subtitle: 'ยึดตัวเองกับปัจจุบัน',
    content: <Chapter7 />,
  },
  {
    id: 'mantra',
    number: 8,
    title: 'การท่องซ้ำอันศักดิ์สิทธิ์',
    subtitle: 'มนตราและเจตนา',
    content: <Chapter8 />,
  },
  {
    id: 'evening',
    number: 9,
    title: 'พิธีกรรมยามเย็น',
    subtitle: 'เตรียมตัวพักผ่อน',
    content: <Chapter9 />,
  },
  {
    id: 'toolkit',
    number: 10,
    title: 'ชุดเครื่องมือของคุณ',
    subtitle: 'แบบฝึกหัดทั้งหมดในที่เดียว',
    content: <Chapter10 />,
  },
];
