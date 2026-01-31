import React from 'react';
import { motion } from 'framer-motion';
import { LucideHeart, LucideSend, LucideArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Assuming you use react-router

const CreateWebsite = () => {
  const navigate = useNavigate();

  const cards = [
    {
      id: 'confession',
      title: 'Confession',
      subtitle: 'Tell them what is hidden in your heart.',
      icon: <LucideSend className="text-rose-400" size={32} />,
      bgColor: 'bg-white',
      textColor: 'text-rose-900',
      buttonStyle: 'bg-rose-100 text-rose-600',
      path: '/create-confession'
    },
    {
      id: 'valentine',
      title: 'Valentine',
      subtitle: 'Celebrate the love you already share.',
      icon: <LucideHeart className="text-white" size={32} fill="white" />,
      bgColor: 'bg-rose-500',
      textColor: 'text-white',
      buttonStyle: 'bg-white text-rose-600',
      path: '/create-valentines'
    }
  ];

  return (
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-[#FFF0F3]">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
        <h1 className="text-[20vw] font-serif italic font-bold text-rose-300 select-none">Love</h1>
      </div>

      {cards.map((card) => (
        <motion.div
          key={card.id}
          whileHover={{ flex: 1.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`relative flex-1 flex flex-col items-center justify-center p-8 transition-all duration-500 ${card.bgColor}`}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-10 text-center max-w-xs"
          >
            <div className="mb-6 flex justify-center">
              <motion.div 
                whileHover={{ scale: 1.2, rotate: -10 }}
                className={`p-5 rounded-3xl shadow-xl ${card.id === 'valentine' ? 'bg-rose-400' : 'bg-rose-50'}`}
              >
                {card.icon}
              </motion.div>
            </div>

            <h2 className={`text-4xl md:text-5xl font-serif font-bold mb-4 ${card.textColor}`}>
              {card.title}
            </h2>
            
            <p className={`mb-10 text-sm md:text-base opacity-80 leading-relaxed ${card.textColor}`}>
              {card.subtitle}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(card.path)}
              className={`group flex items-center gap-3 px-8 py-4 rounded-full font-bold tracking-widest text-xs uppercase shadow-lg transition-all ${card.buttonStyle}`}
            >
              Start Experience
              <LucideArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Decorative Corner for each side */}
          <div className={`absolute bottom-10 opacity-20 text-8xl font-serif italic ${card.textColor}`}>
            {card.id === 'confession' ? '01' : '02'}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CreateWebsite;