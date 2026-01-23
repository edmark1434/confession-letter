import React from 'react';
import { Link } from 'react-router-dom';

const SignupPage = () => (
  <main className="relative z-10 flex-1 flex items-center justify-center px-6 min-h-[80vh]">
    <div className="cute-glass p-10 rounded-[3rem] shadow-[0_30px_100px_rgba(255,182,193,0.2)] w-full max-w-md space-y-6">
      <div className="text-center">
        <Link to="/" className="inline-block mb-4 text-[#FF85A1] hover:underline font-bold text-sm">
          ← Back to Home
        </Link>
        <h2 className="text-4xl font-black text-[#FF85A1]">Join LuvNote</h2>
        <p className="text-[#FFB3C6] font-bold mt-2">Start your digital love story</p>
      </div>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-4 rounded-2xl border-2 border-[#FFD1DC] focus:border-[#FF85A1] outline-none transition-colors font-bold text-[#FF85A1] placeholder:text-[#FFD1DC] bg-white/50"
        />
        <input
          type="text"
          placeholder="Username"
          className="w-full p-4 rounded-2xl border-2 border-[#FFD1DC] focus:border-[#FF85A1] outline-none transition-colors font-bold text-[#FF85A1] placeholder:text-[#FFD1DC] bg-white/50"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-2xl border-2 border-[#FFD1DC] focus:border-[#FF85A1] outline-none transition-colors font-bold text-[#FF85A1] placeholder:text-[#FFD1DC] bg-white/50"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-4 rounded-2xl border-2 border-[#FFD1DC] focus:border-[#FF85A1] outline-none transition-colors font-bold text-[#FF85A1] placeholder:text-[#FFD1DC] bg-white/50"
        />
        <button type="submit" className="btn-bubbly w-full py-4 bg-gradient-to-r from-[#FF85A1] to-[#FFB3C6] text-white font-black text-xl rounded-2xl shadow-lg border-none">
          Sign Up
        </button>
      </form>
      <p className="text-center text-[#FFB3C6] font-bold text-sm">
        Already have an account? <Link to="/login" className="text-[#FF85A1] underline">Login</Link>
      </p>
    </div>
  </main>
);

export default SignupPage;