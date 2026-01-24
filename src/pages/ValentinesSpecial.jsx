import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlowerBouquet from '../components/FlowerBouquets';
import tuladmo from '../assets/tuladmo.mp3';
import { 
  LucideHeart, LucideSparkles, LucideCalendar, 
  LucideUtensils, LucideMapPin,
  LucideArrowRight, LucideInfinity, LucideChevronLeft, LucideChevronRight,
  LucideQuote, LucideArrowDownCircle, LucideMusic, LucideVolume2, LucideLock, LucideUnlock
} from 'lucide-react';

// --- CONFIGURATION ---
const CORRECT_PASSCODE = "2023"; 
const ANNIVERSARY_DATE = "2023-05-20"; 
const SONG_TITLE = "Tulad Mo";
const AUDIO_URL = tuladmo;

const ValentineOverlay = () => {
  const [elements, setElements] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setElements((prev) => [
        ...prev.slice(-15),
        { id: Date.now(), left: Math.random() * 100 + "%", size: Math.random() * 20 + 10, duration: Math.random() * 7 + 5, type: Math.random() > 0.5 ? 'heart' : 'sparkle' }
      ]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {elements.map((el) => (
          <motion.div key={el.id} initial={{ y: "110vh", opacity: 0 }} animate={{ y: "-10vh", opacity: [0, 0.4, 0] }} transition={{ duration: el.duration }} className="absolute text-rose-300/40" style={{ left: el.left }}>
            {el.type === 'heart' ? <LucideHeart size={el.size} fill="currentColor" /> : <LucideSparkles size={el.size} />}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const ValentinesSpecial = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const memories = [
    { img: "https://images.unsplash.com/photo-1516589174184-c68d8e5f247d?q=80&w=800", note: "The day my world changed." },
    { img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=800", note: "Coffee, laughs, and you." },
    { img: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?q=80&w=800", note: "Forever chasing sunsets together." }
  ];

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passcode === CORRECT_PASSCODE) {
      setIsUnlocked(true);
      setError(false);
      if(!isPlaying) toggleMusic();
    } else {
      setError(true);
      setPasscode("");
      setTimeout(() => setError(false), 500);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const calculateDays = () => {
    const start = new Date(ANNIVERSARY_DATE);
    const now = new Date();
    return Math.floor((now - start) / (1000 * 60 * 60 * 24));
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FFF0F3] h-screen overflow-y-scroll hide-scrollbar scroll-smooth relative selection:bg-rose-500 selection:text-white">
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      
      <ValentineOverlay />
      <audio ref={audioRef} src={AUDIO_URL} loop />

      {/* --- MUSIC PLAYER --- */}
      {isUnlocked && (
        <div className="fixed top-6 right-6 z-50">
          <motion.button whileTap={{ scale: 0.9 }} onClick={toggleMusic} className="bg-white/80 backdrop-blur-md p-4 rounded-full shadow-lg text-rose-500 flex items-center gap-3 border border-rose-100">
            {isPlaying ? <LucideVolume2 size={20} className="animate-pulse" /> : <LucideMusic size={20} />}
          </motion.button>
        </div>
      )}

      {/* --- SECTION 1: LANDING (Static per request) --- */}
      {!isStarted && (
        <section className="h-screen flex items-center justify-center p-6 text-center">
          <div className="z-10 max-w-3xl">
            <LucideHeart className="mx-auto text-rose-500 mb-8 animate-pulse" size={48} fill="#f43f5e" />
            <h1 className="text-4xl md:text-7xl font-serif italic text-rose-900 leading-tight mb-6">"In all the world, there is no heart for me like yours."</h1>
            <p className="text-rose-400 tracking-[0.4em] uppercase text-xs mb-12">— Maya Angelou</p>
            <button onClick={() => setIsStarted(true)} className="group flex items-center gap-4 mx-auto text-rose-600 font-bold tracking-widest border-b-2 border-rose-300 pb-2">
              OUR JOURNEY STARTS HERE <LucideArrowRight className="group-hover:translate-x-2 transition-transform"/>
            </button>
          </div>
        </section>
      )}

      {/* --- PASSCODE LOCK SCREEN --- */}
      {isStarted && !isUnlocked && (
        <section className="h-screen flex items-center justify-center p-6 z-[100] relative">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className={`bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl text-center max-w-sm w-full border border-rose-100 ${error ? 'animate-shake' : ''}`}
          >
            <style>{`
              @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
              .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
            `}</style>
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-500">
              <LucideLock size={30} />
            </div>
            <h2 className="text-2xl font-serif text-rose-900 mb-2">Our Secret Code</h2>
            <p className="text-gray-500 text-sm mb-8 italic">Enter the year we first met</p>
            <form onSubmit={handleUnlock}>
              <input 
                type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)}
                placeholder="Hint: YYYY" maxLength={4}
                className="w-full text-center text-2xl tracking-[0.5em] py-3 border-b-2 border-rose-200 focus:border-rose-500 outline-none mb-8 text-rose-900 font-bold bg-transparent"
              />
              <button type="submit" className="w-full bg-rose-500 text-white py-4 rounded-full font-bold shadow-lg hover:bg-rose-600 flex items-center justify-center gap-2 transition-all">
                UNLOCK <LucideUnlock size={18} />
              </button>
            </form>
          </motion.div>
        </section>
      )}

      {/* --- MAIN CONTENT (Animated Sections) --- */}
      {isUnlocked && (
        <div className="overflow-x-hidden">
          {/* Hero Header */}
          <motion.section 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="h-screen flex flex-col items-center justify-center text-center p-6"
          >
            <h2 className="text-5xl md:text-8xl font-serif italic text-rose-900 mb-4 leading-tight">Happy Valentine's Day</h2>
            <div className="bg-rose-100 text-rose-600 px-8 py-3 rounded-full font-bold text-lg inline-flex items-center gap-2 shadow-sm border border-rose-200 mb-12">
              <LucideInfinity size={22}/> {calculateDays()} Days & counting...
            </div>
            <button onClick={() => scrollToSection('carousel')} className="flex flex-col items-center gap-2 text-rose-400 font-bold text-xs tracking-widest animate-bounce">
              SEE OUR MEMORIES <LucideArrowDownCircle />
            </button>
          </motion.section>

          {/* Carousel Section */}
          <motion.section 
            id="carousel" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="min-h-screen flex flex-col items-center justify-center py-20 px-4 bg-white/30"
          >
            <h2 className="text-3xl font-serif text-rose-900 mb-12 text-center underline decoration-rose-200 underline-offset-8">Captured Moments</h2>
            <div className="relative w-full max-w-sm md:max-w-lg">
              <AnimatePresence mode="wait">
                <motion.div key={currentPhoto} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white p-4 pb-12 shadow-2xl rounded-sm">
                  <img src={memories[currentPhoto].img} className="w-full h-64 md:h-80 object-cover" alt="Memory" />
                  <p className="mt-6 text-center font-serif text-xl text-rose-800 italic">{memories[currentPhoto].note}</p>
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-center gap-8 mt-10">
                <button onClick={() => setCurrentPhoto((prev) => (prev - 1 + memories.length) % memories.length)} className="p-3 bg-white rounded-full shadow-md text-rose-500 hover:scale-110 transition-transform"><LucideChevronLeft /></button>
                <button onClick={() => setCurrentPhoto((prev) => (prev + 1) % memories.length)} className="p-3 bg-white rounded-full shadow-md text-rose-500 hover:scale-110 transition-transform"><LucideChevronRight /></button>
              </div>
            </div>
            <button onClick={() => scrollToSection('letter')} className="mt-16 text-rose-400 font-bold text-xs flex flex-col items-center gap-2 tracking-[0.2em]">
              READ MY LETTER <LucideArrowDownCircle className="animate-bounce" />
            </button>
          </motion.section>

          {/* Letter Section */}
          <motion.section 
            id="letter" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="min-h-screen py-24 flex items-center justify-center px-6"
          >
            <div className="max-w-2xl w-full bg-white p-8 md:p-16 shadow-xl rounded-lg border-t-8 border-rose-400 relative">
              <LucideQuote className="absolute -top-4 left-8 text-rose-100" size={60} />
              <div className="font-serif text-rose-900 text-lg md:text-xl leading-relaxed italic space-y-6">
                <p>My Dearest,</p>
                <p>Entering that code reminded me of how long we've been building this beautiful world together. Every day since has been an adventure I wouldn't trade for anything.</p>
                <p>You make every ordinary moment feel extraordinary. Happy Valentine's Day, my love.</p>
                <p className="text-right mt-10">— Yours Forever</p>
              </div>
              <button onClick={() => scrollToSection('invitation')} className="w-full mt-12 py-4 border-2 border-rose-100 text-rose-500 font-bold rounded-full text-xs uppercase tracking-widest hover:bg-rose-50 transition-colors">
                I have a question for you...
              </button>
            </div>
          </motion.section>

          {/* Invitation Section */}
          <motion.section 
            id="invitation" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="min-h-screen py-20 px-6 flex items-center justify-center"
          >
            <div className="bg-white p-8 md:p-12 lg:p-16 rounded-[3rem] shadow-2xl border border-rose-50 max-w-6xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
              
              {/* Text Side */}
              <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1 flex flex-col justify-center">
                <h2 className="text-4xl md:text-6xl font-serif text-rose-900 mb-6 leading-tight">So, Be My Valentine?</h2>
                <div className="space-y-4 mb-10 mx-auto lg:mx-0 max-w-sm">
                  <div className="flex items-center gap-4 bg-rose-50 p-4 rounded-2xl shadow-sm">
                    <LucideUtensils className="text-rose-500 shrink-0" /> 
                    <span className="font-bold text-rose-900 text-sm md:text-lg">Romantic Dinner for Two</span>
                  </div>
                  <div className="flex items-center gap-4 bg-rose-50 p-4 rounded-2xl shadow-sm">
                    <LucideCalendar className="text-rose-500 shrink-0" /> 
                    <span className="font-bold text-rose-900 text-sm md:text-lg">Feb 14, 2026 • Sunset</span>
                  </div>
                  <div className="flex items-center gap-4 bg-rose-50 p-4 rounded-2xl shadow-sm">
                    <LucideMapPin className="text-rose-500 shrink-0" /> 
                    <span className="font-bold text-rose-900 text-sm md:text-lg">Our Special Spot</span>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="w-full lg:w-max bg-rose-500 text-white px-16 py-6 rounded-full font-bold text-xl shadow-xl shadow-rose-200 hover:bg-rose-600 transition-colors mx-auto lg:mx-0"
                >
                  YES! ❤️
                </motion.button>
              </div>

              {/* Flower Side (Fixed Scaling & Alignment) */}
              <div className="w-full lg:w-1/2 flex justify-center items-center order-1 lg:order-2 overflow-visible">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="relative flex justify-center items-center w-full min-h-[300px] md:min-h-[450px]"
                >
                  <div className="w-full h-full flex justify-center items-center">
                    <FlowerBouquet />
                  </div>
                </motion.div>
              </div>

            </div>
          </motion.section>
        </div>
      )}

      <footer className="pb-10 text-center text-rose-300 text-xs tracking-[0.3em] uppercase italic font-medium">Always Yours • 2026</footer>
    </div>
  );
};

export default ValentinesSpecial;