import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LucideImage, LucideType, LucideCalendar, 
  LucideMapPin, LucideSmile, LucideCheckCircle ,LucideHeart
} from 'lucide-react';
import ConfessionStory from './ConfessionSitePreview'; // Assuming the previous code is in this file

const ConfessionForm = () => {
  // 1. State for all customizable content
  const [config, setConfig] = useState({
    title: "For Someone Special",
    imageSection2: "https://images.unsplash.com/photo-1516589174184-c68d8e5f247d?auto=format&fit=crop&q=80",
    littleThings: [
      { title: "Your Smile", desc: "The way it lights up your whole face." },
      { title: "Your Kindness", desc: "How you treat the world with such a gentle heart." },
      { title: "Your Mind", desc: "The way you think and the stories you share." }
    ],
    letterBody: "I've sat down to write this a dozen times, but words always seem to fall short...",
    invitationDate: "This coming weekend",
    invitationLocation: "Our favorite coffee spot",
    footerText: "Designed with Love • 2026"
  });

  const [activeTab, setActiveTab] = useState('general');

  // Helper to update little things array
  const updateSmileThing = (index, field, value) => {
    const updated = [...config.littleThings];
    updated[index][field] = value;
    setConfig({ ...config, littleThings: updated });
  };

  // Add new smile thing
  const addSmileThing = () => {
    setConfig({
      ...config,
      littleThings: [...config.littleThings, { title: "New reason", desc: "Add your reason here..." }]
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row gap-4 lg:gap-0">
      
      {/* --- LEFT PANEL: THE FORM --- */}
      <div className="w-full lg:w-1/3 bg-white shadow-xl z-20 overflow-y-auto h-screen p-8 border-b lg:border-b-0 lg:border-r border-slate-200">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <LucideHeart className="text-rose-500" fill="currentColor" /> Confession Editor
          </h1>
          <p className="text-slate-500 text-sm">Customize your message before sending.</p>
        </div>

        <div className="space-y-8">
          {/* Section: Visuals */}
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <LucideImage size={14} /> Hero Image & Title
            </label>
            <input 
              type="text" 
              placeholder="Main Title"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-rose-200 outline-none transition-all italic text-rose-700 font-medium"
              value={config.title}
              onChange={(e) => setConfig({...config, title: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Image URL (Section 2)"
              className="w-full p-3 border rounded-xl text-sm font-mono bg-white text-slate-700 focus:ring-2 focus:ring-rose-200 outline-none"
              value={config.imageSection2}
              onChange={(e) => setConfig({...config, imageSection2: e.target.value})}
            />
          </div>

          {/* Section: Reasons */}
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <LucideSmile size={14} /> 3 Things i like About You...
            </label>
            {config.littleThings.map((thing, idx) => (
              <div key={idx} className="p-4 border rounded-2xl bg-slate-50 space-y-2">
                <input 
                  className="w-full font-bold bg-transparent outline-none text-rose-700 italic"
                  value={thing.title}
                  onChange={(e) => updateSmileThing(idx, 'title', e.target.value)}
                />
                <textarea 
                  className="w-full text-sm bg-transparent outline-none text-slate-600 resize-none italic"
                  value={thing.desc}
                  onChange={(e) => updateSmileThing(idx, 'desc', e.target.value)}
                />
              </div>
            ))}
           
          </div>

          {/* Section: The Letter */}
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <LucideType size={14} /> Your Long Confession
            </label>
            <textarea 
              rows={6}
              className="w-full p-4 border rounded-2xl focus:ring-2 focus:ring-rose-200 outline-none italic text-slate-700"
              value={config.letterBody}
              onChange={(e) => setConfig({...config, letterBody: e.target.value})}
            />
          </div>

          {/* Section: Invitation */}
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <LucideCalendar size={14} /> The Invitation
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <LucideCalendar className="absolute left-3 top-3 text-slate-400" size={18} />
                <input 
                  placeholder="Date"
                  className="w-full pl-10 pr-3 py-3 border rounded-xl text-sm bg-white text-slate-700 focus:ring-2 focus:ring-rose-200 outline-none"
                  value={config.invitationDate}
                  onChange={(e) => setConfig({...config, invitationDate: e.target.value})}
                />
              </div>
              <div className="relative flex-1">
                <LucideMapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                <input 
                  placeholder="Location"
                  className="w-full pl-10 pr-3 py-3 border rounded-xl text-sm bg-white text-slate-700 focus:ring-2 focus:ring-rose-200 outline-none"
                  value={config.invitationLocation}
                  onChange={(e) => setConfig({...config, invitationLocation: e.target.value})}
                />
              </div>
            </div>
          </div>

          <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
            <LucideCheckCircle size={20} /> Save & Generate Link
          </button>
        </div>
      </div>

      {/* --- RIGHT PANEL: LIVE PREVIEW --- */}
      <div className="flex-1 h-screen overflow-hidden bg-slate-200 p-2 md:p-4 lg:p-10 relative">
        <div className="absolute top-2 md:top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-3 md:px-4 py-1 rounded-full text-[8px] md:text-[10px] font-bold tracking-widest uppercase z-50">
          Live Preview
        </div>
        
        {/* We pass the form state (config) directly into the Story component */}
        <div className="w-full h-full rounded-lg md:rounded-[2rem] overflow-hidden shadow-2xl border-2 md:border-[8px] border-slate-900">
          <div className="w-full h-full md:scale-[0.9] md:origin-center">
             {/* Pass 'config' as a prop to your Story component */}
             <ConfessionStory externalConfig={config} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ConfessionForm;