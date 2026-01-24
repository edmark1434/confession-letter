import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlowerBouquet from '../components/FlowerBouquets';
import tuladmo from '../assets/tuladmo.mp3';
import { 
  LucideHeart, LucideSparkles, LucideCalendar, 
  LucideStars, LucideQuote, LucideCoffee, 
  LucideBookOpen, LucideArrowDownCircle, LucideMail, LucideMapPin,
  LucideMusic, LucideVolume2
} from 'lucide-react';

// --- CONFIGURATION (Change these to update the website) ---
const AUDIO_URL = tuladmo;
const SONG_TITLE = "Tulad Mo";

const CONFIG = {
  // Section 2: Little Things
  imageSection2: "https://images.unsplash.com/photo-1516589174184-c68d8e5f247d?auto=format&fit=crop&q=80",
  littleThings: [
    { title: "Your Smile", icon: <LucideSparkles />, desc: "The way it lights up your whole face every single time." },
    { title: "Your Kindness", icon: <LucideHeart />, desc: "How you treat the world with such a gentle heart." },
    { title: "Your Mind", icon: <LucideStars />, desc: "The way you think and the stories you share with me." }
  ],
  // Section 3: The Letter
  letterBody: `I’ve sat down to write this a dozen times, but words always seem to fall short when it comes to you.
                <br /><br />
                There's a specific kind of peace I find whenever we're together—a feeling that I'm exactly where I'm supposed to be. It’s in the quiet moments just as much as the loud ones.
                <br /><br />
                You've seen the best and worst of me, and you've stayed. I'm not just falling for you; I've already arrived.`,
  // Section 4: Invitation
  invitationDate: "Saturday, Feb 14th",
  invitationLocation: "The Cozy Corner Cafe & Garden",
  footerText: "Designed with Love • 2026"
};

