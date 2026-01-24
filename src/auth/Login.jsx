import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, Heart, ArrowLeft } from 'lucide-react';
import { getLoginErrors } from '../utils/validation';
import HeartBg from '../components/HeartBg';
import { loginUser } from '../repositiories/UserRepositories';
import { SignInWithGooglePopup } from "../services/Oauth.jsx";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent spam

    const valErrors = getLoginErrors(formData);
    setErrors(valErrors);

    if (Object.keys(valErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const result = await loginUser(formData);
        if (!result) throw new Error("Login failed");
        navigate('/home');
      } catch (err) {
        if(err.message.toLowerCase().includes('invalid')){
          setErrors({ server: "Invalid email or password" });
        }else{
          setErrors({ server: err.message });
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await SignInWithGooglePopup();
      if(!result) setErrors({ server: "Google sign-in failed. Try again later." });
      navigate('/home');
    } catch (error) {
      setErrors({ server: error.message }); // show friendly error
    }
  };
  return (
    <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-6 min-h-screen bg-[#FFF5F7]">
      {/* Reusable Heart Background */}
      <HeartBg count={6} />

        <div className="cute-glass p-6 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(255,182,193,0.15)] w-full max-w-md space-y-6">

        {/* Responsive Header: Return | Logo | Spacer */}
        <div className="flex items-center justify-between mb-2">
          <Link to="/" className="p-2 rounded-full bg-white/50 text-[#FF85A1] hover:bg-white transition-colors shadow-sm">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-2 pr-2">
            <Heart fill="#FF85A1" color="#FF85A1" size={24} className={isSubmitting ? "animate-ping" : "animate-pulse"} />
            <span className="text-2xl font-black text-[#FF85A1] tracking-tighter">LuvNote</span>
          </div>
          <div className="w-10"></div> {/* Hidden spacer for centering */}
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-xl md:text-2xl font-black text-[#FFB3C6]">Welcome Back!</h2>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email" placeholder="Email"
              required
              disabled={isSubmitting}
              className={`w-full p-4 rounded-xl border-2 outline-none font-bold text-[#FF85A1] bg-white/50 transition-all ${errors.username ? 'border-red-300' : 'border-[#FFD1DC] focus:border-[#FF85A1]'}`}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            {errors.username && <p className="text-[10px] text-red-400 font-bold mt-1 flex items-center gap-1 px-1"><AlertCircle size={12}/> {errors.username}</p>}
          </div>

          <div className="relative">
            <input
              required
              type={showPassword ? "text" : "password"} placeholder="Password"
              disabled={isSubmitting}
              className={`w-full p-4 rounded-xl border-2 outline-none font-bold text-[#FF85A1] bg-white/50 pr-12 transition-all ${errors.password ? 'border-red-300' : 'border-[#FFD1DC] focus:border-[#FF85A1]'}`}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <button
              type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFB3C6] hover:text-[#FF85A1]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && <p className="text-[10px] text-red-400 font-bold mt-1 flex items-center gap-1 px-1"><AlertCircle size={12}/> {errors.password}</p>}
          </div>
            {errors.server && <p className="text-[10px] text-red-400 font-bold mt-1 flex items-center gap-1 px-1"><AlertCircle size={12}/> {errors.server}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn-bubbly w-full py-4 text-white font-black text-lg rounded-xl border-none shadow-lg transition-all
              ${isSubmitting ? 'bg-gray-300 scale-95 cursor-not-allowed' : 'bg-[#FF85A1] active:scale-95'}`}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="flex items-center gap-3 py-1">
          <div className="flex-1 h-[1px] bg-[#FFD1DC]"></div>
          <span className="text-[#FFB3C6] text-[10px] font-bold">OR</span>
          <div className="flex-1 h-[1px] bg-[#FFD1DC]"></div>
        </div>

        <button onClick={handleGoogleLogin}
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl border-2 border-[#FFD1DC] bg-white text-[#FF85A1] font-bold flex items-center justify-center gap-3 text-sm shadow-sm active:scale-95 transition-all disabled:opacity-50"
        >
          <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
          Login with Google
        </button>

        <p className="text-center text-[#FFB3C6] font-bold text-xs">
          New? <Link to="/signup" className="text-[#FF85A1] underline">Create account</Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;