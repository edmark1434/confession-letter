import React from 'react';
import { Flower, Flower2, Sprout, Sun, Leaf, Trees, Heart } from 'lucide-react';

const FLOWER_ICONS = {
  rose: Flower,
  tulip: Flower2,
  blossom: Sprout,
  sunflower: Sun,
  petal: Leaf,
  garden: Trees
};

const LetterPreview = ({ config, isOpen }) => {
  const SelectedFlower = FLOWER_ICONS[config.flower] || Flower;

  // Design styles for the open letter
  const getDesignContainer = () => {
    switch (config.design) {
      case 'sticky':
        return "rounded-none shadow-xl transform rotate-1 border-l-4 border-black/5";
      case 'scroll':
        return "rounded-none border-x-[20px] border-black/5 shadow-inner";
      case 'envelope':
        return "rounded-t-none rounded-b-3xl border-t-[60px] shadow-2xl";
      case 'card':
        return "rounded-xl border-l-[12px] shadow-2xl";
      default: // classic, modern
        return "rounded-[2rem] shadow-2xl border-8";
    }
  };

  if (!isOpen) {
    // --- CLOSED ENVELOPE VIEW ---
    return (
      <div
        className="w-full max-w-[450px] aspect-[4/3] rounded-2xl shadow-2xl relative overflow-hidden flex items-center justify-center transition-all duration-700 hover:scale-[1.02]"
        style={{ backgroundColor: config.letterColor, border: `2px solid ${config.textColor}20` }}
      >
        {/* Decorative Flap Lines */}
        <div
          className="absolute top-0 w-full h-1/2 border-b-2 border-dashed opacity-20"
          style={{ borderColor: config.textColor }}
        />

        {/* The Wax Seal (Flower Accent) */}
        <div
          className="z-10 w-24 h-24 rounded-full shadow-lg flex items-center justify-center animate-bounce-slow transition-transform"
          style={{ backgroundColor: config.flowerColor }}
        >
          <div className="text-white/90">
             <SelectedFlower size={48} strokeWidth={1.5} />
          </div>
        </div>

        {/* Floating Icons */}
        <Heart className="absolute top-8 left-12 opacity-10 rotate-12" style={{ color: config.textColor }} size={32} />
        <Heart className="absolute bottom-12 right-12 opacity-10 -rotate-12" style={{ color: config.textColor }} size={40} />

        <div className="absolute bottom-6 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 animate-pulse" style={{ color: config.textColor }}>
          Click to reveal
        </div>
      </div>
    );
  }

  // --- OPEN LETTER VIEW ---
  return (
    <div
      className={`w-full max-w-[450px] min-h-[550px] p-10 relative transition-all duration-700 flex flex-col justify-between animate-in zoom-in-95 duration-500 ${getDesignContainer()}`}
      style={{
        backgroundColor: config.letterColor,
        fontFamily: config.font,
        color: config.textColor,
        borderColor: `${config.textColor}20`
      }}
    >
      {/* Decorative Accent */}
      <div className="absolute top-6 right-6 transition-transform hover:scale-110" style={{ color: config.flowerColor }}>
        <SelectedFlower size={50} strokeWidth={1.5} />
      </div>

      {/* The Message */}
      <div className="mt-10 text-lg md:text-xl whitespace-pre-wrap leading-relaxed overflow-hidden">
        {config.message || "Your beautiful message will appear here..."}
      </div>

      {/* Signature */}
      <div className="text-right mt-6 opacity-70 italic font-medium">
        — Forever Yours
      </div>

      {/* Sticky Note Detail */}
      {config.design === 'sticky' && (
        <div className="absolute top-0 left-0 w-full h-8 bg-black/5 pointer-events-none" />
      )}
    </div>
  );
};

export default LetterPreview;