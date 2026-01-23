import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, Heart, ArrowLeft } from 'lucide-react';
import { getSignupErrors } from '../utils/validation';
import HeartBg from '../components/HeartBg';

const SignupPage = () => {
  const [formData, setFormData] = useState({ email: '', username: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const valErrors = getSignupErrors(formData);
    setErrors(valErrors);

    if (Object.keys(valErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await new Promise(r => setTimeout(r, 2000));
        alert("Account Created!");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 min-h-screen bg-[#FFF5F7]">
      {/* Reusable Heart Background */}
      <HeartBg count={6} />

        <div className="cute-glass p-6 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(255,182,193,0.15)] w-full max-w-md space-y-4">

        {/* Responsive Header: Return | Logo | Spacer */}
        <div className="flex items-center justify-between mb-2">
          <Link to="/" className="p-2 rounded-full bg-white/50 text-[#FF85A1] hover:bg-white transition-colors shadow-sm">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex items-center gap-2 pr-2">
            <Heart fill="#FF85A1" color="#FF85A1" size={22} className={isSubmitting ? "animate-spin" : ""} />
            <span className="text-xl font-black text-[#FF85A1] tracking-tighter">LuvNote</span>
          </div>
          <div className="w-9"></div>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <input
              type="email" placeholder="Email Address" disabled={isSubmitting}
              className={`w-full p-3.5 rounded-xl border-2 outline-none font-bold text-[#FF85A1] bg-white/50 focus:border-[#FF85A1] ${errors.email ? 'border-red-300' : 'border-[#FFD1DC]'}`}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            {errors.email && <p className="text-[10px] text-red-400 font-bold px-1 mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.email}</p>}
          </div>

          <div>
            <input
              type="text" placeholder="Username" disabled={isSubmitting}
              className={`w-full p-3.5 rounded-xl border-2 outline-none font-bold text-[#FF85A1] bg-white/50 focus:border-[#FF85A1] ${errors.username ? 'border-red-300' : 'border-[#FFD1DC]'}`}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
            {errors.username && <p className="text-[10px] text-red-400 font-bold px-1 mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.username}</p>}
          </div>

          <div className="relative">
            <input
              type={showPass ? "text" : "password"} placeholder="Password" disabled={isSubmitting}
              className={`w-full p-3.5 rounded-xl border-2 outline-none font-bold text-[#FF85A1] bg-white/50 pr-12 focus:border-[#FF85A1] ${errors.password ? 'border-red-300' : 'border-[#FFD1DC]'}`}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFB3C6]" onClick={() => setShowPass(!showPass)}>
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-[10px] text-red-400 font-bold leading-tight px-1"><AlertCircle size={10} className="inline mr-1"/>{errors.password}</p>}

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"} placeholder="Confirm Password" disabled={isSubmitting}
              className={`w-full p-3.5 rounded-xl border-2 outline-none font-bold text-[#FF85A1] bg-white/50 pr-12 focus:border-[#FF85A1] ${errors.confirmPassword ? 'border-red-300' : 'border-[#FFD1DC]'}`}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFB3C6]" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-[10px] text-red-400 font-bold px-1 mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.confirmPassword}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn-bubbly w-full py-4 text-white font-black text-lg rounded-xl border-none shadow-lg mt-2 transition-all
              ${isSubmitting ? 'bg-gray-300 opacity-70 cursor-not-allowed' : 'bg-gradient-to-r from-[#FF85A1] to-[#FFB3C6] active:scale-95'}`}
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="flex items-center gap-3 pt-2">
          <div className="flex-1 h-[1px] bg-[#FFD1DC]"></div>
          <span className="text-[#FFB3C6] text-[10px] font-bold uppercase">Or join with</span>
          <div className="flex-1 h-[1px] bg-[#FFD1DC]"></div>
        </div>

        <button
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl border-2 border-[#FFD1DC] bg-white text-[#FF85A1] font-bold flex items-center justify-center gap-3 text-sm shadow-sm active:scale-95 transition-all disabled:opacity-50"
        >
          <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="Google" />
          Sign up with Google
        </button>

        <p className="text-center text-[#FFB3C6] font-bold text-xs pt-2">
          Joined already? <Link to="/login" className="text-[#FF85A1] underline">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default SignupPage;