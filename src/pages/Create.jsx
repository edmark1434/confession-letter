import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LucideImage, LucideType, LucideCalendar, LucidePlus,LucideUtensils,LucideMapPin,
  LucideHeart, LucideSmile, LucideCheckCircle, LucideLoader, LucideLock,LucideMusic,LucideCamera,
  LucideArrowRight, LucideArrowLeft
} from 'lucide-react';

import ValentinesSpecialForms from './Forms/ValentinesSpecialForms.jsx';
import ValentinesSpecial from './template/valentines/ValentinesSpecial.jsx';
import ConfessionStory from './template/confession/ConfessionSitePreview.jsx';
import ConfessionForms from './Forms/ConfessionForms.jsx';
import forsomeonespecial from '../assets/forsomeonespecial.png';
import valentinesspecial from '../assets/valentine-special.png';
const confessionConfig = {
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
      };
const valentineConfig = {
        recipientName: "",
        passcode: "",
        anniversaryDate: "",
        audioUrl: "",
        letterBody: "",
        invitationDate: "",
        invitationType: "",
        invitationLocation: "",
        memories: [
        { img: null, note: "" },
        { img: null, note: "" },
        { img: null, note: "" }
        ]
    }
const DESIGN_OPTIONS = [
  {
    id: 'confession',
    name: 'Confession Story',
    description: 'A beautiful multi-chapter confession with photos, feelings, and a date invitation',
    thumbnail: forsomeonespecial,
    formComponent: ConfessionForms,
    previewComponent: ConfessionStory,
    config : confessionConfig,
  },
  {
    id: 'valentines',
    name: 'Valentine\'s Special',
    description: 'A romantic Valentine\'s Day themed design with animations and love notes',
    thumbnail: valentinesspecial,
    formComponent: ValentinesSpecialForms,
    previewComponent: ValentinesSpecial,
    config : valentineConfig,
  },
];

const ConfessionForm = () => {
  const [step, setStep] = useState(1); // Step 1: Choose Design, Step 2: Fill Form
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [config, setConfig] = useState( {}); // Form state to pass to preview

  // Log config whenever it updates
  useEffect(() => {
    console.log("Config updated:", config);
  }, [config]);

  const handleSelectDesign = (designId) => {
    setSelectedDesign(designId);
    // Initialize config with the selected design's default config
    const design = DESIGN_OPTIONS.find(d => d.id === designId);
    if (design) {
      setConfig({ ...design.config });
    }
  };

  const handleNextStep = () => {
    if (selectedDesign) {
      setStep(2);
    }
  };

  const handleBackToDesign = () => {
    setStep(1);
    setSelectedDesign(null);
    setConfig({}); // Reset config when going back
  };

  const selectedDesignData = DESIGN_OPTIONS.find(d => d.id === selectedDesign);
  const FormComponent = selectedDesignData?.formComponent;
  const PreviewComponent = selectedDesignData?.previewComponent;
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row gap-4 lg:gap-0">
      
      {/* --- LEFT PANEL: STEPS --- */}
      <div className="w-full lg:w-1/3 bg-white shadow-xl z-20 overflow-y-auto h-screen p-8 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col">
        
        {/* Step Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {step === 1 ? 'Step 1: Choose a Design' : 'Step 2: Fill in Details'}
          </h2>
          <div className="flex gap-2 items-center">
            <div className={`h-2 w-8 rounded-full ${step >= 1 ? 'bg-rose-500' : 'bg-gray-300'}`} />
            <div className={`h-2 w-8 rounded-full ${step >= 2 ? 'bg-rose-500' : 'bg-gray-300'}`} />
          </div>
        </div>

        {/* Step 1: Choose Design */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1"
          >
            <div className="grid grid-cols-1 gap-4">
              {DESIGN_OPTIONS.map((design) => {
                const isSelected = selectedDesign === design.id;
                return (
                  <motion.div
                    key={design.id}
                    whileHover={{ y: -4 }}
                    onClick={() => handleSelectDesign(design.id)}
                    className={`cursor-pointer rounded-2xl overflow-hidden shadow-md transition-all duration-300 p-4 border-2 ${
                      isSelected ? 'border-rose-500 bg-rose-50' : 'border-gray-200 bg-white hover:border-rose-300'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3 bg-gray-200">
                      <img
                        src={design.thumbnail}
                        alt={design.name}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-rose-500/20 flex items-center justify-center">
                          <LucideCheckCircle className="text-rose-500" size={32} fill="white" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{design.name}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{design.description}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={handleNextStep}
              disabled={!selectedDesign}
              className={`w-full mt-8 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedDesign
                  ? 'bg-rose-500 text-white hover:bg-rose-600 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next Step <LucideArrowRight size={18} />
            </motion.button>
          </motion.div>
        )}

        {/* Step 2: Fill Form */}
        {step === 2 && FormComponent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 flex flex-col"
          >
            <FormComponent  config={config} setConfig={setConfig} />

            {/* Back Button */}
            <button
              onClick={handleBackToDesign}
              className="mt-8 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300"
            >
              <LucideArrowLeft size={18} /> Back to Design Selection
            </button>
          </motion.div>
        )}
      </div>

      {/* --- RIGHT PANEL: LIVE PREVIEW --- */}
      <div className="flex-1 h-screen overflow-hidden bg-slate-200 p-2 md:p-4 lg:p-10 relative">
        <div className="absolute top-2 md:top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-3 md:px-4 py-1 rounded-full text-[8px] md:text-[10px] font-bold tracking-widest uppercase z-50">
          Live Preview
        </div>
        
        {/* We pass the form state (config) directly into the Story component */}
        <div className="w-full h-full rounded-lg md:rounded-[2rem] overflow-hidden shadow-2xl border-2 md:border-[8px] border-slate-900">
          <div className="w-full h-full md:scale-[0.9] md:origin-center">
            {PreviewComponent ? <PreviewComponent externalConfig={config} /> : <ValentinesSpecial externalConfig={config} />}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ConfessionForm;