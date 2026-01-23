import React from 'react';
import { Heart, Star, Cloud, Sparkles } from 'lucide-react';

export const ANIMATIONS = [
  { id: 'hearts', name: 'Hearts', icon: <Heart /> },
  { id: 'stars', name: 'Stars', icon: <Star /> },
  { id: 'clouds', name: 'Clouds', icon: <Cloud /> },
  { id: 'sparkles', name: 'Sparkles', icon: <Sparkles /> },
];

const AnimationChoices = ({ selected, onSelect }) => (
  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
    {ANIMATIONS.map((item) => (
      <button
        key={item.id}
        onClick={() => onSelect(item.id)}
        className={`flex-1 min-w-[70px] p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ${
          selected === item.id ? 'border-[#FF85A1] bg-white' : 'border-transparent bg-white/30'
        }`}
      >
        <div className="text-[#FF85A1]">{item.icon}</div>
        <span className="text-[10px] font-bold text-[#FFB3C6]">{item.name}</span>
      </button>
    ))}
  </div>
);

export default AnimationChoices;