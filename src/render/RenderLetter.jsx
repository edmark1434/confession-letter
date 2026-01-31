// src/render/RenderLetter.jsx
import React from 'react';

const RenderLetter = ({ config }) => {
  const getLetterBaseClass = () => {
    // FIXED SIZE: Set explicit width/height and flex-shrink-0 to prevent any shrinking
    const base = "w-[420px] h-[580px] relative transition-all duration-700 ease-in-out flex-shrink-0 overflow-hidden ";

    switch (config.design) {
      case 'sticky':
        return base + "rounded-none transform rotate-1 shadow-xl border-t-[30px] border-black/5";
      case 'rounded':
        return base + "rounded-[4rem] shadow-2xl border-[10px]";
      case 'lined':
        return base + "rounded-none shadow-lg border-l-[40px] border-red-100/10";
      case 'dotted':
        return base + "rounded-sm shadow-2xl border-[1px]";
      case 'scroll':
        return base + "rounded-none border-x-[25px] border-black/10 shadow-inner";
      case 'card':
        return base + "rounded-2xl shadow-2xl border-none";
      case 'classic':
      default:
        return base + "rounded-sm shadow-2xl border-[1px]";
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

    if (config.design === 'dotted') {
      styles.backgroundImage = `radial-gradient(${config.textColor}33 1px, transparent 1px)`;
      styles.backgroundSize = '20px 20px';
    }

    return styles;
  };

  // Get text alignment based on design
  const getTextAlignment = () => {
    return "text-left"; // Force left alignment for all designs
  };

  // Get text wrapping style
  const getTextWrapping = () => {
    return "break-words overflow-wrap-anywhere hyphens-auto"; // Better text wrapping
  };

  return (
    <div className={getLetterBaseClass()} style={getCustomStyles()}>
      <div className={`z-10 relative w-full h-full p-10 flex flex-col ${getTextAlignment()}`}>
        {config.title && (
          <h2 className="text-2xl font-black mb-6 uppercase tracking-tight break-words">
            {config.title}
          </h2>
        )}

        {/* Message with proper text wrapping and alignment */}
        <div className={`text-lg md:text-xl whitespace-pre-wrap leading-relaxed flex-1 overflow-y-auto scrollbar-hide ${getTextWrapping()}`}>
          {config.message || "Your message will appear here..."}
        </div>

        <div className="text-right mt-6 opacity-60 italic font-medium">
          — Forever Yours
        </div>
      </div>

      {/* SMOOTH ANIMATION: Decorative bottom slides up and fades in for 'Card' design */}
      <div
        className={`absolute bottom-0 left-0 w-full h-32 pointer-events-none transition-all duration-700 ease-in-out ${
          config.design === 'card' ? 'opacity-20 translate-y-0' : 'opacity-0 translate-y-full'
        }`}
        style={{ backgroundColor: config.textColor }}
      />
    </div>
  );
};

export default RenderLetter;