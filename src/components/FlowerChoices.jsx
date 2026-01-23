import React from 'react';
import { Flower, Flower2, Sprout, Sun, Leaf, Trees } from 'lucide-react';

export const FLOWERS = [
  { id: 'rose', name: 'Rose', icon: <Flower /> },
  { id: 'tulip', name: 'Tulip', icon: <Flower2 /> },
  { id: 'sunflower', name: 'Sunflower', icon: <Sun /> },
  { id: 'blossom', name: 'Blossom', icon: <Sprout /> },
  { id: 'petal', name: 'Petal', icon: <Leaf /> },
  { id: 'garden', name: 'Garden', icon: <Trees /> },
];

const FlowerChoices = ({ selected, onSelect }) => (
  <div className="grid grid-cols-3 gap-3">
    {FLOWERS.map((item) => (
      <button
        key={item.id}
        onClick={() => onSelect(item.id)}
        className={`p-3 rounded-2xl border-2 transition-all ${
          selected === item.id ? 'border-[#FF85A1] bg-white' : 'border-transparent bg-white/30'
        }`}
      >
        <div className="text-[#FF85A1] flex justify-center">{item.icon}</div>
      </button>
    ))}
  </div>
);

export default FlowerChoices;