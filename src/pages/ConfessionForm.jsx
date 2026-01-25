import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LucideImage, LucideType, LucideCalendar, 
  LucideHeart, LucideSmile, LucideCheckCircle, LucideLoader
} from 'lucide-react';
import ConfessionStory from './ConfessionSitePreview';
import GenerateLinkAndQr from '../components/GenerateLinkAndQr';
import { addConfessionData } from '../repositiories/ConfessionsRepositories';

const ConfessionForm = () => {
  // 1. State for all customizable content
  const [config, setConfig] = useState({
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
  });

  const [activeTab, setActiveTab] = useState('general');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!config.recipientName.trim()) newErrors.recipientName = 'Name is required';
    if (!config.title.trim()) newErrors.title = 'Title is required';
    if (!isImageUploaded) newErrors.image = 'Image is required';
    if (config.littleThings.some(t => !t.title.trim() || !t.desc.trim())) {
      newErrors.littleThings = 'All reasons must have title and description';
    }
    if (!config.letterBody.trim()) newErrors.letterBody = 'Confession letter is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helper to update little things array
  const updateSmileThing = (index, field, value) => {
    const updated = [...config.littleThings];
    updated[index][field] = value;
    setConfig({ ...config, littleThings: updated });
  };

  const SaveAndGenerateLink = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      addConfessionData(config).then((id) => {
        console.log("Confession saved with ID:", id);
        setIsSubmitting(false);
        setIsModalOpen(true);
      });
    }
  }
  // Handle image file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setConfig({...config, imageSection2: reader.result});
        setIsImageUploaded(true);
      };
      reader.readAsDataURL(file);
    }
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
              <LucideHeart size={14} /> Recipient Name (Required)
            </label>
            <input
              type="text"
              placeholder="Their name"
              className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-rose-200 outline-none transition-all text-rose-700 font-medium ${errors.recipientName ? 'border-red-500 bg-red-50' : ''}`}
              value={config.recipientName}
              onChange={(e) => setConfig({ ...config, recipientName: e.target.value })}
            />
            {errors.recipientName && <p className="text-xs text-red-500 font-semibold">{errors.recipientName}</p>}

            <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <LucideImage size={14} /> Hero Image & Title
            </label>
            <input 
              type="text" 
              placeholder="Main Title"
              className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-rose-200 outline-none transition-all italic text-rose-700 font-medium ${errors.title ? 'border-red-500 bg-red-50' : ''}`}
              value={config.title}
              onChange={(e) => setConfig({...config, title: e.target.value})}
            />
            {errors.title && <p className="text-xs text-red-500 font-semibold">{errors.title}</p>}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-600">Upload Image (Section 2)</label>
              <input 
                type="file" 
                accept="image/jpeg,image/png,image/jpg"
                required
                onChange={handleImageUpload}
                className={`w-full p-3 border rounded-xl text-sm bg-white text-slate-700 focus:ring-2 focus:ring-rose-200 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 cursor-pointer ${errors.image ? 'border-red-500 bg-red-50' : ''}`}
              />
              {errors.image && <p className="text-xs text-red-500 font-semibold">{errors.image}</p>}
              {isImageUploaded && (
                <img src={config.imageSection2} alt="Preview" className="w-full h-32 object-cover rounded-xl mt-2" />
              )}
            </div>
          </div>

          {/* Section: Reasons */}
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <LucideSmile size={14} /> 3 Things i like About You... (Editable)
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
            {errors.littleThings && <p className="text-xs text-red-500 font-semibold">{errors.littleThings}</p>}
          </div>

          {/* Section: The Letter */}
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <LucideType size={14} /> Your Long Confession
            </label>
            <textarea 
              rows={6}
              className={`w-full p-4 border rounded-2xl focus:ring-2 focus:ring-rose-200 outline-none italic text-slate-700 ${errors.letterBody ? 'border-red-500 bg-red-50' : ''}`}
              value={config.letterBody}
              onChange={(e) => setConfig({...config, letterBody: e.target.value})}
            />
            {errors.letterBody && <p className="text-xs text-red-500 font-semibold">{errors.letterBody}</p>}
          </div>

          {/* Section: Invitation */}
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <LucideCalendar size={14} /> The Invitation
            </label>
            <div className="space-y-3">
              <div className="relative">
                <LucideCalendar className="absolute left-3 top-3 text-slate-400 pointer-events-none" size={18} />
                <input 
                  type="date"
                  className="w-full pl-10 pr-3 py-3 border rounded-xl text-sm bg-white text-slate-700 focus:ring-2 focus:ring-rose-200 outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  style={{ colorScheme: 'light' }}
                  value={config.invitationDate}
                  onChange={(e) => setConfig({...config, invitationDate: e.target.value})}
                />
              </div>
              <div className="relative">
                <LucideHeart className="absolute left-3 top-3 text-slate-400 pointer-events-none" size={18} />
                <select 
                  className="w-full pl-10 pr-3 py-3 border rounded-xl text-sm bg-white text-slate-700 focus:ring-2 focus:ring-rose-200 outline-none appearance-none cursor-pointer"
                  value={config.invitationLocation}
                  onChange={(e) => setConfig({...config, invitationLocation: e.target.value})}
                >
                  <option value="">Select date type...</option>
                  <option value="Coffee Date">Coffee Date ☕</option>
                  <option value="Movie Date">Movie Date 🎬</option>
                  <option value="Dinner Date">Dinner Date 🍽️</option>
                  <option value="Picnic Date">Picnic Date 🧺</option>
                  <option value="Beach Date">Beach Date 🏖️</option>
                  <option value="Park Walk">Park Walk 🌳</option>
                  <option value="Arcade Date">Arcade Date 🎮</option>
                  <option value="Museum Visit">Museum Visit 🎨</option>
                  <option value="Stargazing">Stargazing ⭐</option>
                  <option value="Home Cooked Meal">Home Cooked Meal 🏠</option>
                </select>
              </div>
            </div>
          </div>

          <button 
            type="button"
            onClick={SaveAndGenerateLink}
            disabled={isSubmitting}
            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
              isSubmitting
                ? 'bg-slate-400 text-white cursor-not-allowed opacity-75'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            {isSubmitting ? (
              <>
                <LucideLoader size={20} className="animate-spin" /> Saving...
              </>
            ) : (
              <>
                <LucideCheckCircle size={20} /> Save & Generate Link
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generate Link Modal */}
      <GenerateLinkAndQr 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

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