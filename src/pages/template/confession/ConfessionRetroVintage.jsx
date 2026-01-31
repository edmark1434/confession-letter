// New file: ConfessionRetroVintage.jsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LucideHeart, LucideCalendar, LucideMapPin,
  LucideMusic, LucideVolume2, LucideArrowRight,
  LucideChevronDown, LucideSparkles, LucideMail,
  LucideX, LucideCheck, LucideMessageCircle,
  LucideChevronLeft, LucideChevronRight, LucideBookOpen,
  LucideStar, LucideFlame, LucideZap, LucideTrophy
} from 'lucide-react';

// Default data for retro template
const defaultData = {
  title: "FOR SOMEONE SPECIAL",
  recipientName: "YOU",
  songUrl: "",
  imageSection2: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  littleThings: [
    {
      title: "YOUR VIBE",
      desc: "You bring this energy that's absolutely magnetic"
    },
    {
      title: "YOUR STYLE",
      desc: "The way you carry yourself is unforgettable"
    },
    {
      title: "YOUR SPIRIT",
      desc: "Your passion for life is contagious"
    }
  ],
  letterBody: "FROM THE MOMENT WE MET, SOMETHING CLICKED. IT'S LIKE FINDING THAT PERFECT SONG ON THE RADIO - RARE, SPECIAL, AND MAKES YOU WANT TO TURN UP THE VOLUME. I DIG EVERYTHING ABOUT YOU, FROM YOUR LAUGH TO THE WAY YOU SEE THE WORLD.",
  invitationDate: "THIS WEEKEND",
  invitationLocation: "THE COOL SPOT",
  footerText: "MADE WITH GOOD VIBES • 2026"
};

