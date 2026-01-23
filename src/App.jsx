import React from 'react';
import { LogIn, UserPlus, PenLine, Heart, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeartBg from './components/HeartBg'; // Import the new component
import './App.css';

function App() {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#FFF5F7]">
      {/* Reusable Heart Background */}
      <HeartBg count={12} />

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center px-6 py-6 md:px-10 md:py-8">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-white p-2 rounded-xl shadow-sm group-hover:rotate-12 transition-transform">
            <Heart fill="#FF85A1" color="#FF85A1" size={20} className="md:w-6 md:h-6" />
          </div>
          <Link to="/" className="text-2xl md:text-3xl font-extrabold text-[#FF85A1] tracking-tight gentle-shine">
            LuvNote
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-4 md:gap-6">
          <Link to="/login" className="text-[#FF85A1] font-bold hover:scale-105 transition-transform flex items-center gap-2">
            <LogIn size={18} /> Login
          </Link>
          <Link to="/signup" className="btn-bubbly bg-[#FF85A1] text-white font-bold py-2 px-6 rounded-xl flex items-center gap-2 border-none">
            <UserPlus size={18} /> SignUp
          </Link>
        </div>

        {/* Mobile Dropdown */}
        <div className="sm:hidden dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-[#FF85A1]">
            <Menu size={24} />
          </div>
          <ul tabIndex={0} className="dropdown-content z-[30] menu p-4 shadow-xl rounded-[2rem] w-52 mt-4 border-4 border-white bg-white/90 backdrop-blur-md space-y-2">
            <li>
              <Link to="/login" className="flex items-center gap-3 text-[#FF85A1] font-bold p-3 rounded-2xl">
                <LogIn size={18} /> Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="flex items-center gap-3 text-[#FF85A1] font-bold p-3 rounded-2xl">
                <UserPlus size={18} /> SignUp
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="cute-glass p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_60px_rgba(255,182,193,0.2)] text-center space-y-6 max-w-lg w-full">
          <header className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] shadow-lg animate-float-slow">
                <PenLine size={32} className="md:w-[50px] md:h-[50px]" color="#FF85A1" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-[#FF85A1] leading-tight">
              Write from the <span className="text-[#FFB3C6]">Heart</span>
            </h1>
            <p className="text-[#FF97B7] text-base font-medium opacity-90">
              Share your feelings in the cutest way possible.
            </p>
          </header>

          <button className="btn-bubbly w-full py-4 bg-gradient-to-r from-[#FF85A1] to-[#FFB3C6] text-white font-black text-lg rounded-xl border-none shadow-md">
              <Link to="/letter" className="w-full">Create a Letter</Link>
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;