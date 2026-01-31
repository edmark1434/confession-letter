// src/components/letter-action.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flower, Flower2, Sprout, Sun, Leaf, Trees,
  Heart, Star, Moon, Crown, Gem, Shell,
  Snowflake, PawPrint
} from 'lucide-react';
import RenderLetter from '../render/RenderLetter';

const SEAL_ICONS = {
  rose: Flower, tulip: Flower2, sunflower: Sun, blossom: Sprout,
  petal: Leaf, garden: Trees, heart: Heart, star: Star,
  moon: Moon, crown: Crown, gem: Gem, shell: Shell,
  snowflake: Snowflake, paw: PawPrint
};

const LetterAction = ({ config, isEnveloped, onOpenComplete }) => {
  const [stage, setStage] = useState('letter');
  const SelectedSeal = SEAL_ICONS[config.seal] || Heart;

  useEffect(() => {
    if (isEnveloped) setStage('sealed');
    else setStage('letter');
  }, [isEnveloped]);

  const handleOpen = () => {
    setStage('opening');
    setTimeout(() => {
      onOpenComplete();
      setStage('letter');
    }, 1250);
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-[850px] perspective-1000">
      <AnimatePresence mode="wait">
        {stage === 'letter' ? (
          <motion.div
            key="standalone"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="flex justify-center"
          >
            <RenderLetter config={config} />
          </motion.div>
        ) : (
          <motion.div
            key="envelope-system"
            initial={{ opacity: 0, scale: 0.7, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, transition: { delay: 0.8 } }}
            className="relative w-[450px] h-[320px]"
          >
            <div
              className="absolute inset-0 rounded-2xl shadow-2xl z-0 transition-colors duration-500"
              style={{ backgroundColor: config.envelopeColor, filter: 'brightness(0.9)' }}
            />

            {/* Letter slides out of envelope */}
            <motion.div
              initial={{ y: 0, scale: 0.9, opacity: 0 }}
              animate={stage === 'opening' ? { y: -450, scale: 1, opacity: 1 } : { y: 0, opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-4 top-4 z-5 flex justify-center"
            >
               <RenderLetter config={config} />
            </motion.div>

            <div
              className="absolute inset-0 z-10 transition-colors duration-500"
              style={{
                clipPath: 'polygon(0% 0%, 50% 50%, 100% 0%, 100% 100%, 0% 100%)',
                backgroundColor: config.envelopeColor,
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.1)'
              }}
            />

            <motion.div
              initial={{ rotateX: 0 }}
              animate={stage === 'opening' ? { rotateX: 160, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 origin-top z-20"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 50%)',
                backgroundColor: config.envelopeColor,
                filter: 'brightness(0.97)',
                borderTop: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <div className="w-full h-full bg-black/5" />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleOpen}
              animate={stage === 'opening' ? { opacity: 0, scale: 0, rotate: 20 } : { opacity: 1, scale: 1 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-20 h-20 rounded-full shadow-2xl flex items-center justify-center border-4 border-white/30 transition-colors duration-500"
              style={{ backgroundColor: config.sealColor }}
            >
              <SelectedSeal size={42} strokeWidth={1.5} style={{ color: config.sealIconColor }} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LetterAction;