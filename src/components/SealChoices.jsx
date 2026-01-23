import React from 'react';
import {
  Flower, Flower2, Sprout, Sun, Leaf, Trees,
  Heart, Star, Moon, Crown, Gem, Shell,
  Snowflake, PawPrint
} from 'lucide-react';

export const SEALS = [
  { id: 'rose', icon: <Flower /> },
  { id: 'tulip', icon: <Flower2 /> },
  { id: 'sunflower', icon: <Sun /> },
  { id: 'blossom', icon: <Sprout /> },
  { id: 'petal', icon: <Leaf /> },
  { id: 'garden', icon: <Trees /> },
  { id: 'heart', icon: <Heart /> },
  { id: 'star', icon: <Star /> },
  { id: 'moon', icon: <Moon /> },
  { id: 'crown', icon: <Crown /> },
  { id: 'gem', icon: <Gem /> },
  { id: 'shell', icon: <Shell /> },
  { id: 'snowflake', icon: <Snowflake /> },
  { id: 'paw', icon: <PawPrint /> },
];

const SealChoices = ({ selected, onSelect }) => (
  <div className="grid grid-cols-4 gap-2">
    {SEALS.map((item) => (
      <button
        key={item.id}
        onClick={() => onSelect(item.id)}
        className={`p-3 rounded-xl border-2 transition-all flex justify-center items-center ${
          selected === item.id 
            ? 'border-[#FF85A1] bg-white shadow-sm scale-105' 
            : 'border-transparent bg-white/20 hover:bg-white/40'
        }`}
      >
        <div className="text-[#FF85A1] w-6 h-6">{item.icon}</div>
      </button>
    ))}
  </div>
);

export default SealChoices;