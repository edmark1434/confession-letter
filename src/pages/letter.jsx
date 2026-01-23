import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Palette, Type, MessageSquare, Flower, Flower2, Sprout, Sun, Leaf, Trees } from 'lucide-react';
import LetterChoices from '../components/LetterChoices';
import FlowerChoices from '../components/FlowerChoices';
import AnimationChoices from '../components/AnimationChoices';
import HeartBg from '../components/HeartBg';

const LetterPage = () => {
  const [config, setConfig] = useState({
    design: 'classic',
    flower: 'rose',
    animation: 'hearts',
    font: 'Quicksand',
    message: '',
    letterColor: '#ffffff',
    flowerColor: '#FF85A1',
    textColor: '#FF85A1'
  });

  const FONTS = ['Quicksand', 'Great Vibes', 'Dancing Script', 'Pacifico'];

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#FFF5F7] overflow-x-hidden">
      {/* Dynamic Background Animation */}
      {config.animation === 'hearts' && <HeartBg count={15} />}
      {/* (Add logic for other animations here later) */}

      <nav className="relative z-20 flex justify-between items-center px-6 py-6 md:px-10">
        <Link to="/" className="p-2 rounded-full bg-white/50 text-[#FF85A1] hover:bg-white shadow-sm transition-all">
          <ArrowLeft size={20} />
        </Link>
        <span className="text-xl font-black text-[#FF85A1] tracking-tighter">Customize LuvNote</span>
        <button className="btn-bubbly bg-[#FF85A1] text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border-none">
          <Save size={16} /> Send
        </button>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col lg:flex-row gap-8 px-6 pb-12 items-start justify-center">
        
        {/* Left Side: Customization Panels */}
        <div className="w-full lg:w-[400px] space-y-6 max-h-[80vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#FFD1DC]">
          
          <section className="cute-glass p-6 rounded-[2.5rem]">
            <h3 className="text-[#FF85A1] font-black text-sm uppercase mb-4 flex items-center gap-2">
              <Palette size={16} /> Design & Flower
            </h3>
            <div className="space-y-6">
              <div>
                <p className="text-[#FFB3C6] text-xs font-bold mb-2">Letter Style</p>
                <LetterChoices selected={config.design} onSelect={(id) => setConfig({...config, design: id})} />
              </div>
              <div>
                <p className="text-[#FFB3C6] text-xs font-bold mb-2">Flower Accent</p>
                <FlowerChoices selected={config.flower} onSelect={(id) => setConfig({...config, flower: id})} />
              </div>
            </div>
          </section>

          <section className="cute-glass p-6 rounded-[2.5rem]">
            <h3 className="text-[#FF85A1] font-black text-sm uppercase mb-4 flex items-center gap-2">
              <Type size={16} /> Typography & Color
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[#FFB3C6] text-xs font-bold mb-2">Font</p>
                <select 
                  className="w-full p-2 rounded-xl bg-white/50 border-2 border-[#FFD1DC] text-[#FF85A1] font-bold outline-none"
                  value={config.font}
                  onChange={(e) => setConfig({...config, font: e.target.value})}
                >
                  {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <p className="text-[#FFB3C6] text-xs font-bold mb-2">Text Color</p>
                <input 
                  type="color" 
                  className="w-full h-10 rounded-xl bg-transparent border-none cursor-pointer"
                  value={config.textColor}
                  onChange={(e) => setConfig({...config, textColor: e.target.value})}
                />
              </div>
            </div>
          </section>

          <section className="cute-glass p-6 rounded-[2.5rem]">
            <h3 className="text-[#FF85A1] font-black text-sm uppercase mb-4 flex items-center gap-2">
              <MessageSquare size={16} /> Background & Message
            </h3>
            <div className="space-y-4">
              <AnimationChoices selected={config.animation} onSelect={(id) => setConfig({...config, animation: id})} />
              <textarea 
                className="w-full h-32 p-4 rounded-2xl bg-white/50 border-2 border-[#FFD1DC] font-medium text-[#FF85A1] outline-none placeholder:text-[#FFD1DC]"
                placeholder="Write your heart out..."
                value={config.message}
                onChange={(e) => setConfig({...config, message: e.target.value})}
              />
            </div>
          </section>
        </div>

        {/* Right Side: Live Preview */}
        <div className="flex-1 w-full flex justify-center items-center">
          <div 
            className="w-full max-w-[500px] min-h-[600px] p-12 rounded-[2rem] shadow-2xl relative transition-all duration-500 flex flex-col justify-between"
            style={{ 
              backgroundColor: config.letterColor,
              fontFamily: config.font,
              color: config.textColor,
              border: `8px solid ${config.textColor}20`
            }}
          >
            <div className="absolute top-6 right-6 text-4xl" style={{ color: config.flowerColor }}>
              {/* This would be a dynamic icon based on flower choice */}
              <Flower size={60} strokeWidth={1} />
            </div>
            
            <div className="mt-12 text-xl md:text-2xl whitespace-pre-wrap leading-relaxed">
              {config.message || "Your message will appear here..."}
            </div>

            <div className="text-right mt-8 opacity-60 italic">
              - Forever Yours
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default LetterPage;