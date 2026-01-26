import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PageTransition from './components/PageTransition';
import { AnimatePresence } from 'framer-motion';
//-----------------------------//
import App from './App.jsx';
import { AuthMiddleware } from './middleware/AuthMiddleware.jsx';
import ConfessionSite from './pages/ConfessionSite.jsx';
import LoginPage from './auth/Login.jsx';
import SignupPage from './auth/Signup.jsx';
import HomePage from './pages/HomePage.jsx';
import ValentinesSpecial from './pages/template/ValentinesSpecial.jsx';
import Create from './pages/Create.jsx';
import ConfessionStory from './pages/template/ConfessionSitePreview.jsx';
const RouterConfig = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/confession/:id" element={<ConfessionStory />} />
      <Route path="/valentine/:id" element={<ValentinesSpecial />} />
      <Route path="/" element={<AuthMiddleware />}>
        <Route path="" element={<App />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="confession" element={<ConfessionSite />} />
        <Route path="confession-preview" element={<ConfessionStory />} />
        <Route path="valentines" element={<ValentinesSpecial />} />
        <Route path="create" element={<Create />} />
      </Route>
    </Routes>
  );
};

export default RouterConfig;