import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import LoginPage from './auth/Login.jsx';
import SignupPage from './auth/Signup.jsx';

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default RouterConfig;