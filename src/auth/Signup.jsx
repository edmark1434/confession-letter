import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 6) {
      errors.push('At least 6 characters');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('At least 1 capital letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('At least 1 number');
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      errors.push('At least 1 special character');
    }

    return errors;
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordErrors = validatePassword(formData.password);
      if (passwordErrors.length > 0) {
        newErrors.password = passwordErrors.join(', ');
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const getPasswordValidation = () => {
    if (!formData.password) return null;

    const checks = [
      { label: 'At least 6 characters', valid: formData.password.length >= 6 },
      { label: 'At least 1 capital letter', valid: /[A-Z]/.test(formData.password) },
      { label: 'At least 1 number', valid: /[0-9]/.test(formData.password) },
      { label: 'At least 1 special character', valid: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password) }
    ];

    return checks;
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

      // Handle successful signup
      console.log('Signup successful:', formData);
      alert('Account created successfully!');

      // Reset form
      setFormData({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ submit: 'Signup failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordChecks = getPasswordValidation();

  return (
    <main className="relative z-10 flex-1 flex items-center justify-center px-6 min-h-[80vh]">
      <div className="cute-glass p-10 rounded-[3rem] shadow-[0_30px_100px_rgba(255,182,193,0.2)] w-full max-w-md space-y-6">
        <div className="form-header-left">
          <Link to="/" className="back-button-circle-left">
            <span className="arrow-bounce-left">←</span>
          </Link>
          <div className="form-header-content">
            <h2 className="text-4xl font-black text-[#FF85A1]">Join LuvNote</h2>
            <p className="text-[#FFB3C6] font-bold mt-2">Start your digital love story</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-4 rounded-2xl border-2 focus:border-[#FF85A1] outline-none transition-colors font-bold text-[#FF85A1] placeholder:text-[#FFD1DC] bg-white/50 ${
                errors.email ? 'border-[#FF6B8E]' : 'border-[#FFD1DC]'
              } ${formData.email && !errors.email && validateEmail(formData.email) ? 'border-[#8AFFB3]' : ''}`}
            />
            {errors.email && (
              <div className="error-message">
                <AlertCircle size={14} />
                {errors.email}
              </div>
            )}
          </div>

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
              } ${formData.username && !errors.username && formData.username.length >= 3 ? 'border-[#8AFFB3]' : ''}`}
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

          {/* Confirm Password Field */}
          <div className="password-input-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full p-4 rounded-2xl border-2 focus:border-[#FF85A1] outline-none transition-colors font-bold text-[#FF85A1] placeholder:text-[#FFD1DC] bg-white/50 pr-12 ${
                errors.confirmPassword ? 'border-[#FF6B8E]' : 'border-[#FFD1DC]'
              } ${formData.confirmPassword && !errors.confirmPassword && formData.password === formData.confirmPassword ? 'border-[#8AFFB3]' : ''}`}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              tabIndex="-1"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.confirmPassword && (
              <div className="error-message">
                <AlertCircle size={14} />
                {errors.confirmPassword}
              </div>
            )}
          </div>

          {/* Password Requirements Checklist - Now placed here */}
          {formData.password && passwordChecks && (
            <div className="mt-2 p-4 rounded-2xl bg-white/30 border-2 border-[#FFD1DC]">
              <p className="text-[#FF85A1] font-bold text-sm mb-2">Password Requirements:</p>
              <div className="space-y-2">
                {passwordChecks.map((check, index) => (
                  <div key={index} className={`flex items-center gap-3 ${
                    check.valid ? 'text-[#8AFFB3]' : 'text-[#FFB3C6]'
                  }`}>
                    <div className={`flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full ${
                      check.valid ? 'bg-[#8AFFB3]/20' : 'bg-[#FFB3C6]/20'
                    }`}>
                      {check.valid ? (
                        <CheckCircle size={14} className="text-[#8AFFB3]" />
                      ) : (
                        <AlertCircle size={14} className="text-[#FFB3C6]" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{check.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {errors.submit && (
            <div className="error-message text-center">
              <AlertCircle size={16} />
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            className={`btn-bubbly w-full py-4 bg-gradient-to-r from-[#FF85A1] to-[#FFB3C6] text-white font-black text-xl rounded-2xl shadow-lg border-none flex items-center justify-center gap-2 ${
              isSubmitting ? 'btn-loading' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="loading-spinner"></div>
                Creating Account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <p className="text-center text-[#FFB3C6] font-bold text-sm">
          Already have an account? <Link to="/login" className="text-[#FF85A1] underline hover:text-[#FF6B8E] transition-colors">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default SignupPage;