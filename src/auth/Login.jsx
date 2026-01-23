import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => (
  <main className="relative z-10 flex-1 flex items-center justify-center px-6 min-h-[80vh]">
    <div className="cute-glass p-10 rounded-[3rem] shadow-[0_30px_100px_rgba(255,182,193,0.2)] w-full max-w-md space-y-8">
      <div className="text-center">
        <Link to="/" className="inline-block mb-4 text-[#FF85A1] hover:underline font-bold text-sm">
          ← Back to Home
        </Link>
        <h2 className="text-4xl font-black text-[#FF85A1]">Welcome Back!</h2>
        <p className="text-[#FFB3C6] font-bold mt-2">Log in to your love notes</p>
      </div>
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
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
        <button type="submit" className="btn-bubbly w-full py-4 bg-[#FF85A1] text-white font-black text-xl rounded-2xl shadow-lg border-none">
          Login
        </button>
      </form>
      <p className="text-center text-[#FFB3C6] font-bold text-sm">
        New here? <Link to="/signup" className="text-[#FF85A1] underline">Create an account</Link>
      </p>
    </div>
  </main>
);

export default LoginPage;