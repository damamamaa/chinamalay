import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import TCMHome from './pages/tcm/TCMHome';
import XJHome from './pages/xj/XJHome';
import About from './pages/About';
import Contact from './pages/Contact';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import AdminLogin from './pages/admin/AdminLogin';
import AdminArticles from './pages/admin/AdminArticles';
import AdminArticleForm from './pages/admin/AdminArticleForm';

import HowToConsult from './pages/HowToConsult';
import ServiceEntry from './pages/ServiceEntry';

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
  const { pathname } = useLocation();

  return (
    <div className="app-container">
      <ScrollToTop />
      {/* Conditionally render Header - Hidden on Admin Pages AND Article Detail Pages */}
      {!pathname.startsWith('/admin') && !pathname.match(/^\/articles\/.+/) && (
        <Header lang={lang} setLang={setLang} />
      )}

      <main>
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/tcm" element={<TCMHome lang={lang} />} />
          <Route path="/xinjian" element={<XJHome lang={lang} />} />
          <Route path="/about" element={<About lang={lang} />} />
          <Route path="/service-entry" element={<ServiceEntry lang={lang} />} />
          <Route path="/how-to-consult" element={<HowToConsult lang={lang} />} />
          <Route path="/contact" element={<Contact lang={lang} />} />
          <Route path="/articles" element={<Articles lang={lang} />} />
          <Route path="/articles/:slug" element={<ArticleDetail lang={lang} />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/articles" element={<AdminArticles />} />
          <Route path="/admin/articles/new" element={<AdminArticleForm />} />
          <Route path="/admin/articles/:id/edit" element={<AdminArticleForm />} />
        </Routes>
      </main>

      {/* Conditionally render Footer and FloatingContact - Hidden on Admin Pages AND Article Detail Pages */}
      {!pathname.startsWith('/admin') && !pathname.match(/^\/articles\/.+/) && (
        <>
          <Footer lang={lang} />
          <FloatingContact lang={lang} />
        </>
      )}
    </div>
  );
}

export default App;
