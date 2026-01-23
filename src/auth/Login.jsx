import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Prevent multiple submissions
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Handle successful login
      console.log('Login successful:', formData);
      alert('Login successful!');

      // Reset form
      setFormData({ username: '', password: '' });
      setErrors({});
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative z-10 flex-1 flex items-center justify-center px-6 min-h-[80vh]">
      <div className="cute-glass p-10 rounded-[3rem] shadow-[0_30px_100px_rgba(255,182,193,0.2)] w-full max-w-md space-y-8">
        <div className="form-header-left">
          <Link to="/" className="back-button-circle-left">
            <span className="arrow-bounce-left">←</span>
          </Link>
          <div className="form-header-content">
            <h2 className="text-4xl font-black text-[#FF85A1]">Welcome Back!</h2>
            <p className="text-[#FFB3C6] font-bold mt-2">Log in to your love notes</p>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full p-4 rounded-2xl border-2 focus:border-[#FF85A1] outline-none transition-colors font-bold text-[#FF85A1] placeholder:text-[#FFD1DC] bg-white/50 ${
                errors.username ? 'border-[#FF6B8E]' : 'border-[#FFD1DC]'
              }`}
            />
            {errors.username && (
              <div className="error-message">
                <AlertCircle size={14} />
                {errors.username}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-4 rounded-2xl border-2 focus:border-[#FF85A1] outline-none transition-colors font-bold text-[#FF85A1] placeholder:text-[#FFD1DC] bg-white/50 pr-12 ${
                errors.password ? 'border-[#FF6B8E]' : 'border-[#FFD1DC]'
              }`}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex="-1"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <div className="error-message">
                <AlertCircle size={14} />
                {errors.password}
              </div>
            )}
          </div>

          {errors.submit && (
            <div className="error-message text-center">
              <AlertCircle size={16} />
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            className={`btn-bubbly w-full py-4 bg-[#FF85A1] text-white font-black text-xl rounded-2xl shadow-lg border-none flex items-center justify-center gap-2 ${
              isSubmitting ? 'btn-loading' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="loading-spinner"></div>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="text-center text-[#FFB3C6] font-bold text-sm">
          New here? <Link to="/signup" className="text-[#FF85A1] underline hover:text-[#FF6B8E] transition-colors">Create an account</Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;