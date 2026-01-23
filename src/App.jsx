import React from 'react';
import './App.css';

function App() {
  return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center bg-[#FFF5F7]">
      {/* Animated Heart Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <ul className="hearts">
          {[...Array(15)].map((_, i) => <li key={i}></li>)}
        </ul>
      </div>

      {/* Content Layer */}
      <main className="relative z-10 w-full max-w-md px-6">
        <div className="cute-glass p-10 rounded-[2.5rem] border border-white/60 shadow-[0_20px_50px_rgba(255,182,193,0.3)] text-center space-y-8">
          <header className="space-y-2">
            <div className="flex justify-center mb-2 text-pink-400 text-3xl">
              <span>💖</span>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tighter text-[#FF85A1]">
              Luv<span className="text-[#FFB3C6]">Note</span>
            </h1>
            <p className="text-[#FF97B7] font-medium italic">Share your feelings, beautifully.</p>
          </header>

          <div className="flex flex-col gap-4">
            <button className="btn bg-[#FF85A1] hover:bg-[#FF6B8E] border-none text-white btn-lg shadow-md hover:scale-105 transition-transform rounded-2xl font-bold">
              Create a Letter
            </button>

            <div className="flex gap-4">
              <button className="btn btn-outline flex-1 text-[#FF85A1] border-[#FFB3C6] hover:bg-[#FFF0F3] hover:border-[#FF85A1] rounded-2xl">
                Login
              </button>
              <button className="btn btn-outline flex-1 text-[#FF85A1] border-[#FFB3C6] hover:bg-[#FFF0F3] hover:border-[#FF85A1] rounded-2xl">
                SignUp
              </button>
            </div>
          </div>

          <footer className="text-[10px] uppercase tracking-widest text-[#FFB3C6] pt-4">
            — Send a little love —
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;