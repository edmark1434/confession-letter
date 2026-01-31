import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideArrowLeft, LucideArrowRight, LucideLayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import ValentinesSpecialForms from './Forms/ValentinesSpecialForms.jsx';
import ValentinesSpecial from './template/valentines/ValentinesSpecial.jsx';
import valentinesspecial from '../assets/valentine-special.png';

// Define different Valentine-specific templates here
const VALENTINE_TEMPLATES = [
  {
    id: 'valentine-v1',
    name: "Valentine's Special",
    description: "A romantic themed design with animations, love notes, and memory photos.",
    thumbnail: valentinesspecial,
    previewComponent: ValentinesSpecial,
    config: {
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
  }
  // Add more Valentine templates here as you create them
];

const CreateValentines = () => {
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
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#FFF9FA]">
      {/* --- LEFT PANEL: FLOW --- */}
      <div className="w-full lg:w-[450px] h-screen overflow-y-auto border-r border-rose-100 bg-white p-8 no-scrollbar z-20 shadow-xl">

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-rose-950">
            {step === 1 ? 'Choose Valentine Style' : 'Customize Your Note'}
          </h2>
          <div className="flex gap-2 mt-2">
            <div className={`h-1.5 w-10 rounded-full ${step >= 1 ? 'bg-rose-500' : 'bg-rose-100'}`} />
            <div className={`h-1.5 w-10 rounded-full ${step >= 2 ? 'bg-rose-500' : 'bg-rose-100'}`} />
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
                {VALENTINE_TEMPLATES.map((tmpl) => (
                  <div
                    key={tmpl.id}
                    onClick={() => handleSelectTemplate(tmpl)}
                    className={`cursor-pointer rounded-2xl p-4 border-2 transition-all ${
                      selectedTemplate?.id === tmpl.id ? 'border-rose-500 bg-rose-50' : 'border-rose-50 hover:border-rose-200'
                    }`}
                  >
                    <img src={tmpl.thumbnail} className="w-full h-32 object-cover rounded-xl mb-3" alt={tmpl.name} />
                    <h3 className="font-bold text-rose-900">{tmpl.name}</h3>
                    <p className="text-xs text-rose-400">{tmpl.description}</p>
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
              <ValentinesSpecialForms config={config} setConfig={setConfig} />

              <button
                onClick={() => setStep(1)}
                className="w-full mt-4 py-3 text-rose-400 font-semibold flex items-center justify-center gap-2 hover:text-rose-600 transition-colors"
              >
                <LucideArrowLeft size={18} /> Change Template
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- RIGHT PANEL: PREVIEW --- */}
      <div className="flex-1 h-screen bg-rose-50 p-4 lg:p-10 relative flex items-center justify-center">
        <div className="absolute top-6 bg-rose-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest z-50 shadow-2xl">
          Valentine Preview
        </div>

        <div className="w-full max-w-[400px] lg:max-w-none h-full aspect-[9/16] lg:aspect-auto rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(225,29,72,0.15)] border-[10px] border-rose-900 bg-white transition-all duration-500">
           {selectedTemplate ? (
             <selectedTemplate.previewComponent externalConfig={config} />
           ) : (
             <div className="w-full h-full flex items-center justify-center text-rose-300 italic">
               Select a style to preview your Valentine
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default CreateValentines;