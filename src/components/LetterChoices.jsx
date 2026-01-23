import React from 'react';
import {
  FileText, StickyNote, Square, List,
  CircleEllipsis, Coffee
} from 'lucide-react';

export const LETTER_DESIGNS = [
  { id: 'classic', name: 'Classic', icon: <FileText /> },
  { id: 'sticky', name: 'Sticky Note', icon: <StickyNote /> },
  { id: 'rounded', name: 'Rounded', icon: <Square /> },
  { id: 'lined', name: 'Lined', icon: <List /> },
  { id: 'dotted', name: 'Dotted', icon: <CircleEllipsis /> },
  { id: 'coffee', name: 'Coffee', icon: <Coffee /> },
];

const LetterChoices = ({ selected, onSelect }) => (
  <div className="grid grid-cols-3 gap-3">
    {LETTER_DESIGNS.map((item) => (
      <button
        key={item.id}
        onClick={() => onSelect(item.id)}
        className={`p-3 rounded-2xl flex flex-col items-center gap-2 border-2 transition-all ${
          selected === item.id 
            ? 'border-[#FF85A1] bg-white shadow-md scale-105' 
            : 'border-transparent bg-white/30 hover:bg-white/50'
        }`}
      >
        <div className="text-[#FF85A1]">{item.icon}</div>
        <span className="text-[9px] font-black uppercase tracking-tighter text-[#FF97B7]">
          {item.name}
        </span>
      </button>
    ))}
  </div>
);

export default LetterChoices;