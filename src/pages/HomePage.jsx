import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LucidePlus, LucideSend, LucideHeart, 
  LucideExternalLink, LucideLayout, LucideBell,
  LucideSparkles, LucidePenTool, LucideStar, LucideQuote,
  LucideChevronLeft, LucideChevronRight, LucideCheckCircle2, LucideTimer,
  LucideShare2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {getValentineByUser} from '../repositiories/ValentineRepositories';
import {getConfessionByUser} from '../repositiories/ConfessionsRepositories';
import { getAuth } from 'firebase/auth';
import { realtimeDB } from '../firebase';
import { ref, update, get } from 'firebase/database';
import GenerateLinkAndQr from '../components/GenerateLinkAndQr.jsx';
import {sendMessage as sendMessageApi, getMessages} from '../repositiories/MessageRepositories.js';
import { getNotifications, sendHeartNotification } from '../repositiories/NotificationRepositories.js';
import { timeAgo } from '../services/CommonFunctionService.jsx';

// --- STYLING: HIDE SCROLLBAR ---
const scrollbarHideStyles = `
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

const MOTIVATIONAL_QUOTES = [
  { text: "Take the risk, or lose the chance.", author: "Choice & Chance" },
  { text: "In the end, we only regret the chances we didn't take.", author: "Lewis Carroll" },
  { text: "Love is a verb. It's an action, not just a feeling.", author: "Stephen Covey" },
  { text: "Speak your truth, even if your voice shakes.", author: "Maggie Smith" }
];

const COMMUNITY_EXPERIENCES = [
  { id: 1, user: "Sofia", content: "The 'Things that make me smile' section made him cry happy tears! ❤️", likes: 24, time: "1h ago" },
  { id: 2, user: "Liam", content: "Just set up a coffee date for this Sunday. It looks so professional!", likes: 15, time: "4h ago" },
  { id: 3, user: "Elena", content: "She said yes! The confession page template is absolute magic.", likes: 89, time: "12h ago" }
];

const HomePage = () => {
  const userId = getAuth().currentUser?.uid;
  const navigate = useNavigate();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [expIndex, setExpIndex] = useState(0);
  const [hasNotification, setHasNotification] = useState(true);
  const [myWebsites, setMyWebsites] = useState([]);
  const [isSharedLink, setIsSharedLink] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessagesList] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    const fetchData = async() =>{
      const [res1,res2] = await Promise.all([
        getConfessionByUser(userId),
        getValentineByUser(userId)
      ]);
      const combined = [...res1, ...res2]
      setMyWebsites(combined);
    }
    fetchData();
  },[userId]);

  useEffect(() => {
    const unsubscribe = getMessages(setMessagesList);
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const unsubscribe = getNotifications(userId, (fetchedNotifications) => {
      setNotifications(fetchedNotifications);
      setHasNotification(fetchedNotifications.length > 0);
    });
    return () => unsubscribe();
  }, [userId]);

  const handleSendMessage = () => {
    if(message.trim() === '') return;
    setProcessing(true);
    sendMessageApi(message.trim()).then(() => {
      setProcessing(false);
    });

    setMessage('');
  }

  const handleHeartMessage = async (messageData) => {
    if (!messageData) return;
    try {
      const { toggleHeartMessage } = await import('../repositiories/MessageRepositories.js');
      const currentUserName = getAuth().currentUser.displayName || 'Someone';
      
      await toggleHeartMessage(messageData.id, messageData, userId, currentUserName);
    } catch (error) {
      console.error('Error toggling heart:', error);
    }
  }

  

  // Quote Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextExp = () => setExpIndex((prev) => (prev + 1) % messageList.length);
  const prevExp = () => setExpIndex((prev) => (prev - 1 + messageList.length) % messageList.length);

  

  return (
    <div className="min-h-screen bg-[#FFF9FA] text-rose-950 font-serif no-scrollbar overflow-x-hidden selection:bg-rose-100">
      <style dangerouslySetInnerHTML={{ __html: scrollbarHideStyles }} />
      
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-200 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-100 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-xl border-b border-rose-100 px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-rose-500 p-2 rounded-xl shadow-lg">
            <LucideHeart fill="white" className="text-white" size={18} />
          </div>
          <h1 className="text-xl font-bold tracking-tighter text-rose-900 italic">LuvNote</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative cursor-pointer p-2 hover:bg-rose-50 rounded-full transition-colors"
          >
            <LucideBell size={22} className="text-rose-400" />
            {hasNotification && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-600 border-2 border-white rounded-full" />
            )}
            
            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-rose-100 overflow-hidden z-50">
                <div className="p-4 border-b border-rose-100 bg-rose-50">
                  <h3 className="font-bold text-rose-900">Notifications</h3>
                  <p className="text-xs text-rose-400">{notifications.length} new responses</p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-rose-300 text-sm">
                      No new notifications
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif.id} className="p-4 border-b border-rose-50 hover:bg-rose-50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                            <LucideCheckCircle2 size={20} className="text-emerald-500" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-rose-900">{notif.title}</p>
                            <p className="text-xs text-rose-600 mt-1">{notif.message}</p>
                            <p className="text-[10px] text-rose-300 mt-2 uppercase font-black tracking-wider">{timeAgo(notif.timestamp)}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          <button 
            onClick={() => navigate('/create')}
            className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-rose-200"
          >
            <LucidePlus size={18} /> <span className="hidden sm:inline">Create New Site</span>
          </button>
        </div>
      </nav>
      
      {/* --- HERO QUOTE --- */}
      <header className="relative pt-16 pb-12 flex flex-col items-center text-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={quoteIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-2xl"
          >
            <LucideQuote className="text-rose-200 w-10 h-10 mx-auto mb-6 opacity-40" />
            <h2 className="text-3xl md:text-5xl italic text-rose-900 leading-tight mb-4">
              {MOTIVATIONAL_QUOTES[quoteIndex].text}
            </h2>
            <p className="text-[10px] uppercase tracking-[0.4em] text-rose-400 font-black">
              — {MOTIVATIONAL_QUOTES[quoteIndex].author}
            </p>
          </motion.div>
        </AnimatePresence>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-12">
        
        {/* --- LEFT: CAROUSEL & POSTING --- */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* Experience Carousel */}
          <section className="relative bg-white/40 backdrop-blur-sm rounded-[3rem] p-10 border border-rose-50 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-rose-400 text-[10px] font-black uppercase tracking-[0.3em]">Community Experiences</h3>
              <div className="flex gap-2">
                <button onClick={prevExp} className="p-2 hover:bg-rose-100 rounded-full text-rose-400 transition-colors"><LucideChevronLeft size={20}/></button>
                <button onClick={nextExp} className="p-2 hover:bg-rose-100 rounded-full text-rose-400 transition-colors"><LucideChevronRight size={20}/></button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={expIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="min-h-[140px]"
              >
                <p className="text-xl md:text-2xl text-rose-800 italic leading-relaxed mb-6">
                  "{messageList[expIndex]?.message}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-500 font-bold text-xs">
                      {messageList[expIndex]?.senderName[0]}
                    </div>
                    <span className="font-bold text-sm text-rose-900">{messageList[expIndex]?.senderName}</span>
                  </div>
                  <div className="flex items-center gap-4 text-rose-300">
                     <button 
                       onClick={() => handleHeartMessage(messageList[expIndex])}
                       className="flex items-center gap-1 text-[10px] font-black hover:text-rose-500 transition-colors cursor-pointer"
                     >
                       <LucideHeart size={14} fill="currentColor"/> {messageList[expIndex]?.heart || 0}
                     </button>
                     <span className="text-[10px] font-black uppercase tracking-tighter">{timeAgo(messageList[expIndex]?.timestamp)}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </section>

          {/* Create Post */}
          <section className="bg-white/80 rounded-[2.5rem] p-8 border border-rose-50 shadow-sm">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-3 text-rose-800">
              <LucidePenTool size={20} className="text-rose-400" /> Share Yours
            </h2>
            <div className="relative">
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="How did they react?..."
                className="w-full bg-rose-50/30 border-2 border-rose-100/50 rounded-3xl p-5 text-sm focus:ring-4 focus:ring-rose-100 outline-none transition-all h-32 italic"
              />
              <button disabled={processing} onClick={() => handleSendMessage()} className="absolute bottom-4 right-4 p-3 bg-rose-500 text-white rounded-2xl shadow-xl hover:bg-rose-600 transition-all">
                <LucideSend size={20} />
              </button>
            </div>
          </section>
        </div>

        {/* --- RIGHT: DASHBOARD --- */}
        <div className="lg:col-span-5 space-y-8">
          
          <section className="bg-rose-950 rounded-[3rem] p-8 text-rose-50 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold italic">My Creations</h2>
                <LucideLayout size={20} className="text-rose-500" />
              </div>
              
              <div className="space-y-4">
                {myWebsites.map((site,index) => {
                  const baseUrl = window.location.origin;

                  return (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between group hover:bg-white/10 transition-all">
                      <div className="flex items-center gap-4">
                        {site.answer === 'yes' ? (
                          <LucideCheckCircle2 size={18} className="text-emerald-400" />
                        ) : (
                          <LucideTimer size={18} className="text-amber-400 animate-pulse" />
                        )}
                        <div>
                          <h4 className="font-bold text-sm">{site.title}</h4>
                          <p className={`text-[9px] font-black uppercase tracking-widest ${site.answer === 'yes' ? 'text-emerald-500' : 'text-amber-500'}`}>
                            {site.answer === 'yes' ? 'RESPONDED' : 'PENDING'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            setSelectedSite(site);
                            setIsSharedLink(true);
                          }}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-rose-50 transition-all"
                        >
                          <LucideShare2 size={14} className="text-rose-200" />
                          <span>Invite / Share</span>
                        </button>
                           <LucideExternalLink onClick={() => { window.location.href=`${baseUrl}/${site.type}/${site.code}` }} size={16} className="text-rose-800 group-hover:text-rose-400" />
                   
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-rose-500/20 blur-3xl" />
          </section>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-[2rem] border border-rose-50 text-center shadow-sm">
              <LucideHeart size={20} className="mx-auto mb-2 text-rose-500" fill="currentColor" />
              <p className="text-2xl font-bold text-rose-950">2.4k</p>
              <p className="text-[9px] text-rose-300 uppercase font-black tracking-widest mt-1">Global Hearts</p>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-rose-50 text-center shadow-sm">
              <LucideSparkles size={20} className="mx-auto mb-2 text-rose-500" />
              <p className="text-2xl font-bold text-rose-950">15</p>
              <p className="text-[9px] text-rose-300 uppercase font-black tracking-widest mt-1">Active Themes</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-20 text-center">
        <p className="text-rose-300 text-[10px] uppercase tracking-[0.5em] font-black">
          LuvNote • Handcrafted 2026
        </p>
      </footer>

      {/* Share Modal - Rendered once outside the loop */}
      {selectedSite && (
        <GenerateLinkAndQr 
          isOpen={isSharedLink}
          onClose={() => {
            setIsSharedLink(false);
            setSelectedSite(null);
          }}
          type={selectedSite.type}
          useCode={selectedSite.code}
        />
      )}
    </div>
  );
};

export default HomePage;