import React from 'react';
import {
  Flower, Flower2, Sprout, Sun, Leaf, Trees,
  Heart, Star, Moon, Crown, Gem, Shell,
  Snowflake, PawPrint
} from 'lucide-react';

// Mapping icons to match the SealChoices in your letter.jsx
const SEAL_ICONS = {
  rose: Flower,
  tulip: Flower2,
  blossom: Sprout,
  sunflower: Sun,
  petal: Leaf,
  garden: Trees,
  heart: Heart,
  star: Star,
  moon: Moon,
  crown: Crown,
  gem: Gem,
  shell: Shell,
  snowflake: Snowflake,
  paw: PawPrint
};

const LetterPreview = ({ config, isOpen }) => {
  // Changed from config.flower to config.seal to match letter.jsx
  const SelectedSeal = SEAL_ICONS[config.seal] || Heart;

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
      default:
        return "rounded-[2rem] shadow-2xl border-8";
    }
  };

  const getCustomStyles = () => {
    const styles = {
      backgroundColor: config.letterColor,
      fontFamily: config.font,
      color: config.textColor,
      borderColor: `${config.textColor}20`,
    };

    // Special styles for lined design
    if (config.design === 'lined') {
      const lineColor = `${config.textColor}20`; // 20% opacity
      const lineHeight = '2.2rem';
      const lineSpacing = '0.1rem';

      styles.background = `linear-gradient(
        to bottom,
        transparent,
        transparent calc(${lineHeight} - 1px),
        ${lineColor} calc(${lineHeight} - 1px),
        ${lineColor} ${lineHeight}
      )`;
      styles.backgroundSize = `100% ${lineHeight}`;
      styles.lineHeight = lineHeight;
      styles.paddingTop = lineSpacing;
      styles.backgroundRepeat = 'repeat-y';
    }

    return styles;
  };

  // Get text wrapping style
  const getTextWrapping = () => {
    return "break-words overflow-wrap-anywhere hyphens-auto"; // Better text wrapping
  };

  if (!isOpen) {
    return (
      <div
        className="w-full max-w-[450px] aspect-[4/3] rounded-2xl shadow-2xl relative overflow-hidden flex items-center justify-center transition-all duration-700 hover:scale-[1.02] flex-shrink-0"
        style={{ backgroundColor: config.envelopeColor, border: `2px solid ${config.textColor}20` }}
      >
        <div className="absolute top-0 w-full h-1/2 border-b-2 border-dashed opacity-20" style={{ borderColor: config.textColor }} />

        {/* Using sealColor and sealIconColor from your config */}
        <div
          className="z-10 w-24 h-24 rounded-full shadow-lg flex items-center justify-center animate-bounce-slow transition-transform"
          style={{ backgroundColor: config.sealColor }}
        >
          <div style={{ color: config.sealIconColor }}>
             <SelectedSeal size={48} strokeWidth={1.5} />
          </div>
        </div>

        <Heart className="absolute top-8 left-12 opacity-10 rotate-12" style={{ color: config.textColor }} size={32} />
        <Heart className="absolute bottom-12 right-12 opacity-10 -rotate-12" style={{ color: config.textColor }} size={40} />

        <div className="absolute bottom-6 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 animate-pulse" style={{ color: config.textColor }}>
          Click to reveal
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-[450px] min-h-[550px] relative transition-all duration-700 flex flex-col animate-in zoom-in-95 duration-500 ${getDesignContainer()} flex-shrink-0`}
      style={getCustomStyles()}
    >
      <div className="z-10 relative w-full h-full p-10 flex flex-col text-left">
        {/* Decorative Accent */}
        <div className="absolute top-6 right-6 transition-transform hover:scale-110 opacity-40">
          <SelectedSeal size={40} strokeWidth={1.5} />
        </div>

        {/* --- ADDED TITLE SECTION --- */}
        {config.title && (
          <h2 className="mt-4 text-2xl md:text-3xl font-black tracking-tight leading-tight mb-6 break-words">
            {config.title}
          </h2>
        )}

        {/* The Message with proper text wrapping */}
        <div className={`flex-1 text-lg md:text-xl whitespace-pre-wrap leading-relaxed overflow-hidden ${getTextWrapping()}`}>
          {config.message || "Your beautiful message will appear here..."}
        </div>

        {/* Signature */}
        <div className="text-right mt-6 opacity-70 italic font-medium">
          — Forever Yours
        </div>

        {config.design === 'sticky' && (
          <div className="absolute top-0 left-0 w-full h-8 bg-black/5 pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export default LetterPreview;