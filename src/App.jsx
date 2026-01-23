import React from 'react';
import { LogIn, UserPlus, PenLine, Heart } from 'lucide-react';
import './App.css';

function App() {
  return (
    <div className="relative h-screen w-screen overflow-hidden flex flex-col bg-[#FFF5F7]">
      {/* Top Navigation Bar */}
      <nav className="relative z-20 flex justify-between items-center px-10 py-8">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-white p-2 rounded-2xl shadow-sm group-hover:rotate-12 transition-transform">
            <Heart fill="#FF85A1" color="#FF85A1" size={24} />
          </div>
          <span className="text-3xl font-extrabold text-[#FF85A1] tracking-tight gentle-shine">LuvNote</span>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-[#FF85A1] font-bold hover:scale-110 transition-transform cursor-pointer text-lg flex items-center gap-2">
            <LogIn size={20} /> Login
          </button>

          {/* New Bubbly SignUp Button */}
          <button className="btn-bubbly bg-[#FF85A1] text-white font-bold py-3 px-8 rounded-2xl flex items-center gap-2 cursor-pointer border-none">
            <UserPlus size={20} strokeWidth={2.5} />
            SignUp
          </button>
        </div>
      </nav>

      {/* Animated Heart Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ul className="hearts">
          {[...Array(12)].map((_, i) => (
            <li key={i} style={{
              left: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}></li>
          ))}
        </ul>
      </div>

      {/* Main Content Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="cute-glass p-12 rounded-[3.5rem] shadow-[0_30px_100px_rgba(255,182,193,0.3)] text-center space-y-10 max-w-lg w-full">
          <header className="space-y-6">
            <div className="flex justify-center">
              <div className="relative animate-float-slow">
                 <div className="absolute inset-0 bg-[#FFB3C6] blur-3xl opacity-40"></div>
                 <div className="relative bg-white p-6 rounded-[2.5rem] shadow-xl">
                    <PenLine size={60} color="#FF85A1" strokeWidth={1.5} />
                 </div>
              </div>
            </div>
            <div>
              <h1 className="text-6xl font-black tracking-tighter text-[#FF85A1] leading-tight mb-2">
                Write from the <span className="text-[#FFB3C6]">Heart</span>
              </h1>
              <p className="text-[#FF97B7] text-xl font-medium opacity-90">
                Share your feelings in the cutest way possible.
              </p>
            </div>
          </header>

          <div>
            {/* Improved Main CTA Button */}
            <button className="btn-bubbly w-full h-20 bg-gradient-to-r from-[#FF85A1] to-[#FFB3C6] text-white font-black text-2xl rounded-3xl shadow-[0_10px_25px_rgba(255,133,161,0.3)] flex items-center justify-center gap-3 cursor-pointer border-none">
              <PenLine size={28} strokeWidth={3} />
              Create a Letter
            </button>
          </div>

          <footer className="text-xs uppercase tracking-[0.5em] text-[#FFB3C6] font-bold">
            💖 Spread the Love 💖
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;