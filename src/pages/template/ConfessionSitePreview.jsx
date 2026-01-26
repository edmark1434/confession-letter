import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlowerBouquet from '../../components/FlowerBouquets';
import tuladmo from '../../assets/tuladmo.mp3';
import { 
  LucideHeart, LucideSparkles, LucideCalendar, 
  LucideStars, LucideQuote, LucideCoffee, 
  LucideBookOpen, LucideArrowDownCircle, LucideMail, LucideMapPin,
  LucideMusic, LucideVolume2, LucideArrowLeft,LucideUtensils
} from 'lucide-react';
import {getConfessionByCode, saveConfessionByCode} from '../../repositiories/ConfessionsRepositories';
import { useNavigate, useParams } from 'react-router-dom';
const defaultData = {
    title: "For Someone Special",
    recipientName: "You",
    songUrl: "",
    imageSection2: "https://scontent.fceb9-1.fna.fbcdn.net/v/t39.30808-6/474781465_533939329671558_5891960454890417856_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEM2_W0yeeVRGhv_y6mBMVthER5qF5Q4auERHmoXlDhqwgORFZAysaEt-62ucIFPr_sFfC3uP2di_0wB94W65G1&_nc_ohc=Nu-BwR0t0zYQ7kNvwGMSjsC&_nc_oc=AdkEObgy8aSuIDRJeIBqRWeMXIk7Q3Bk5fl8BKmJICTDYk5xHHJaWIvKOo07xGGReHI&_nc_zt=23&_nc_ht=scontent.fceb9-1.fna&_nc_gid=IQOcqrQXK_rzNcK0AC-4BQ&oh=00_Afr7ylCXgGOGNZ3ZA3JCpy-I78c3Big8HDIHcMlYPBc39w&oe=697B1BA5",
    littleThings: [
      {
        title: "Your Smile",
        desc: "The way you light up a room without even trying. It's contagious and makes everything better."
      },
      {
        title: "Your Laugh",
        desc: "It's the most genuine sound I've ever heard. I could listen to it all day and never get tired."
      },
      {
        title: "Your Kindness",
        desc: "You have the most beautiful heart. The way you care for others inspires me every single day."
      }
    ],
    letterBody: "From the moment we met, something changed. I find myself thinking about you more than I ever thought possible. Your presence makes ordinary moments feel extraordinary. I love how we can talk for hours about anything and everything. I love your quirks, your dreams, and the way you see the world. You've become my favorite person, and I can't imagine my days without you in them. So here I am, taking a chance, hoping you feel even a fraction of what I feel for you.",
    invitationDate: "Any day that feels right to you.",
    invitationLocation: "Casual Date",
    footerText: "Designed with Love • 2026"
  };
// --- CONFIGURATION (Change these to update the website) ---
const AUDIO_URL = tuladmo;
const SONG_TITLE = "Tulad Mo";

