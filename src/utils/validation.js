// src/utils/validation.js

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUsername = (username) => {
  return username.trim().length >= 3;
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const getLoginErrors = (formData) => {
  const errors = {};
  if (!formData.username.trim()) errors.username = "Username is required";
  if (!validatePassword(formData.password)) errors.password = "Password must be at least 6 characters";
  return errors;
};

export const getSignupErrors = (formData) => {
  const errors = {};
  if (!validateEmail(formData.email)) errors.email = "Please enter a valid email";
  if (!validateUsername(formData.username)) errors.username = "Username must be at least 3 characters";
  if (!validatePassword(formData.password)) errors.password = "Password must be at least 6 characters";
  if (!validateConfirmPassword(formData.password, formData.confirmPassword)) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
};