import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PageTransition from './components/PageTransition';
import { AnimatePresence } from 'framer-motion';
//-----------------------------//
import App from './App.jsx';
import ConfessionSite from './pages/ConfessionSite.jsx';
import LoginPage from './auth/Login.jsx';
import SignupPage from './auth/Signup.jsx';
<<<<<<< HEAD
import LetterPage from './pages/letter.jsx';

=======
import HomePage from './pages/home.jsx';
import ValentinesSpecial from './pages/ValentinesSpecial.jsx';
import ConfessionForm from './pages/ConfessionForm.jsx';
>>>>>>> e684f974ad3081ab9b6bef9b0a23f4c6fea3cd8d
const RouterConfig = () => {
  const location = useLocation();

  return (
<<<<<<< HEAD
    /* AnimatePresence allows components to animate out when removed from the DOM */
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><App /></PageTransition>}/>
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>}/>
        <Route path="/signup" element={<PageTransition><SignupPage /></PageTransition>}/>
        <Route path="/letter" element={<PageTransition><LetterPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
=======
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/confession" element={<ConfessionSite />} />
      <Route path="/valentines" element={<ValentinesSpecial />} />
      <Route path="/confession-form" element={<ConfessionForm />} />
    </Routes>
>>>>>>> e684f974ad3081ab9b6bef9b0a23f4c6fea3cd8d
  );
};

export default RouterConfig;