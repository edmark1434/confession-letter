import React from 'react';
import { motion } from 'framer-motion';
import { LucideArrowLeft, LucideHome, LucideHeart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const scrollbarHideStyles = `
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `;

  return (
    <div className="min-h-screen bg-[#FFF9FA] text-rose-950 font-serif no-scrollbar overflow-x-hidden selection:bg-rose-100 flex items-center justify-center">
      <style dangerouslySetInnerHTML={{ __html: scrollbarHideStyles }} />
      
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none opacity-30 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-200 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-100 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Sad Heart Animation */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mb-8"
        >
          <div className="flex justify-center items-center gap-4">
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <LucideHeart size={80} className="text-rose-300" fill="currentColor" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <span className="text-6xl">😢</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Error Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-8xl md:text-9xl font-bold text-rose-200 mb-4 italic">404</h1>
          
          {/* Main Message */}
          <h2 className="text-4xl md:text-5xl font-bold text-rose-900 mb-4 italic">
            Oh No! 💔
          </h2>
          
          <p className="text-lg md:text-xl text-rose-700 mb-6 italic leading-relaxed">
            It seems like this confession got lost in the mail...
          </p>
          
          {/* Cute Sub-message */}
          <p className="text-sm md:text-base text-rose-500 mb-12 font-semibold">
            The page you're looking for doesn't exist or has been removed. 
            <br />
            Don't worry, let's get you back to spreading love! 💌
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-rose-500 text-rose-500 hover:bg-rose-50 rounded-full font-bold text-lg transition-all shadow-lg shadow-rose-100"
            >
              <LucideHome size={20} />
              Back Home
            </motion.button>
          </div>
        </motion.div>

        {/* Floating Hearts Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -300],
                x: [0, Math.sin(i) * 100],
                opacity: [1, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="absolute text-rose-200"
              style={{
                left: `${20 + i * 15}%`,
                bottom: '-10px',
              }}
            >
              💕
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-center w-full">
        <p className="text-rose-300 text-[10px] uppercase tracking-[0.5em] font-black">
          LuvNote • Handcrafted 2026
        </p>
      </div>
    </div>
  );
};

export default NotFound;