// Helper to convert Spotify links to embed URLs
const getSpotifyEmbedUrl = (url) => {
  if (!url) return null;
  
  // Check if it's a Spotify link
  const spotifyMatch = url.match(/spotify\.com\/(track|playlist|album)\/([a-zA-Z0-9]+)/);
  if (spotifyMatch) {
    const [, type, id] = spotifyMatch;
    return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&autoplay=1`;
  }
  return null;
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

const ConfessionStory = ({ externalConfig }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [sectionStep, setSectionStep] = useState(0); // 0=closed,1=likes,2=letter,3=invite
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const spotifyRef = useRef(null);
  const [data, setData] = useState(defaultData);
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [surpriseMessage, setSurpriseMessage] = useState("");
  const [isResponded, setIsResponded] = useState(false);

  useEffect(() => {
    const getContent = async () => {
      if (!externalConfig) {
        if (id) {
          if(sessionStorage.getItem('confession'+id)) {
            setData(JSON.parse(sessionStorage.getItem('confession'+id)));
            return;
          }
          const result = await getConfessionByCode(id);
          if (result) {
            sessionStorage.setItem('confession'+id, JSON.stringify(result));
            setData(result);
          } else { 
            console.warn("No confession found for the provided code.");
            setData(defaultData);
          }
        } else {
          setData(defaultData);
        }
      } else {
        setData(externalConfig ?? defaultData);
      }
    }
    getContent();
  },[externalConfig, id]);

  const recipientName = (externalConfig?.recipientName ?? data.recipientName ?? "You").trim() || "You";
  const romanceNote = externalConfig?.romanceNote ?? "I never believed ordinary days could feel this magical until you walked into them. Every detail here is a page in the story I want to keep writing with you.";

  const audioSource = data.songUrl || AUDIO_URL;
  const spotifyEmbedUrl = getSpotifyEmbedUrl(data.songUrl);
  const isSpotify = !!spotifyEmbedUrl;

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  
  const toggleMusic = () => {
    if (isSpotify) {
      // For Spotify, we can't control playback via iframe
      // Just toggle the visibility state
      setIsPlaying(!isPlaying);
    } else {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (isOpen && !isPlaying && !isSpotify) {
      audioRef.current.play();
      setIsPlaying(true);
    }
    // Spotify embed autoplays by default
    if (isOpen && isSpotify) {
      setIsPlaying(true);
    }
  }, [isOpen, isSpotify]);

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

  const resetWebsite = () => {
    setIsOpen(false);
    setSectionStep(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }
  const handleYesClick = async() => {
    setIsLoading(true);
    if (id) {
      saveConfessionByCode(id, { answer: "yes" }).then(() => {
        sessionStorage.removeItem('confession'+id);
        responseModal("yes");
      });
      return;
    }
    responseModal("yes");
  };

  const handleTalkMoreClick = () => {
    setIsLoading(true);
    if (id) {
      saveConfessionByCode(id, { answer: "talkmore" }).then(() => {
        sessionStorage.removeItem('confession'+id);
        responseModal("talkmore");
      });
      return;
    }
    responseModal("talkmore");
  };

  const responseModal = (response) => {
      setIsLoading(false);
      setSurpriseMessage(response);
      setShowSurpriseModal(true);
      setIsResponded(true);
  }
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

      <div hidden={!isOpen} className="sticky top-0 z-30 flex justify-start px-6 pt-4">
        <button
          onClick={() => resetWebsite()}
          className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-rose-100 px-4 py-2 text-sm font-semibold text-rose-600 shadow-sm backdrop-blur hover:bg-white"
        >
          <LucideArrowLeft size={16} />
          Close Letter
        </button>
      </div>

      <FallingHearts />
      
      {/* Conditional: Use Spotify embed if Spotify link, otherwise regular audio */}
      {isSpotify && isOpen ? (
        <iframe
          ref={spotifyRef}
          src={spotifyEmbedUrl}
          className="fixed -bottom-20 left-0 opacity-0 pointer-events-none"
          width="300"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      ) : (
        <audio ref={audioRef} src={audioSource} loop />
      )}

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
               <h1 className="text-4xl md:text-6xl font-serif text-rose-900 mb-4 italic">{data.title ?? defaultData.title}</h1>
               <p className="text-rose-400 tracking-[0.3em] uppercase text-[10px] font-bold">A private message is waiting</p>
            </motion.div>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setIsOpen(true);
                setSectionStep(1);
              }}
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
            <motion.h1 variants={itemVariants} className="text-5xl font-serif italic text-rose-900 mb-4">Hello, {recipientName}.</motion.h1>
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
        {sectionStep >= 1 && (
        <section id="likes" className="py-24 px-6 flex flex-col justify-center items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="max-w-6xl mx-auto w-full z-10"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
                <h2 className="text-4xl font-serif text-rose-900 mb-2">3 Things I like About You...</h2>
                <div className="h-1 w-20 bg-rose-300 mx-auto rounded-full" />
            </motion.div>

            {(data.littleThings ?? defaultData.littleThings).length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <motion.div variants={itemVariants} className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[400px] border-4 border-white">
                        {data.imageSection2 ? (
                          <img src={data.imageSection2} className="w-full h-full object-cover" alt="Memory" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-rose-100 to-rose-50 flex items-center justify-center">
                            <span className="text-rose-300 text-sm italic">Image will appear here</span>
                          </div>
                        )}
                    </motion.div>

                    <div className="space-y-6">
                        {(data.littleThings ?? defaultData.littleThings).map((item, idx) => {
                          const icons = [<LucideSparkles key="s" />, <LucideHeart key="h" />, <LucideStars key="st" />];
                          const icon = icons[idx % 3];
                          return (
                          <motion.div key={`item-${idx}`} variants={itemVariants} className="flex gap-4 items-start p-5 rounded-3xl glass-nav border border-white/50 shadow-sm">
                            <div className="bg-rose-100 p-3 rounded-2xl text-rose-500 shrink-0">
                              {icon}
                            </div>
                            <div>
                              <h4 className="font-bold text-rose-900">{item.title}</h4>
                              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                          </motion.div>
                          );
                        })}
                    </div>
                </div>

                <motion.button 
                    variants={itemVariants}
                    onClick={() => { setSectionStep((s) => Math.max(s, 2)); scrollToSection('letter'); }}
                    className="mx-auto flex flex-col items-center gap-2 group text-rose-400 hover:text-rose-600 transition-colors"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Read my letter</span>
                    <LucideArrowDownCircle size={32} className="group-hover:translate-y-1 transition-transform" />
                </motion.button>
              </>
            ) : null}
          </motion.div>
        </section>
        )}

        {/* --- SECTION 3: THE LONG CONFESSION (Dynamic Text) --- */}
        {sectionStep >= 2 && (
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
                  <p className="mb-6 text-base md:text-lg text-rose-700 normal-case leading-relaxed">{romanceNote}</p>
                  {data.letterBody ?? defaultData.letterBody}
              </motion.div>
              
              <motion.button 
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => { setSectionStep((s) => Math.max(s, 3)); scrollToSection('date'); }}
                  className="mt-12 px-10 py-4 border-2 border-rose-200 text-rose-500 rounded-full font-bold text-sm hover:bg-rose-50 transition-all flex items-center gap-3"
              >
                  I HAVE ONE FINAL QUESTION <LucideHeart size={16} fill="currentColor" />
              </motion.button>
            </motion.div>
        </section>
        )}

        {/* --- SECTION 4: THE INVITATION (Dynamic Date/Location) --- */}
        {sectionStep >= 3 && (
        <section id="date" className="min-h-screen py-32 px-6 flex items-center justify-center relative overflow-hidden">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className='flex flex-col lg:flex-row justify-between items-center w-full max-w-5xl gap-16 z-10'
            >
                <div className="max-w-xl text-center lg:text-left">
                  <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-serif text-rose-900 mb-8 leading-tight">So, can i invite you on a date?</motion.h2>
                  
                  <motion.div variants={itemVariants} className="flex flex-col gap-4 mb-10">
                      <div className="flex items-center gap-4 bg-white px-8 py-5 rounded-2xl shadow-sm border border-rose-100">
                          <LucideCalendar className="text-rose-500" size={24} />
                          <span className="font-bold text-black text-lg">{data.invitationDate || defaultData.invitationDate}</span>
                      </div>
                      <div className="flex items-center gap-4 bg-white px-8 py-5 rounded-2xl shadow-sm border border-rose-100">
                          <LucideUtensils className="text-rose-500" size={24} />
                          <span className="font-bold text-black text-lg">{data.invitationLocation || defaultData.invitationLocation}</span>
                      </div>
                  </motion.div>

                <AnimatePresence mode="wait">
                  {!isResponded && !data.answer ? (
                      <motion.div 
                        key="buttons"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center"
                      >
                        <motion.button 
                          whileHover={{ scale: 1.1, backgroundColor: '#e11d48' }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleYesClick}
                          disabled={isLoading}
                          className="px-16 py-6 bg-rose-500 text-white rounded-full font-bold shadow-xl text-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                        >
                          {isLoading ? (
                            <>
                              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span>Processing...</span>
                            </>
                          ) : (
                            "YES! ❤️"
                          )}
                        </motion.button>
                        <button 
                          onClick={handleTalkMoreClick}
                          disabled={isLoading}
                          className="text-rose-400 font-semibold italic underline underline-offset-4 hover:text-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? "Processing..." : "Let's talk more..."}
                        </button>
                    </motion.div>
                  ) : (
                      <motion.p 
                        key="responded"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="text-rose-600 italic font-medium text-lg"
                      >
                        ✓ You've already responded. Thank you for your answer! 💖
                      </motion.p> 
                  )}
                </AnimatePresence>
                </div>

                <motion.div variants={itemVariants} className="relative w-full max-w-sm flex justify-center">
                  <FlowerBouquet />
                </motion.div>
            </motion.div>
        </section>
        )}
      </div>             
      
      {/* Surprise Modal */}
      <AnimatePresence>
        {showSurpriseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSurpriseModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-gradient-to-br from-rose-50 to-white p-12 rounded-[3rem] shadow-2xl max-w-2xl w-full border-4 border-rose-200 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative hearts */}
              <div className="absolute top-4 right-4 text-rose-300 opacity-50">
                <LucideHeart size={40} fill="currentColor" />
              </div>
              <div className="absolute bottom-4 left-4 text-rose-300 opacity-50">
                <LucideHeart size={30} fill="currentColor" />
              </div>
              <div className="absolute top-1/2 left-4 text-rose-200 opacity-30">
                <LucideSparkles size={25} />
              </div>
              <div className="absolute top-1/4 right-8 text-rose-200 opacity-30">
                <LucideStars size={25} />
              </div>

              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mb-6"
                >
                  <LucideHeart className="w-20 h-20 mx-auto text-rose-500 animate-pulse" fill="#FB7185" />
                </motion.div>

                {surpriseMessage === "yes" ? (
                  <>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-5xl font-serif text-rose-900 mb-6 italic"
                    >
                      You just made my heart skip! 💕
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-lg text-rose-700 leading-relaxed mb-4"
                    >
                      I can't believe this is happening! Your "yes" means the world to me. 
                      I promise to make every moment together unforgettable. ✨
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="text-base text-rose-600 italic mb-8"
                    >
                      Get ready for the most romantic adventure of our lives! 🌹
                    </motion.p>
                  </>
                ) : (
                  <>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-5xl font-serif text-rose-900 mb-6 italic"
                    >
                      I'd love to talk more! 🌙
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-lg text-rose-700 leading-relaxed mb-4"
                    >
                      Every conversation with you feels like magic. I'm always here, 
                      ready to listen to your thoughts, dreams, and everything in between. 💫
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="text-base text-rose-600 italic mb-8"
                    >
                      Let's create beautiful memories together, one conversation at a time. 🎀
                    </motion.p>
                  </>
                )}

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSurpriseModal(false)}
                  className="px-10 py-4 bg-rose-500 text-white rounded-full font-bold shadow-lg hover:bg-rose-600 transition-all"
                >
                  Close 💖
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <footer className="pb-10 text-center text-rose-300 text-xs tracking-[0.4em] uppercase">
        {data.footerText ?? defaultData.footerText}
      </footer>
    </div>
  );
};

export default ConfessionStory;