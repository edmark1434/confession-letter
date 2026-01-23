import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower, Flower2, Sprout, Sun, Leaf, Trees, Heart } from 'lucide-react';

const FLOWER_ICONS = {
  rose: Flower,
  tulip: Flower2,
  blossom: Sprout,
  sunflower: Sun,
  petal: Leaf,
  garden: Trees
};

const LetterAction = ({ config, isEnveloped, onOpenComplete }) => {
  const [stage, setStage] = useState('letter'); // stages: 'letter', 'sealed', 'opening'
  const SelectedFlower = FLOWER_ICONS[config.flower] || Flower;

  // Sync internal state with the external "Put in Envelope" trigger
  useEffect(() => {
    if (isEnveloped) {
      setStage('sealed');
    } else {
      setStage('letter');
    }
  }, [isEnveloped]);

  const handleOpen = () => {
    setStage('opening');
    // Wait for the animation (flap open + letter slide) to finish before removing the envelope
    setTimeout(() => {
      onOpenComplete(); // This resets isEnveloped to false in the parent
      setStage('letter');
    }, 1200);
  };

  // 1. Logic for Letter Design Styles
  const getLetterBaseClass = () => {
    const base = "w-full max-w-[420px] min-h-[500px] p-10 relative flex flex-col justify-between transition-all duration-500 ";
    switch (config.design) {
      case 'sticky':
        return base + "rounded-none transform rotate-1 shadow-xl border-t-[30px] border-black/5";
      case 'rounded':
        return base + "rounded-[4rem] shadow-2xl border-[10px]";
      case 'lined':
        return base + "rounded-none shadow-lg border-l-[40px] border-red-100/50";
      case 'scroll':
        return base + "rounded-none border-x-[25px] border-black/10 shadow-inner";
      case 'card':
        return base + "rounded-xl border-l-[15px] border-black/10 shadow-2xl";
      case 'classic':
      default:
        return base + "rounded-sm shadow-2xl border-[1px]";
    }
  };

  // 2. Logic for Custom Design CSS (Gradients/Lines)
  const getCustomStyles = () => {
    const styles = {
      backgroundColor: config.letterColor,
      fontFamily: config.font,
      color: config.textColor,
      borderColor: `${config.textColor}20`,
    };

    if (config.design === 'lined') {
      styles.backgroundImage = `linear-gradient(transparent 95%, ${config.textColor}15 95%)`;
      styles.backgroundSize = '100% 2.2rem';
      styles.lineHeight = '2.2rem';
    }

    return styles;
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-[650px] perspective-1000">
      <AnimatePresence mode="wait">
        {stage === 'letter' ? (
          // --- VIEW 1: Standalone Letter ---
          <motion.div
            key="standalone"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className={getLetterBaseClass()}
            style={getCustomStyles()}
          >
            <div className="absolute top-6 right-6" style={{ color: config.flowerColor }}>
              <SelectedFlower size={42} strokeWidth={1.5} />
            </div>

            <div className="mt-8 text-lg md:text-xl whitespace-pre-wrap leading-relaxed overflow-hidden">
              {config.message || "Your message will appear here..."}
            </div>

            <div className="text-right mt-6 opacity-60 italic font-medium">
              — Forever Yours
            </div>
          </motion.div>
        ) : (
          // --- VIEW 2 & 3: The Envelope System ---
          <motion.div
            key="envelope-system"
            initial={{ opacity: 0, scale: 0.7, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, transition: { delay: 0.8 } }}
            className="relative w-[400px] h-[280px]"
          >
            {/* Envelope Back Base */}
            <div
              className="absolute inset-0 rounded-xl shadow-2xl z-0"
              style={{ backgroundColor: config.envelopeColor, filter: 'brightness(0.9)' }}
            />

            {/* THE LETTER (Inside/Sliding Out) */}
            <motion.div
              animate={stage === 'opening' ? { y: -280, scale: 1, opacity: 1, zIndex: 5 } : { y: 0, scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`absolute inset-x-4 top-4 shadow-2xl ${getLetterBaseClass()}`}
              style={{ ...getCustomStyles(), zIndex: stage === 'opening' ? 25 : 5 }}
            >
               <div className="text-sm opacity-40 mb-4 tracking-tighter uppercase font-black">Private Note</div>
               <div className="text-base line-clamp-6">{config.message}</div>
            </motion.div>

            {/* Envelope Front Flaps (Static Body) */}
            <div
              className="absolute inset-0 z-10"
              style={{
                clipPath: 'polygon(0% 0%, 50% 50%, 100% 0%, 100% 100%, 0% 100%)',
                backgroundColor: config.envelopeColor
              }}
            />

            {/* Top Flap (Animated) */}
            <motion.div
              animate={stage === 'opening' ? { rotateX: 160, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 origin-top z-20"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 50%)',
                backgroundColor: config.envelopeColor,
                filter: 'brightness(0.97)',
                borderTop: '1px solid rgba(0,0,0,0.05)'
              }}
            />

            {/* The Wax Seal Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleOpen}
              animate={stage === 'opening' ? { opacity: 0, scale: 0 } : { opacity: 1 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-20 h-20 rounded-full shadow-xl flex items-center justify-center cursor-pointer border-4 border-white/20"
              style={{ backgroundColor: config.flowerColor }}
            >
              <SelectedFlower size={40} color="white" strokeWidth={1.5} />
            </motion.button>

            {/* Instruction Tag */}
            <div className="absolute -bottom-12 left-0 w-full text-center">
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFB3C6] animate-pulse">
                 {stage === 'opening' ? 'Opening...' : 'Click seal to reveal'}
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LetterAction;