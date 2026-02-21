/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Quote, Sparkles, ArrowRight } from 'lucide-react';

/**
 * Simple markup syntax:
 *
 * ## หัวข้อ          → section heading
 * > คำคม | ผู้แต่ง    → pull quote (pipe separates optional author)
 * --- or ===         → divider
 * [tip] ... [/tip]   → insight box (highlighted tip)
 * blank line         → paragraph break
 * **text**           → bold
 * *text*             → italic
 * Everything else    → paragraph
 */

interface RenderedBlock {
  type: 'paragraph' | 'heading' | 'quote' | 'divider' | 'tip';
  content: string;
  author?: string;
}

function parseInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[2]) parts.push(<strong key={key++}>{m[2]}</strong>);
    else if (m[3]) parts.push(<em key={key++}>{m[3]}</em>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : <>{parts}</>;
}

function parseBlocks(body: string): RenderedBlock[] {
  const lines = body.split('\n');
  const blocks: RenderedBlock[] = [];
  let i = 0;
  let tipBuffer: string[] = [];
  let inTip = false;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (line.toLowerCase() === '[tip]') {
      inTip = true;
      tipBuffer = [];
      i++;
      continue;
    }
    if (line.toLowerCase() === '[/tip]') {
      inTip = false;
      blocks.push({ type: 'tip', content: tipBuffer.join(' ').trim() });
      tipBuffer = [];
      i++;
      continue;
    }
    if (inTip) {
      if (line) tipBuffer.push(line);
      i++;
      continue;
    }

    if (!line) { i++; continue; }

    if (line.startsWith('## ')) {
      blocks.push({ type: 'heading', content: line.slice(3).trim() });
    } else if (line.startsWith('> ')) {
      const body = line.slice(2);
      const pipeIdx = body.lastIndexOf(' | ');
      if (pipeIdx !== -1) {
        blocks.push({ type: 'quote', content: body.slice(0, pipeIdx).trim(), author: body.slice(pipeIdx + 3).trim() });
      } else {
        blocks.push({ type: 'quote', content: body.trim() });
      }
    } else if (line === '---' || line === '===') {
      blocks.push({ type: 'divider', content: '' });
    } else {
      // Accumulate consecutive non-empty lines into one paragraph
      const para: string[] = [line];
      while (i + 1 < lines.length && lines[i + 1].trim() && !lines[i + 1].trim().startsWith('## ') && !lines[i + 1].trim().startsWith('> ') && lines[i + 1].trim() !== '---' && lines[i + 1].trim() !== '===' && lines[i + 1].trim().toLowerCase() !== '[tip]') {
        i++;
        para.push(lines[i].trim());
      }
      blocks.push({ type: 'paragraph', content: para.join(' ') });
    }
    i++;
  }
  return blocks;
}

export const ChapterRenderer: React.FC<{ body: string; title: string; subtitle: string; icon?: string }> = ({ body, title, subtitle, icon }) => {
  const blocks = parseBlocks(body);

  return (
    <div>
      {/* Chapter Header */}
      <div className="text-center mb-10 pt-2">
        {icon && (
          <div className="w-16 h-16 bg-sage-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-sage-100 text-3xl">
            {icon}
          </div>
        )}
        <h1 className="font-serif text-3xl leading-tight text-stone-900 mb-3">{title}</h1>
        <p className="text-sm text-stone-400 italic">{subtitle}</p>
        <div className="w-12 h-[2px] bg-sage-200 mx-auto mt-5" />
      </div>

      {/* Body Blocks */}
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={idx} className="text-[16px] leading-[1.8] text-stone-600 mb-6">
                {parseInline(block.content)}
              </p>
            );
          case 'heading':
            return (
              <p key={idx} className="text-[10px] uppercase tracking-[0.3em] text-sage-500 font-bold mb-4 mt-10">
                {block.content}
              </p>
            );
          case 'quote':
            return (
              <div key={idx} className="my-8 px-5 py-6 bg-sage-50/60 rounded-2xl border-l-4 border-sage-600">
                <Quote size={16} className="text-sage-400 mb-2" />
                <p className="font-serif text-lg italic text-stone-700 leading-relaxed">{block.content}</p>
                {block.author && (
                  <p className="mt-3 text-xs text-sage-600 font-bold uppercase tracking-wider">&mdash; {block.author}</p>
                )}
              </div>
            );
          case 'tip':
            return (
              <div key={idx} className="my-8 bg-white rounded-2xl border border-sage-100 shadow-sm overflow-hidden">
                <div className="px-5 py-3 bg-sage-50 border-b border-sage-100">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-sage-600 font-bold flex items-center gap-2">
                    <Sparkles size={12} /> ข้อคิด
                  </p>
                </div>
                <div className="p-5">
                  <p className="text-sm text-stone-600 leading-relaxed">{parseInline(block.content)}</p>
                </div>
              </div>
            );
          case 'divider':
            return <div key={idx} className="w-12 h-[2px] bg-sage-200 mx-auto my-8" />;
          default:
            return null;
        }
      })}

      {/* Page end hint */}
      <div className="mt-12 mb-4 text-center">
        <div className="w-8 h-[2px] bg-sage-200 mx-auto mb-4" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-stone-300 font-bold flex items-center justify-center gap-2">
          ปัดหรือแตะเพื่ออ่านต่อ <ArrowRight size={10} />
        </p>
      </div>
    </div>
  );
};