// --- FALLING HEARTS EFFECT ---
const FallingHearts = () => {
  const [hearts, setHearts] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-15),
        { id: Date.now(), left: Math.random() * 100 + "%", size: Math.random() * 20 + 10, duration: Math.random() * 5 + 5 }
      ]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: heart.duration, ease: "linear" }}
            className="absolute text-rose-200/40"
            style={{ left: heart.left }}
          >
            <LucideHeart size={heart.size} fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const ConfessionStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMusic = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isOpen && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [isOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="bg-[#FFF5F7] h-screen overflow-y-scroll hide-scrollbar scroll-smooth relative selection:bg-rose-200 selection:text-rose-900">
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .glass-nav { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); }
        .letter-paper { 
          background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
          background-color: #fdfdfb;
        }
        .clip-path-envelope { clip-path: polygon(0 0, 50% 50%, 100% 0); }
      `}</style>

      <FallingHearts />
      <audio ref={audioRef} src={AUDIO_URL} loop />

      {/* --- MUSIC PLAYER --- */}
      {isOpen && (
        <div className="fixed top-6 right-6 z-50">
          <motion.button 
            whileTap={{ scale: 0.9 }} 
            onClick={toggleMusic} 
            className="bg-white/80 backdrop-blur-md p-4 rounded-full shadow-lg text-rose-500 flex items-center gap-3 border border-rose-100 hover:bg-white transition-all"
          >
            {isPlaying ? 
              <LucideVolume2 size={20} className="animate-pulse" /> : 
              <LucideMusic size={20} />
            }
          </motion.button>
        </div>
      )}

      {/* --- SECTION 1: THE ENVELOPE LANDING --- */}
      <section id="start" className="h-screen flex items-center justify-center relative p-6 overflow-hidden">
        {!isOpen ? (
          <div className="z-20 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-12"
            >
               <h1 className="text-4xl md:text-6xl font-serif text-rose-900 mb-4 italic">For Someone Special</h1>
               <p className="text-rose-400 tracking-[0.3em] uppercase text-[10px] font-bold">A private message is waiting</p>
            </motion.div>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsOpen(true)}
              className="cursor-pointer flex flex-col items-center group"
            >
              <div className="relative w-64 h-48 md:w-80 md:h-56 bg-rose-200 rounded-xl shadow-2xl flex items-center justify-center border-b-4 border-rose-300">
                <div className="absolute top-0 left-0 w-full h-full border-t-[100px] border-t-rose-100 clip-path-envelope"></div>
                <LucideMail size={60} className="text-rose-400 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute -bottom-4 bg-white px-6 py-2 rounded-full shadow-md border border-rose-100">
                  <span className="text-rose-500 font-bold text-xs tracking-widest uppercase">Open the letter</span>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center z-10 glass-nav p-12 rounded-[3rem] border border-white shadow-2xl max-w-lg relative"
          >
            <motion.div variants={itemVariants}>
              <LucideHeart className="text-rose-500 w-12 h-12 mx-auto mb-6 animate-pulse" fill="#FB7185" />
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl font-serif italic text-rose-900 mb-4">Hello, You.</motion.h1>
            <motion.p variants={itemVariants} className="text-rose-400 font-medium tracking-widest uppercase text-xs mb-8 italic leading-loose">
              A digital scrapbook of <br/> everything I haven't said yet.
            </motion.p>
            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('likes')}
              className="px-8 py-4 bg-rose-500 text-white rounded-full text-xs font-bold shadow-lg hover:bg-rose-600 transition-all flex items-center gap-3 mx-auto"
            >
              OPEN CHAPTER 1 <LucideBookOpen size={16} />
            </motion.button>
          </motion.div>
        )}
      </section>

      <div className={isOpen ? '' : 'hidden'}>
        {/* --- SECTION 2: THE LITTLE THINGS (Dynamic Content) --- */}
        <section id="likes" className="min-h-screen py-24 px-6 flex flex-col justify-center items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="max-w-6xl mx-auto w-full z-10"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
                <h2 className="text-4xl font-serif text-rose-900 mb-2">Things that make me smile...</h2>
                <div className="h-1 w-20 bg-rose-300 mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                <motion.div variants={itemVariants} className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[400px] border-4 border-white">
                    <img src={CONFIG.imageSection2} className="w-full h-full object-cover" alt="Memory" />
                </motion.div>

                <div className="space-y-6">
                    {CONFIG.littleThings.map((item, idx) => (
                    <motion.div key={idx} variants={itemVariants} className="flex gap-4 items-start p-5 rounded-3xl glass-nav border border-white/50 shadow-sm">
                        <div className="bg-rose-100 p-3 rounded-2xl text-rose-500">{item.icon}</div>
                        <div>
                          <h4 className="font-bold text-rose-900">{item.title}</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                        </div>
                    </motion.div>
                    ))}
                </div>
            </div>

            <motion.button 
                variants={itemVariants}
                onClick={() => scrollToSection('letter')}
                className="mx-auto flex flex-col items-center gap-2 group text-rose-400 hover:text-rose-600 transition-colors"
            >
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Read my letter</span>
                <LucideArrowDownCircle size={32} className="group-hover:translate-y-1 transition-transform" />
            </motion.button>
          </motion.div>
        </section>

        {/* --- SECTION 3: THE LONG CONFESSION (Dynamic Text) --- */}
        <section id="letter" className="min-h-screen py-24 flex items-center justify-center px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={containerVariants}
              className="max-w-4xl w-full p-8 md:p-20 rounded-[3rem] shadow-2xl relative border border-rose-100 letter-paper flex flex-col items-center"
            >
              <motion.div variants={itemVariants} className="relative z-10 font-serif text-lg md:text-2xl leading-[2] text-rose-950 italic text-center max-w-2xl mx-auto">
                  <LucideQuote className="text-rose-100 w-16 h-16 mx-auto mb-8 opacity-50" />
                  <div dangerouslySetInnerHTML={{ __html: CONFIG.letterBody }} />
              </motion.div>
              
              <motion.button 
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => scrollToSection('date')}
                  className="mt-12 px-10 py-4 border-2 border-rose-200 text-rose-500 rounded-full font-bold text-sm hover:bg-rose-50 transition-all flex items-center gap-3"
              >
                  I HAVE ONE FINAL QUESTION <LucideHeart size={16} fill="currentColor" />
              </motion.button>
            </motion.div>
        </section>

        {/* --- SECTION 4: THE INVITATION (Dynamic Date/Location) --- */}
        <section id="date" className="min-h-screen py-32 px-6 flex items-center justify-center relative overflow-hidden">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className='flex flex-col lg:flex-row justify-between items-center w-full max-w-5xl gap-16 z-10'
            >
                <div className="max-w-xl text-center lg:text-left">
                  <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-serif text-rose-900 mb-8 leading-tight">So, what do you say?</motion.h2>
                  
                  <motion.div variants={itemVariants} className="flex flex-col gap-4 mb-10">
                      <div className="flex items-center gap-4 bg-white px-8 py-5 rounded-2xl shadow-sm border border-rose-100">
                          <LucideCalendar className="text-rose-500" size={24} />
                          <span className="font-bold text-black text-lg">{CONFIG.invitationDate}</span>
                      </div>
                      <div className="flex items-center gap-4 bg-white px-8 py-5 rounded-2xl shadow-sm border border-rose-100">
                          <LucideMapPin className="text-rose-500" size={24} />
                          <span className="font-bold text-black text-lg">{CONFIG.invitationLocation}</span>
                      </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
                      <motion.button 
                        whileHover={{ scale: 1.1, backgroundColor: '#e11d48' }}
                        whileTap={{ scale: 0.9 }}
                        className="px-16 py-6 bg-rose-500 text-white rounded-full font-bold shadow-xl text-xl"
                      >
                        YES! ❤️
                      </motion.button>
                      <button className="text-rose-400 font-semibold italic underline underline-offset-4">
                        Let's talk more...
                      </button>
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} className="relative w-full max-w-sm flex justify-center">
                  <FlowerBouquet />
                </motion.div>
            </motion.div>
        </section>
      </div>             
      
      <footer className="pb-10 text-center text-rose-300 text-xs tracking-[0.4em] uppercase">
        {CONFIG.footerText}
      </footer>
    </div>
  );
};

export default ConfessionStory;