const ConfessionRetroVintage = ({ externalConfig }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [data, setData] = useState(defaultData);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [userResponse, setUserResponse] = useState(null);
  const [showScanlines, setShowScanlines] = useState(true);

  // Merge external config with defaults
  useEffect(() => {
    if (externalConfig) {
      setData(prev => ({ ...defaultData, ...externalConfig }));
    }
  }, [externalConfig]);

  const recipientName = (data.recipientName || "YOU").trim().toUpperCase() || "YOU";

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const sections = [
    {
      id: 'welcome',
      title: `FOR ${recipientName}`,
      subtitle: 'A DIGITAL LOVE NOTE',
      step: 1
    },
    {
      id: 'likes',
      title: 'WHAT ROCKS',
      subtitle: 'COOL THINGS ABOUT YOU',
      step: 2
    },
    {
      id: 'letter',
      title: 'MY TRUTH',
      subtitle: 'STRAIGHT FROM THE HEART',
      step: 3
    },
    {
      id: 'date',
      title: 'LET\'S HANG',
      subtitle: 'WHAT DO YOU SAY?',
      step: 4
    }
  ];

  const handleResponse = (response) => {
    setUserResponse(response);
    setShowResponseModal(true);
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-fuchsia-950 via-purple-900 to-indigo-900 font-mono overflow-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Share+Tech+Mono&family=Orbitron:wght@400;700&display=swap');
        
        .retro-font {
          font-family: 'Share Tech Mono', monospace;
        }
        
        .retro-title {
          font-family: 'Orbitron', sans-serif;
        }
        
        .retro-pixel {
          font-family: 'Press Start 2P', cursive;
        }
        
        .crt-effect {
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
                      linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          background-size: 100% 2px, 3px 100%;
          pointer-events: none;
        }
        
        .retro-glow {
          text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff;
        }
        
        .retro-border {
          border: 3px solid;
          border-image: linear-gradient(45deg, #ff00ff, #00ffff) 1;
        }
        
        .retro-card {
          background: linear-gradient(145deg, rgba(0, 0, 0, 0.7), rgba(40, 0, 40, 0.8));
          border: 2px solid #ff00ff;
          box-shadow: 
            0 0 20px rgba(255, 0, 255, 0.3),
            inset 0 0 20px rgba(0, 255, 255, 0.1);
        }
        
        .retro-button {
          background: linear-gradient(45deg, #ff00ff, #00ffff);
          border: none;
          color: black;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          position: relative;
          overflow: hidden;
        }
        
        .retro-button:before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: 0.5s;
        }
        
        .retro-button:hover:before {
          left: 100%;
        }
        
        .vhs-glitch {
          animation: glitch 5s infinite;
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        
        .pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 0, 255, 0.5); }
          50% { box-shadow: 0 0 40px rgba(255, 0, 255, 0.8); }
        }
        
        .scanline {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: rgba(0, 255, 255, 0.3);
          animation: scan 8s linear infinite;
          pointer-events: none;
          z-index: 9999;
        }
        
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>

      {/* CRT Scanlines Effect */}
      {showScanlines && (
        <div className="fixed inset-0 crt-effect z-10 pointer-events-none"></div>
      )}

      {/* Moving scanline */}
      {showScanlines && <div className="scanline"></div>}

      {/* Background grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(#ff00ff 1px, transparent 1px),
                           linear-gradient(90deg, #ff00ff 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-fuchsia-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-cyan-500/20 to-transparent"></div>
      </div>

      {/* Audio player */}
      <audio ref={audioRef} src={data.songUrl} loop />

      {/* Music control */}
      {isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggleMusic}
          className="fixed top-6 right-6 z-50 p-3 retro-border rounded-lg hover:scale-110 transition-all"
        >
          {isPlaying ? (
            <LucideVolume2 size={20} className="text-cyan-400" />
          ) : (
            <LucideMusic size={20} className="text-fuchsia-400" />
          )}
        </motion.button>
      )}

      {/* Main content */}
      <div className="relative z-20 retro-font text-white">
        {/* Closed state - Retro Envelope */}
        {!isOpen ? (
          <section className="min-h-screen flex flex-col items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-md"
            >
              <div className="mb-12">
                <h1 className="retro-title text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 mb-6 tracking-wider retro-glow">
                  {data.title}
                </h1>
                <div className="h-1 w-48 bg-gradient-to-r from-fuchsia-500 to-cyan-500 mx-auto mb-6"></div>
                <p className="text-cyan-300 text-sm tracking-[0.5em]">[ DIGITAL MESSAGE ]</p>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="cursor-pointer mb-12 vhs-glitch"
              >
                <div className="relative w-72 h-52 mx-auto mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/80 to-cyan-900/80 rounded-lg shadow-2xl transform -rotate-2"></div>
                  <div className="absolute inset-0 retro-border rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <LucideMail size={52} className="text-fuchsia-400 mx-auto mb-4" />
                      <div className="text-cyan-300 text-xs tracking-widest">[ TAP TO DECRYPT ]</div>
                    </div>
                  </div>
                  {/* Corner decorations */}
                  <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-fuchsia-400"></div>
                  <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-cyan-400"></div>
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-fuchsia-400"></div>
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-cyan-400"></div>
                </div>

                <button className="retro-button px-8 py-3.5 rounded-lg text-sm tracking-widest pulse-glow">
                  ACCESS MESSAGE
                </button>
              </motion.div>

              <p className="text-cyan-300/60 text-xs tracking-widest mb-2">
                SYSTEM: READY
              </p>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mt-2"
              >
                <div className="text-fuchsia-400 text-sm">▼ SCROLL ▼</div>
              </motion.div>
            </motion.div>
          </section>
        ) : (
          <>
            {/* Navigation Header */}
            <div className="sticky top-0 z-50 py-4 px-6 bg-black/70 backdrop-blur-sm border-b border-fuchsia-900">
              <div className="max-w-6xl mx-auto flex items-center justify-between">
                {/* Close Letter Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 bg-black/80 border border-fuchsia-700 px-4 py-2.5 rounded-lg text-cyan-300 text-sm tracking-wider hover:bg-fuchsia-900/50 hover:border-fuchsia-500 transition-all duration-200"
                >
                  <LucideBookOpen size={16} className="text-fuchsia-400" />
                  EXIT SYSTEM
                </motion.button>

                {/* Progress Steps - Retro Style */}
                <div className="hidden md:flex items-center gap-6">
                  {sections.map((section, index) => (
                    <div key={section.id} className="flex items-center gap-4">
                      <button
                        onClick={() => setCurrentSection(index)}
                        className="flex items-center gap-3 transition-all group"
                      >
                        <div className={`w-10 h-10 rounded border-2 flex items-center justify-center transition-all ${
                          currentSection === index
                            ? 'border-fuchsia-500 bg-fuchsia-900/50 text-fuchsia-300'
                            : currentSection > index
                            ? 'border-cyan-500 bg-cyan-900/30 text-cyan-300'
                            : 'border-gray-700 bg-black/50 text-gray-500'
                        }`}>
                          <div className="text-xs tracking-widest">{section.step}</div>
                        </div>
                        <div className="text-left">
                          <div className={`text-xs font-bold tracking-wider transition-all ${
                            currentSection === index
                              ? 'text-fuchsia-300'
                              : currentSection > index
                              ? 'text-cyan-300'
                              : 'text-gray-500'
                          }`}>
                            {section.title}
                          </div>
                          <div className="text-xs opacity-60">{section.subtitle}</div>
                        </div>
                      </button>
                      {index < sections.length - 1 && (
                        <div className={`h-px w-6 ${
                          currentSection > index ? 'bg-cyan-500/50' : 'bg-gray-700'
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile Progress Dots */}
                <div className="md:hidden flex gap-2">
                  {sections.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSection(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentSection === index
                          ? 'w-8 bg-gradient-to-r from-fuchsia-500 to-cyan-500'
                          : 'w-2 bg-gray-700'
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    disabled={currentSection === 0}
                    className={`p-2.5 rounded-lg border transition-all ${
                      currentSection === 0
                        ? 'border-gray-700 text-gray-600 cursor-not-allowed'
                        : 'border-fuchsia-700 text-fuchsia-300 hover:bg-fuchsia-900/30 hover:border-fuchsia-500'
                    }`}
                  >
                    <LucideChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentSection === sections.length - 1}
                    className={`p-2.5 rounded-lg border transition-all ${
                      currentSection === sections.length - 1
                        ? 'border-gray-700 text-gray-600 cursor-not-allowed'
                        : 'border-cyan-700 text-cyan-300 hover:bg-cyan-900/30 hover:border-cyan-500'
                    }`}
                  >
                    <LucideChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Welcome section */}
            {currentSection === 0 && (
              <section className="min-h-[90vh] flex items-center justify-center p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center max-w-2xl"
                >
                  <div className="mb-10">
                    <div className="inline-flex items-center gap-2 bg-black/70 border border-fuchsia-700 px-5 py-2.5 rounded-lg text-sm tracking-widest mb-8">
                      <LucideSparkles size={16} className="text-cyan-400" />
                      SYSTEM: MESSAGE DECRYPTED
                    </div>
                    <h2 className="retro-title text-6xl md:text-7xl bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent mb-6 leading-tight tracking-wider retro-glow">
                      HELLO, {recipientName}
                    </h2>
                    <p className="text-cyan-300 text-lg md:text-xl tracking-wide max-w-lg mx-auto">
                      WELCOME TO THE DIGITAL CONFESSION PROTOCOL
                    </p>
                  </div>

                  <button
                    onClick={handleNext}
                    className="group retro-button px-10 py-4 rounded-lg text-sm tracking-widest hover:scale-105 transition-transform"
                  >
                    INITIATE PROTOCOL
                    <LucideArrowRight size={20} className="inline ml-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </section>
            )}

            {/* Little Things section - Retro Style */}
            {currentSection === 1 && (
              <section className="min-h-[90vh] py-20 px-6">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <h2 className="retro-title text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-cyan-300 mb-4 tracking-wider">
                      SYSTEM ANALYSIS
                    </h2>
                    <p className="text-cyan-300 text-lg tracking-wider">
                      USER QUALITIES DETECTED
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12 mb-16">
                    {/* Image on left with retro frame */}
                    <div className="relative">
                      <div className="retro-card rounded-lg p-4">
                        <div className="relative h-[400px] rounded overflow-hidden border-2 border-fuchsia-700">
                          <img
                            src={data.imageSection2}
                          alt="Subject Scan"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          <div className="absolute bottom-4 left-4">
                            <div className="text-cyan-300 text-sm tracking-widest">[ SUBJECT SCAN ]</div>
                          </div>
                        </div>
                        {/* Scan lines overlay */}
                        <div className="absolute inset-0 pointer-events-none opacity-20">
                          <div className="h-full" style={{
                            background: `linear-gradient(transparent 50%, rgba(0, 255, 255, 0.1) 50%)`,
                            backgroundSize: '100% 4px'
                          }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Little Things on right - Retro Terminal Style */}
                    <div className="space-y-6">
                      {(data.littleThings || []).map((item, index) => {
                        const icons = [<LucideStar key="star" />, <LucideFlame key="flame" />, <LucideZap key="zap" />, <LucideTrophy key="trophy" />];
                        const icon = icons[index % icons.length];
                        return (
                          <div
                            key={index}
                            className="retro-card rounded-lg p-6 hover:border-cyan-500 transition-all duration-300"
                          >
                            <div className="flex items-start gap-4">
                              <div className="bg-gradient-to-br from-fuchsia-900 to-cyan-900 p-3 rounded border border-fuchsia-500">
                                {React.cloneElement(icon, { size: 20, className: "text-cyan-300" })}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="text-fuchsia-400 text-sm tracking-widest">[ {item.title} ]</div>
                                  <div className="h-px flex-1 bg-gradient-to-r from-fuchsia-700 to-transparent"></div>
                                </div>
                                <p className="text-cyan-300 leading-relaxed tracking-wide">
                                  {item.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={handleNext}
                      className="text-cyan-300 hover:text-cyan-100 font-bold tracking-widest inline-flex items-center gap-2 group"
                    >
                      CONTINUE TO MESSAGE TRANSMISSION
                      <LucideArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Letter section - Retro Terminal */}
            {currentSection === 2 && (
              <section className="min-h-[90vh] flex items-center justify-center p-6">
                <div className="max-w-2xl w-full">
                  <div className="mb-10">
                    <h2 className="retro-title text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-cyan-300 mb-8 tracking-wider">
                      MESSAGE TRANSMISSION
                    </h2>
                    <div className="retro-card rounded-lg p-8 md:p-12 border-2 border-fuchsia-700">
                      {/* Terminal header */}
                      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-fuchsia-800">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-cyan-300 text-sm tracking-widest">terminal://message.txt</div>
                      </div>

                      {/* Terminal content */}
                      <div className="font-mono">
                        <div className="text-cyan-400 mb-4">
                          <span className="text-fuchsia-400">user@confession:~$</span> cat message.txt
                        </div>
                        <div className="text-cyan-300 leading-relaxed tracking-wide space-y-4 ml-4 border-l-2 border-fuchsia-700 pl-4">
                          {(data.letterBody || "").split('\n').map((paragraph, index) => (
                            <p key={index} className="leading-7">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                        <div className="mt-8 pt-6 border-t border-fuchsia-800">
                          <div className="text-cyan-400">
                            <span className="text-fuchsia-400">user@confession:~$</span> _
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={handleNext}
                      className="retro-button px-10 py-4 rounded-lg text-sm tracking-widest hover:scale-105 transition-transform"
                    >
                      INITIATE CONNECTION REQUEST
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Invitation section - Retro Style */}
            {currentSection === 3 && (
              <section className="min-h-[90vh] flex items-center justify-center p-6">
                <div className="max-w-2xl w-full mx-auto">
                  <div className="text-center">
                    {/* Heart Icon - Retro Style */}
                    <div className="inline-flex items-center justify-center mb-8">
                      <div className="p-4 bg-gradient-to-br from-fuchsia-900 to-cyan-900 rounded-lg border-2 border-fuchsia-500">
                        <LucideHeart size={40} className="text-cyan-300" fill="#22d3ee" />
                      </div>
                    </div>

                    {/* Title and subtitle */}
                    <h2 className="retro-title text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 mb-4 leading-tight tracking-wider retro-glow">
                      CONNECTION REQUEST
                    </h2>
                    <p className="text-cyan-300 text-lg md:text-xl tracking-wide mb-12 max-w-md mx-auto">
                      WOULD YOU LIKE TO ESTABLISH CONNECTION?
                    </p>

                    {/* Date and Location Cards - Retro Style */}
                    <div className="flex flex-col items-center gap-4 mb-12">
                      <div className="retro-card w-full max-w-md px-8 py-5 rounded-lg hover:border-cyan-500 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <LucideCalendar size={24} className="text-fuchsia-400 flex-shrink-0" />
                          <div>
                            <div className="text-cyan-300 text-sm tracking-widest mb-1">[ PROPOSED TIME ]</div>
                            <div className="text-white font-bold text-lg">{data.invitationDate || "TIME: TBD"}</div>
                          </div>
                        </div>
                      </div>
                      <div className="retro-card w-full max-w-md px-8 py-5 rounded-lg hover:border-cyan-500 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <LucideMapPin size={24} className="text-fuchsia-400 flex-shrink-0" />
                          <div>
                            <div className="text-cyan-300 text-sm tracking-widest mb-1">[ LOCATION ]</div>
                            <div className="text-white font-bold text-lg">{data.invitationLocation || "COORDINATES: PENDING"}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Response Buttons - Retro Style */}
                    {!userResponse ? (
                      <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
                        <button
                          onClick={() => handleResponse('yes')}
                          className="retro-button w-full py-4 rounded-lg text-sm tracking-widest hover:scale-105 transition-transform"
                        >
                          <LucideCheck size={20} className="inline mr-3" />
                          ACCEPT CONNECTION
                        </button>
                        <button
                          onClick={() => handleResponse('talk')}
                          className="w-full py-4 bg-black/50 text-cyan-300 rounded-lg border border-cyan-700 font-bold tracking-widest hover:bg-cyan-900/30 hover:border-cyan-500 transition-all duration-300 flex items-center justify-center gap-3"
                        >
                          <LucideMessageCircle size={20} />
                          REQUEST MORE DATA
                        </button>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-fuchsia-900/50 to-cyan-900/50 text-cyan-300 rounded-lg border border-cyan-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        ✓ RESPONSE TRANSMITTED
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {/* Footer */}
        <footer className="py-8 text-center">
          <p className="text-cyan-300/50 text-sm tracking-widest">{data.footerText}</p>
        </footer>

        {/* Response Modal - Retro Style */}
        <AnimatePresence>
          {showResponseModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
              onClick={() => setShowResponseModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="retro-card rounded-lg p-8 max-w-md w-full border-2 border-fuchsia-700"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center mb-6">
                    <div className="p-4 bg-gradient-to-br from-fuchsia-900 to-cyan-900 rounded-lg border border-fuchsia-500">
                      {userResponse === 'yes' ? (
                        <LucideHeart size={36} className="text-cyan-300" fill="#22d3ee" />
                      ) : (
                        <LucideMessageCircle size={36} className="text-fuchsia-300" />
                      )}
                    </div>
                  </div>
                  <h3 className="retro-title text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 mb-4">
                    {userResponse === 'yes'
                      ? "CONNECTION ACCEPTED! 🎮"
                      : "DATA REQUEST RECEIVED"}
                  </h3>
                  <p className="text-cyan-300 leading-relaxed tracking-wide mb-6">
                    {userResponse === 'yes'
                      ? "SYSTEM: CONNECTION ESTABLISHED. PREPARING FOR SESSION..."
                      : "SYSTEM: AWAITING FURTHER INPUT. STANDBY FOR COMMUNICATION..."}
                  </p>
                  <button
                    onClick={() => setShowResponseModal(false)}
                    className="retro-button px-8 py-3 rounded-lg text-sm tracking-widest hover:scale-105 transition-transform"
                  >
                    ACKNOWLEDGE
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ConfessionRetroVintage;