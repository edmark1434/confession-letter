import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LucideHeart, LucideCalendar, LucideMapPin,
  LucideMusic, LucideVolume2, LucideArrowRight,
  LucideChevronDown, LucideSparkles, LucideMail,
  LucideX, LucideCheck, LucideMessageCircle,
  LucideChevronLeft, LucideChevronRight, LucideBookOpen
} from 'lucide-react';

// Default data - MATCHING Classic Story structure
const defaultData = {
  title: "A Message For You",
  recipientName: "You",
  songUrl: "",
  imageSection2: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  littleThings: [  // Changed from 'qualities' to 'littleThings'
    {
      title: "Your Spark",
      desc: "The way you light up every room you enter"
    },
    {
      title: "Your Heart",
      desc: "The kindness you show to everyone around you"
    },
    {
      title: "Your Energy",
      desc: "How you make ordinary moments feel special"
    }
  ],
  letterBody: "Sometimes words don't feel enough. But I want you to know how much you mean to me. In your smile, I find comfort. In your laugh, I find joy. In your presence, I find home.",
  invitationDate: "This weekend",
  invitationLocation: "Your favorite café",
  footerText: "Made with sincerity • 2026"
};


const ConfessionModernMinimalist = ({ externalConfig }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [data, setData] = useState(defaultData);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [userResponse, setUserResponse] = useState(null);

  // Merge external config with defaults
  useEffect(() => {
    if (externalConfig) {
      setData(prev => ({ ...defaultData, ...externalConfig }));
    }
  }, [externalConfig]);

  const recipientName = data.recipientName.trim() || "You";

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
      title: `For ${recipientName}`,
      subtitle: 'A digital letter, just for you',
      step: 1
    },
    {
      id: 'likes',
      title: 'What I Admire',
      subtitle: 'A few things that make you special',
      step: 2
    },
    {
      id: 'letter',
      title: 'My Truth',
      subtitle: 'Words from the heart',
      step: 3
    },
    {
      id: 'date',
      title: 'A Simple Question',
      subtitle: 'Would you like to...',
      step: 4
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

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
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/30 to-white font-sans overflow-hidden relative">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .glass-effect { 
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04);
        }
        .floating-shadow {
          box-shadow: 0 20px 60px rgba(251, 113, 133, 0.1),
                      0 10px 30px rgba(251, 113, 133, 0.05);
        }
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(251, 113, 133, 0.15);
        }
      `}</style>

      {/* Background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-rose-100/40 to-pink-100/40 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-rose-50/30 to-white/30 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-rose-50/20 to-transparent blur-3xl"></div>
      </div>

      {/* Audio player */}
      <audio ref={audioRef} src={data.songUrl} loop />

      {/* Music control */}
      {isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggleMusic}
          className="fixed top-6 right-6 z-50 p-3 rounded-full glass-effect shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          {isPlaying ? (
            <LucideVolume2 size={20} className="text-rose-600" />
          ) : (
            <LucideMusic size={20} className="text-rose-600" />
          )}
        </motion.button>
      )}

      {/* Main content */}
      <div className="relative z-10">
        {/* Closed state - Envelope */}
        {!isOpen ? (
          <section className="min-h-screen flex flex-col items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-md"
            >
              <div className="mb-10">
                <h1 className="text-5xl md:text-6xl font-light text-slate-800 mb-3 tracking-tight">
                  {data.title}
                </h1>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-rose-400/50 to-transparent mx-auto"></div>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="cursor-pointer mb-12"
              >
                <div className="relative w-72 h-52 mx-auto mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-100/80 to-pink-100/80 rounded-2xl shadow-lg transform rotate-2"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-rose-50/90 rounded-2xl shadow-xl flex items-center justify-center border border-rose-100/50">
                    <LucideMail size={52} className="text-rose-400/80" />
                    <div className="absolute -bottom-3 bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm border border-rose-100">
                      <span className="text-rose-500 font-medium text-xs tracking-wider">Tap to open</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-500 text-sm mb-4 font-light">
                  A personal message awaits you
                </p>
                <button className="px-8 py-3.5 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl hover:from-rose-600 hover:to-rose-700 transition-all duration-300">
                  Open Message
                </button>
              </motion.div>

              <p className="text-slate-400 text-xs font-light mb-2">
                Scroll to reveal
              </p>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mt-1"
              >
                <LucideChevronDown size={18} className="text-rose-300 mx-auto" />
              </motion.div>
            </motion.div>
          </section>
        ) : (
          <>
            {/* Navigation Header */}
            <div className="sticky top-0 z-50 py-4 px-6">
              <div className="max-w-6xl mx-auto flex items-center justify-between">
                {/* Close Letter Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200 px-4 py-2.5 rounded-xl text-slate-700 text-sm font-medium hover:bg-white hover:border-rose-200 hover:text-rose-600 transition-all duration-200"
                >
                  <LucideBookOpen size={16} />
                  Close Letter
                </motion.button>

                {/* Progress Steps */}
                <div className="hidden md:flex items-center gap-6">
                  {sections.map((section, index) => (
                    <div key={section.id} className="flex items-center gap-4">
                      <button
                        onClick={() => setCurrentSection(index)}
                        className={`flex items-center gap-3 transition-all ${
                          currentSection === index
                            ? 'text-rose-600'
                            : currentSection > index
                            ? 'text-slate-400'
                            : 'text-slate-300'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          currentSection === index
                            ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                            : currentSection > index
                            ? 'bg-slate-100 text-slate-500'
                            : 'bg-slate-50 text-slate-300'
                        }`}>
                          {section.step}
                        </div>
                        <div className="text-left">
                          <div className="text-xs font-medium">{section.title}</div>
                          <div className="text-xs opacity-60">{section.subtitle}</div>
                        </div>
                      </button>
                      {index < sections.length - 1 && (
                        <div className={`h-px w-6 ${
                          currentSection > index ? 'bg-rose-300' : 'bg-slate-200'
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
                          ? 'w-8 bg-gradient-to-r from-rose-500 to-pink-500'
                          : 'w-2 bg-slate-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    disabled={currentSection === 0}
                    className={`p-2.5 rounded-xl transition-all ${
                      currentSection === 0
                        ? 'text-slate-300 cursor-not-allowed'
                        : 'text-slate-600 hover:bg-white hover:shadow-sm hover:text-rose-600'
                    }`}
                  >
                    <LucideChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentSection === sections.length - 1}
                    className={`p-2.5 rounded-xl transition-all ${
                      currentSection === sections.length - 1
                        ? 'text-slate-300 cursor-not-allowed'
                        : 'text-slate-600 hover:bg-white hover:shadow-sm hover:text-rose-600'
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
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="text-center max-w-2xl"
                >
                  <motion.div variants={itemVariants} className="mb-10">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 px-5 py-2.5 rounded-full text-sm font-medium mb-8 border border-rose-100">
                      <LucideSparkles size={16} className="text-rose-500" />
                      Personal Message
                    </div>
                    <h2 className="text-6xl md:text-7xl font-light text-slate-800 mb-6 leading-tight">
                      Hello, {recipientName}
                    </h2>
                    <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-lg mx-auto">
                      This is a collection of thoughts I've been wanting to share with you.
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <button
                      onClick={handleNext}
                      className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:shadow-rose-200/50 hover:scale-[1.02] transition-all duration-300"
                    >
                      Begin Reading
                      <LucideArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                </motion.div>
              </section>
            )}

            {/* Little Things section (was Qualities) */}
            {currentSection === 1 && (
              <section className="min-h-[90vh] py-20 px-6">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={containerVariants}
                  className="max-w-6xl mx-auto"
                >
                  <motion.div variants={itemVariants} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-4">
                      What Makes You You
                    </h2>
                    <p className="text-slate-500 text-lg font-light">
                      A few things I've noticed and cherish about you
                    </p>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-12 mb-16">
                    {/* Image on left */}
                    <motion.div variants={itemVariants} className="relative">
                      <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-lg">
                        <img
                          src={data.imageSection2}
                          alt="Special moment"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                      </div>
                    </motion.div>

                    {/* Little Things on right */}
                    <div className="space-y-6">
                      {(data.littleThings || []).map((item, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="glass-effect rounded-2xl p-6 card-hover border border-slate-100/50"
                        >
                          <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-3 rounded-xl">
                              <LucideSparkles size={20} className="text-rose-500" />
                            </div>
                            <div>
                              <h3 className="text-xl font-medium text-slate-800 mb-2">
                                {item.title}
                              </h3>
                              <p className="text-slate-600 leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.div variants={itemVariants} className="text-center">
                    <button
                      onClick={handleNext}
                      className="text-rose-500 hover:text-rose-600 font-medium inline-flex items-center gap-2 group"
                    >
                      Continue to my letter
                      <LucideArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                </motion.div>
              </section>
            )}

            {/* Letter section */}
            {currentSection === 2 && (
              <section className="min-h-[90vh] flex items-center justify-center p-6">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={containerVariants}
                  className="max-w-2xl w-full"
                >
                  <motion.div variants={itemVariants} className="mb-10">
                    <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-8">
                      From My Heart
                    </h2>
                    <div className="glass-effect rounded-3xl p-8 md:p-12 floating-shadow border border-slate-100/50">
                      <div className="text-slate-700 leading-relaxed text-lg space-y-6 font-light">
                        {(data.letterBody || "").split('\n').map((paragraph, index) => (
                          <p key={index} className="leading-8">{paragraph}</p>
                        ))}
                      </div>
                      <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end">
                        <div className="text-right">
                          <div className="text-slate-800 font-medium text-lg">With sincerity,</div>
                          <div className="text-slate-500 text-sm mt-1">Someone who cares</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="text-center">
                    <button
                      onClick={handleNext}
                      className="px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:shadow-rose-200/50 hover:scale-[1.02] transition-all duration-300"
                    >
                      One last question
                    </button>
                  </motion.div>
                </motion.div>
              </section>
            )}

            {/* Invitation section */}
            {currentSection === 3 && (
              <section className="min-h-[90vh] flex items-center justify-center p-6">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={containerVariants}
                  className="max-w-2xl w-full mx-auto"
                >
                  <motion.div variants={itemVariants} className="text-center">
                    {/* Heart Icon */}
                    <div className="inline-flex items-center justify-center mb-8">
                      <div className="p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl shadow-sm border border-rose-100">
                        <LucideHeart size={40} className="text-rose-500" fill="#FB7185" />
                      </div>
                    </div>

                    {/* Title and subtitle */}
                    <h2 className="text-5xl md:text-6xl font-light text-slate-800 mb-4 leading-tight">
                      Would you like to meet?
                    </h2>
                    <p className="text-slate-500 text-lg md:text-xl font-light mb-12 max-w-md mx-auto">
                      I'd love the chance to get to know you better
                    </p>

                    {/* Date and Location Cards */}
                    <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 mb-12">
                      <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm px-8 py-5 rounded-2xl shadow-sm border border-slate-100 hover:border-rose-100 transition-all duration-200 w-full max-w-md">
                        <LucideCalendar size={24} className="text-rose-500 flex-shrink-0" />
                        <span className="font-medium text-slate-800 text-lg">{data.invitationDate || "Any day that feels right to you."}</span>
                      </div>
                      <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm px-8 py-5 rounded-2xl shadow-sm border border-slate-100 hover:border-rose-100 transition-all duration-200 w-full max-w-md">
                        <LucideMapPin size={24} className="text-rose-500 flex-shrink-0" />
                        <span className="font-medium text-slate-800 text-lg">{data.invitationLocation || "Your favorite café"}</span>
                      </div>
                    </motion.div>

                    {/* Response Buttons */}
                    {!userResponse ? (
                      <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
                        <button
                          onClick={() => handleResponse('yes')}
                          className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:shadow-rose-200/50 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
                        >
                          <LucideCheck size={20} />
                          Yes, I'd love to
                        </button>
                        <button
                          onClick={() => handleResponse('talk')}
                          className="w-full py-4 bg-white text-slate-700 rounded-xl font-medium border border-slate-200 hover:border-rose-200 hover:bg-rose-50/50 hover:text-rose-600 transition-all duration-300 flex items-center justify-center gap-3"
                        >
                          <LucideMessageCircle size={20} />
                          Let's talk more first
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 rounded-full font-medium border border-rose-100"
                      >
                        <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                        ✓ Response recorded
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              </section>
            )}
          </>
        )}

        {/* Footer */}
        <footer className="py-8 text-center">
          <p className="text-slate-400 text-sm font-light">{data.footerText}</p>
        </footer>

        {/* Response Modal */}
        <AnimatePresence>
          {showResponseModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowResponseModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center mb-6">
                    <div className="p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl">
                      {userResponse === 'yes' ? (
                        <LucideHeart size={36} className="text-rose-500" fill="#FB7185" />
                      ) : (
                        <LucideMessageCircle size={36} className="text-rose-500" />
                      )}
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-medium text-slate-800 mb-4">
                    {userResponse === 'yes'
                      ? "That makes me so happy! 💖"
                      : "I appreciate your honesty"}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {userResponse === 'yes'
                      ? "I'll reach out soon to plan something special. Thank you for making my day!"
                      : "I'm here whenever you're ready to chat. Looking forward to getting to know you better."}
                  </p>
                  <button
                    onClick={() => setShowResponseModal(false)}
                    className="px-8 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-full font-medium shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
                  >
                    Close
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

export default ConfessionModernMinimalist;