import React from 'react';
import { LogIn, UserPlus, PenLine } from 'lucide-react';
import './App.css';

function App() {
  return (
    <div className="relative h-screen w-screen overflow-hidden flex flex-col bg-[#FFF5F7]">
      {/* Top Navigation Bar */}
      <nav className="relative z-20 flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-2 group cursor-pointer">
          <img
            src="/logo.svg"
            alt="LuvNote Logo"
            className="w-9 h-9 drop-shadow-sm group-hover:rotate-12 transition-transform duration-300"
          />
          <span className="text-2xl font-black text-[#FF85A1] tracking-tighter gentle-shine">LuvNote</span>
        </div>

        <div className="flex items-center gap-6">
          {/* Login - No black text/icons */}
          <button className="flex items-center gap-2 text-[#FF85A1] font-bold hover:text-[#FF6B8E] transition-all cursor-pointer gentle-shine text-lg">
            <LogIn size={20} strokeWidth={2.5} />
            Login
          </button>

          {/* SignUp - Fixed color to soft pink (No Black) */}
          <button className="flex items-center gap-2 bg-[#FFB3C6] text-white font-bold py-2.5 px-7 rounded-full shadow-[0_4px_15px_rgba(255,179,198,0.5)] hover:bg-[#FF85A1] hover:scale-105 active:scale-95 transition-all cursor-pointer">
            <UserPlus size={20} strokeWidth={2.5} />
            SignUp
          </button>
        </div>
      </nav>

      {/* Animated Heart Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <ul className="hearts">
          {[...Array(15)].map((_, i) => <li key={i}></li>)}
        </ul>
      </div>

      {/* Content Layer */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="cute-glass p-12 rounded-[4rem] border border-white/80 shadow-[0_20px_60px_rgba(255,182,193,0.2)] text-center space-y-10 max-w-lg w-full">
          <header className="space-y-6">
            <div className="flex justify-center">
              <div className="relative animate-float">
                 <div className="absolute inset-0 bg-[#FFB3C6] blur-3xl opacity-30"></div>
                 <img src="/logo.svg" alt="Icon" className="relative w-28 h-28 drop-shadow-md" />
              </div>
            </div>
            <div>
              <h1 className="text-7xl font-black tracking-tighter text-[#FF85A1] gentle-shine cursor-default pb-2 leading-tight">
                LuvNote
              </h1>
              <p className="text-[#FF97B7] text-lg font-semibold mt-2 tracking-wide opacity-90">
                Capture your heart in a digital letter.
              </p>
            </div>
          </header>

          <div className="pt-2">
            {/* Create a Letter - Gradient Bubbly Button */}
            <button className="w-full h-18 bg-gradient-to-r from-[#FF85A1] to-[#FFB3C6] text-white font-black text-xl rounded-[2rem] shadow-[0_10px_25px_rgba(255,133,161,0.3)] hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer border-none">
              <PenLine size={24} strokeWidth={3} />
              Create a Letter
            </button>
          </div>

          <footer className="text-[11px] uppercase tracking-[0.4em] text-[#FFB3C6] font-bold">
            — Digital Love Notes —
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;