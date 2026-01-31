import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideArrowLeft, LucideArrowRight, LucideCheckCircle, LucideLayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import ConfessionForms from './Forms/ConfessionForms.jsx';
import ConfessionStory from './template/confession/ConfessionSitePreview.jsx';
import ConfessionModernMinimalist from "./template/confession/ConfessionModernMinimalist.jsx";
import ConfessionRetroVintage from "./template/confession/ConfessionRetroVintage.jsx";
import retroThumbnail from '../assets/img_retro.png'; // You'll need to add this image
import modernThumbnail from '../assets/img_modern.png';
import forsomeonespecial from '../assets/forsomeonespecial.png';

// Define different confession-specific templates here
const CONFESSION_TEMPLATES = [
  {
    id: 'story-v1',
    name: 'Classic Story',
    description: 'A multi-page journey through your feelings with a hero image.',
    thumbnail: forsomeonespecial,
    previewComponent: ConfessionStory,
    config: {
      recipientName: "",
      title: "For Someone Special",
      imageSection2: "",
      littleThings: [
        { title: "Your Smile", desc: "The way it lights up your whole face." },
        { title: "Your Kindness", desc: "How you treat the world with such a gentle heart." },
        { title: "Your Mind", desc: "The way you think and the stories you share." }
      ],
      letterBody: "I've sat down to write this a dozen times, but words always seem to fall short...",
      invitationDate: "",
      invitationLocation: "",
      footerText: "Designed with Love • 2026"
    }
  },
    {
      id: 'modern-minimalist',
      name: 'Modern Minimalist',
      description: 'Clean, elegant design with smooth animations and modern aesthetic.',
      thumbnail: modernThumbnail,
      previewComponent: ConfessionModernMinimalist,
      config: {
        recipientName: "",
        title: "A Message For You",
        imageSection2: "", // Changed from mainImage
        littleThings: [ // Changed from qualities
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
      }
    },
  {
  id: 'retro-vintage',
  name: 'Retro Vintage',
  description: '80s/90s cyberpunk aesthetic with CRT effects and neon colors.',
  thumbnail: retroThumbnail, // Add your own thumbnail image
  previewComponent: ConfessionRetroVintage,
  config: {
    recipientName: "",
    title: "FOR SOMEONE SPECIAL",
    imageSection2: "",
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
  }
}
];

const CreateConfession = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Select Template, 2: Edit
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [config, setConfig] = useState({});

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setConfig({ ...template.config });
  };

  const handleNext = () => {
    if (selectedTemplate) setStep(2);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
      {/* --- LEFT PANEL: FLOW --- */}
      <div className="w-full lg:w-[450px] h-screen overflow-y-auto border-r border-slate-200 bg-white p-8 no-scrollbar z-20 shadow-xl">

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            {step === 1 ? 'Pick a Confession Style' : 'Customize Details'}
          </h2>
          <div className="flex gap-2 mt-2">
            <div className={`h-1.5 w-10 rounded-full ${step >= 1 ? 'bg-rose-500' : 'bg-slate-200'}`} />
            <div className={`h-1.5 w-10 rounded-full ${step >= 2 ? 'bg-rose-500' : 'bg-slate-200'}`} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="space-y-4">
                {CONFESSION_TEMPLATES.map((tmpl) => (
                  <div
                    key={tmpl.id}
                    onClick={() => handleSelectTemplate(tmpl)}
                    className={`cursor-pointer rounded-2xl p-4 border-2 transition-all ${
                      selectedTemplate?.id === tmpl.id ? 'border-rose-500 bg-rose-50' : 'border-slate-100 hover:border-rose-200'
                    }`}
                  >
                    <img src={tmpl.thumbnail} className="w-full h-32 object-cover rounded-xl mb-3" alt={tmpl.name} />
                    <h3 className="font-bold text-slate-800">{tmpl.name}</h3>
                    <p className="text-xs text-slate-500">{tmpl.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-3">
                <button
                  onClick={handleNext}
                  disabled={!selectedTemplate}
                  className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-rose-200"
                >
                  Next Step <LucideArrowRight size={18} />
                </button>

                <button
                  onClick={() => navigate('/create-option')}
                  className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
                >
                  <LucideLayoutGrid size={18} /> Return to Selection
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <ConfessionForms config={config} setConfig={setConfig} />

              <button
                onClick={() => setStep(1)}
                className="w-full mt-4 py-3 text-slate-500 font-semibold flex items-center justify-center gap-2 hover:text-slate-800 transition-colors"
              >
                <LucideArrowLeft size={18} /> Change Template
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- RIGHT PANEL: PREVIEW --- */}
      <div className="flex-1 h-screen bg-slate-200 p-4 lg:p-10 relative flex items-center justify-center">
        <div className="absolute top-6 bg-slate-900/80 backdrop-blur-md text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest z-50 shadow-2xl">
          Live Preview
        </div>

        <div className="w-full max-w-[400px] lg:max-w-none h-full aspect-[9/16] lg:aspect-auto rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.2)] border-[10px] border-slate-900 bg-white transition-all duration-500">
           {selectedTemplate ? (
             <selectedTemplate.previewComponent externalConfig={config} />
           ) : (
             <div className="w-full h-full flex items-center justify-center text-slate-400 italic">
               Select a template to see preview
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default CreateConfession;