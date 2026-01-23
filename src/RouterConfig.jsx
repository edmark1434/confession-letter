import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PageTransition from './components/PageTransition';
import { AnimatePresence } from 'framer-motion';
//-----------------------------//
import App from './App.jsx';
import LoginPage from './auth/Login.jsx';
import SignupPage from './auth/Signup.jsx';
import LetterPage from './pages/letter.jsx';

const RouterConfig = () => {
  const location = useLocation();

  return (
    /* AnimatePresence allows components to animate out when removed from the DOM */
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><App /></PageTransition>}/>
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>}/>
        <Route path="/signup" element={<PageTransition><SignupPage /></PageTransition>}/>
        <Route path="/letter" element={<PageTransition><LetterPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default RouterConfig;