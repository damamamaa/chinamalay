import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import TCMHome from './pages/tcm/TCMHome';
import XJHome from './pages/xj/XJHome';
import About from './pages/About';
import Contact from './pages/Contact';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

import FloatingContact from './components/FloatingContact';

function App() {
  const [lang, setLang] = useState('en');

  return (
    <div className="app-container">
      <ScrollToTop />
      {/* Global Header always visible */}
      <Header lang={lang} setLang={setLang} />

      <main>
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/tcm" element={<TCMHome lang={lang} />} />
          <Route path="/xinjian" element={<XJHome lang={lang} />} />
          <Route path="/about" element={<About lang={lang} />} />
          <Route path="/contact" element={<Contact lang={lang} />} />
        </Routes>
      </main>

      {/* Global Footer always visible */}
      <Footer lang={lang} />

      {/* Floating Elements */}
      <FloatingContact />
    </div>
  );
}

export default App;
