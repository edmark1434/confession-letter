import React from 'react';
import { FileText, StickyNote, Mail, Scroll, Bookmark, FileBadge } from 'lucide-react';

export const LETTER_DESIGNS = [
  { id: 'classic', name: 'Classic', icon: <FileText /> },
  { id: 'sticky', name: 'Sticky Note', icon: <StickyNote /> },
  { id: 'envelope', name: 'Envelope', icon: <Mail /> },
  { id: 'scroll', name: 'Royal Scroll', icon: <Scroll /> },
  { id: 'card', name: 'Greeting Card', icon: <FileBadge /> },
  { id: 'modern', name: 'Modern', icon: <Bookmark /> },
];

const LetterChoices = ({ selected, onSelect }) => (
  <div className="grid grid-cols-3 gap-3">
    {LETTER_DESIGNS.map((item) => (
      <button
        key={item.id}
        onClick={() => onSelect(item.id)}
        className={`p-3 rounded-2xl flex flex-col items-center gap-2 border-2 transition-all ${
          selected === item.id ? 'border-[#FF85A1] bg-white' : 'border-transparent bg-white/30'
        }`}
      >
        <div className="text-[#FF85A1]">{item.icon}</div>
        <span className="text-[10px] font-bold uppercase text-[#FF97B7]">{item.name}</span>
      </button>
    ))}
  </div>
);

export default LetterChoices;