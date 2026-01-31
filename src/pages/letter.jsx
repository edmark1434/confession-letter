import React, { useState, useDeferredValue } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Save, Mail, Palette, Type,
  MessageSquare, Sparkles
} from 'lucide-react';
import LetterChoices from '../components/LetterChoices';
import SealChoices from '../components/SealChoices';
import AnimationChoices from '../components/AnimationChoices';
import HeartBg from '../components/HeartBg';
import LetterAction from '../components/letter-action';

const LetterPage = () => {
  const [activeTab, setActiveTab] = useState('design');
  const [isEnveloped, setIsEnveloped] = useState(false);

  const [config, setConfig] = useState({
    design: 'classic',
    seal: 'heart',
    animation: 'hearts',
    font: 'Quicksand',
    title: '',
    message: '',
    letterColor: '#ffffff',
    envelopeColor: '#FFD1DC',
    sealColor: '#FF85A1',
    sealIconColor: '#ffffff',
    textColor: '#FF85A1',
    canvasColor: '#FFF5F7'
  });

  const deferredConfig = useDeferredValue(config);
  const FONTS = ['Quicksand', 'Great Vibes', 'Dancing Script', 'Pacifico'];

  // Handle text input with proper wrapping
  const handleTitleChange = (e) => {
    const value = e.target.value;
    // Limit to 35 characters
    if (value.length <= 35) {
      setConfig({...config, title: value});
    }
  };

  const handleMessageChange = (e) => {
    const value = e.target.value;
    // Limit to 164 characters
    if (value.length <= 164) {
      setConfig({...config, message: value});
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden">
      {config.animation === 'hearts' && <HeartBg count={15} />}

      <nav className="relative z-20 flex justify-between items-center px-6 py-4 md:px-10 bg-white/40 backdrop-blur-md border-b border-[#FFD1DC]">
        <Link to="/" className="p-2 rounded-full hover:bg-white text-[#FF85A1] transition-all">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsEnveloped(true)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg ${isEnveloped ? 'bg-gray-200 text-gray-400 scale-95' : 'bg-white text-[#FF85A1] border-2 border-[#FFD1DC] hover:scale-110'}`} disabled={isEnveloped}>
            <Mail size={24} />
          </button>
          <button className="bg-[#FF85A1] text-white px-6 py-2 rounded-xl text-sm font-black flex items-center gap-2">
            <Save size={16} /> SAVE
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col lg:flex-row h-[calc(100vh-70px)]">
        <div className="w-full lg:w-[400px] bg-white/60 backdrop-blur-xl border-r border-[#FFD1DC] flex flex-col shadow-2xl overflow-hidden">
          <div className="flex border-b border-[#FFD1DC] bg-white/20">
            {[{ id: 'design', icon: <Palette size={14} />, label: 'DESIGN' }, { id: 'style', icon: <Type size={14} />, label: 'STYLE' }, { id: 'content', icon: <MessageSquare size={14} />, label: 'CONTENT' }].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 py-4 flex flex-col items-center gap-1 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'text-[#FF85A1] bg-white border-b-2 border-[#FF85A1]' : 'text-[#FFB3C6]'}`}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {activeTab === 'design' && (
              <div className="space-y-6">
                <section>
                  <label className="text-[#FFB3C6] font-black text-[10px] uppercase mb-3 block">Letter Design</label>
                  <LetterChoices selected={config.design} onSelect={(id) => setConfig({...config, design: id})} />
                </section>
                <section className="grid grid-cols-2 gap-4">
                  <div><label className="text-[#FFB3C6] font-black text-[10px] uppercase mb-2 block">Letter Color</label>
                  <input type="color" className="w-full h-10 rounded-xl cursor-pointer p-1 bg-white border-2 border-[#FFD1DC]" value={config.letterColor} onChange={(e) => setConfig({...config, letterColor: e.target.value})} /></div>
                  <div><label className="text-[#FFB3C6] font-black text-[10px] uppercase mb-2 block">Backdrop Color</label>
                  <input type="color" className="w-full h-10 rounded-xl cursor-pointer p-1 bg-white border-2 border-[#FFD1DC]" value={config.canvasColor} onChange={(e) => setConfig({...config, canvasColor: e.target.value})} /></div>
                </section>
                <section>
                  <label className="text-[#FFB3C6] font-black text-[10px] uppercase mb-3 block">Seal Icon</label>
                  <SealChoices selected={config.seal} onSelect={(id) => setConfig({...config, seal: id})} />
                </section>
                <section className="grid grid-cols-2 gap-4">
                  <div><label className="text-[#FFB3C6] font-black text-[10px] uppercase mb-2 block">Seal Icon Color</label>
                  <input type="color" className="w-full h-10 rounded-xl cursor-pointer p-1 bg-white border-2 border-[#FFD1DC]" value={config.sealIconColor} onChange={(e) => setConfig({...config, sealIconColor: e.target.value})} /></div>
                  <div><label className="text-[#FFB3C6] font-black text-[10px] uppercase mb-2 block">Seal Color</label>
                  <input type="color" className="w-full h-10 rounded-xl cursor-pointer p-1 bg-white border-2 border-[#FFD1DC]" value={config.sealColor} onChange={(e) => setConfig({...config, sealColor: e.target.value})} /></div>
                </section>
                <section><label className="text-[#FFB3C6] font-black text-[10px] uppercase mb-2 block">Envelope Color</label>
                <input type="color" className="w-full h-10 rounded-xl cursor-pointer p-1 bg-white border-2 border-[#FFD1DC]" value={config.envelopeColor} onChange={(e) => setConfig({...config, envelopeColor: e.target.value})} /></section>
              </div>
            )}

            {activeTab === 'style' && (
              <div className="space-y-6">
                <section><label className="text-[#FFB3C6] font-black text-[10px] uppercase mb-2 block">Text Font</label>
                <select className="w-full p-3 rounded-xl bg-white border-2 border-[#FFD1DC] text-[#FF85A1] font-bold" value={config.font} onChange={(e) => setConfig({...config, font: e.target.value})}>{FONTS.map(f => <option key={f} value={f}>{f}</option>)}</select></section>
                <section><label className="text-[#FFB3C6] font-black text-[10px] uppercase mb-2 block">Text Color</label>
                <input type="color" className="w-full h-10 rounded-xl cursor-pointer p-1 bg-white border-2 border-[#FFD1DC]" value={config.textColor} onChange={(e) => setConfig({...config, textColor: e.target.value})} /></section>
                <section><label className="text-[#FFB3C6] font-black text-[10px] uppercase mb-3 block">Background Animation</label>
                <AnimationChoices selected={config.animation} onSelect={(id) => setConfig({...config, animation: id})} /></section>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-6">
                <section>
                  <div className="flex justify-between items-end mb-2">
                    <label className="text-[#FFB3C6] font-black text-[10px] uppercase">Letter Title</label>
                    <span className="text-[9px] font-bold text-[#FFB3C6]">{config.title.length}/35</span>
                  </div>
                  <input
                    type="text"
                    maxLength={35}
                    className="w-full p-3 rounded-xl bg-white border-2 border-[#FFD1DC] font-bold text-[#FF85A1] placeholder:text-[#FFD1DC]"
                    placeholder="Enter title..."
                    value={config.title}
                    onChange={handleTitleChange}
                  />
                </section>
                <section>
                  <div className="flex justify-between items-end mb-2">
                    <label className="text-[#FFB3C6] font-black text-[10px] uppercase">Message</label>
                    <span className="text-[9px] font-bold text-[#FFB3C6]">{config.message.length}/164</span>
                  </div>
                  <textarea
                    maxLength={164}
                    className="w-full h-48 p-4 rounded-2xl bg-white border-2 border-[#FFD1DC] font-medium text-[#FF85A1] resize-none placeholder:text-[#FFD1DC] whitespace-pre-wrap overflow-wrap-break-word"
                    placeholder="Write your heart out..."
                    value={config.message}
                    onChange={handleMessageChange}
                    style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}
                  />
                </section>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 transition-colors duration-700" style={{ backgroundColor: config.canvasColor }}>
          <div className="relative z-10 w-full flex justify-center">
            <LetterAction config={deferredConfig} isEnveloped={isEnveloped} onOpenComplete={() => setIsEnveloped(false)} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LetterPage;