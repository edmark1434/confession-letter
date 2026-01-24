import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import ConfessionSite from './pages/ConfessionSite.jsx';
import LoginPage from './auth/Login.jsx';
import SignupPage from './auth/Signup.jsx';
import HomePage from './pages/home.jsx';
import ValentinesSpecial from './pages/ValentinesSpecial.jsx';
import ConfessionForm from './pages/ConfessionForm.jsx';
const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/confession" element={<ConfessionSite />} />
      <Route path="/valentines" element={<ValentinesSpecial />} />
      <Route path="/confession-form" element={<ConfessionForm />} />
    </Routes>
  );
};

export default RouterConfig;