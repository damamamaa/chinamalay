import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { content } from '../content';

const Header = ({ lang, setLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const t = content[lang].nav;
  const location = useLocation();

  // Dynamic theme based on route
  const isLightPage = location.pathname.includes('/tcm') || location.pathname.includes('/about');
  const isDarkTheme = !isLightPage;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <div className="container header-container">

        {/* 1. LOGO */}
        <NavLink to="/" className="logo-link">
          {isDarkTheme ? (
            <span className="text-logo" style={{ color: 'var(--text-dark)' }}>{content[lang].tcm.brand}</span>
          ) : (
            <span className="text-logo" style={{ color: 'var(--text-dark)' }}>{content[lang].tcm.brand}</span>
          )}
        </NavLink>

        {/* 2. NAVIGATION (Always Visible) */}
        <nav className="desktop-nav">
          <NavLink to="/" end className="nav-item">{t.home}</NavLink>
          <NavLink to="/tcm" className="nav-item">{t.tcm}</NavLink>
          <NavLink to="/xinjian" className="nav-item">{t.xinjian}</NavLink>
          <NavLink to="/about" className="nav-item">{t.about}</NavLink>
          <NavLink to="/how-to-consult" className="nav-item">{t.consult}</NavLink>
          <NavLink to="/contact" className="nav-item">{t.contact}</NavLink>
        </nav>

        {/* 3. LANG SWITCHER */}
        <div className="lang-switcher">
          <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
          <span className="div">|</span>
          <button className={lang === 'ms' ? 'active' : ''} onClick={() => setLang('ms')}>MS</button>
          <span className="div">|</span>
          <button className={lang === 'zh' ? 'active' : ''} onClick={() => setLang('zh')}>中文</button>
        </div>
      </div>



      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 1.5rem 0;
          z-index: 1000;
          transition: all 0.4s ease;
        }
        
        @media (max-width: 900px) {
           /* Mobile Layout: 2 Rows */
           .header { padding: 1rem 0; background: rgba(0,0,0,0.2); backdrop-filter: blur(5px); } 
           .header.scrolled { background: rgba(255,255,255,0.95); }

           .header-container { 
               display: flex; 
               flex-wrap: wrap; 
               align-items: center; 
               justify-content: space-between;
           }
           
           /* Row 1 Left: Logo */
           .logo-link { margin-right: auto; }
           
           /* Row 1 Right: Lang */
           .lang-switcher { display: flex; }

           /* Row 2: Scrollable Nav */
           .desktop-nav {
              display: flex;
              width: 100%;
              overflow-x: auto;
              padding-bottom: 5px;
              padding-top: 10px; /* spacing from top row */
              order: 3;
              -webkit-overflow-scrolling: touch;
              gap: 1.5rem;
              border-top: 1px solid rgba(255,255,255,0.1); /* Subtle divider */
           }
           
           /* Force dark text on scroll for divider */
           .header.scrolled .desktop-nav { border-top-color: rgba(0,0,0,0.1); }

           /* Hide scrollbar */
           .desktop-nav::-webkit-scrollbar { display: none; }
           
           .nav-item {
              font-size: 0.7rem;
              letter-spacing: 0.05em;
              white-space: nowrap;
              flex-shrink: 0;
              opacity: 0.9;
           }
        }
        
        .header.light-theme {
          color: var(--text-dark);
        }

        .header.dark-theme {
          color: var(--text-dark); 
        }

        .header.scrolled {
          padding: 1rem 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 20px rgba(0,0,0,0.03);
          color: var(--text-primary); /* ALWAYS light theme on scroll for readability */
        }
        
        .header.scrolled .nav-logo.invert {
          filter: none; /* Revert invert on scroll if needed, or handle complex logic. Simplified: keep dark logo on scroll? */
          filter: invert(0); /* Assuming black logo provided, invert makes it white. On scroll white bg -> need black logo. */
        }

        /* Adjustment: Image provided was white/gold or black/gold? 
           User uploaded image not clearly defined for transparent bg. 
           Lets stick to text logic for safety or force styles. */



        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative; 
          z-index: 1002; 
          min-height: 50px;
        }


        .text-logo {
          font-family: var(--font-display);
          font-size: 1.5rem;
          letter-spacing: 0.1em;
          font-weight: 700;
          text-transform: uppercase;
          text-shadow: 0 2px 10px rgba(0,0,0,0.8);
          position: relative;
          z-index: 1003;
        }



        
        .nav-logo {
          height: 40px;
          display: block;
        }
        
        .nav-logo.invert {
           filter: invert(1);
        }
        
        .header.scrolled .nav-logo.invert {
           filter: invert(0);
        }

        .desktop-nav {
          display: flex;
          gap: 1.5rem;
        }

        .nav-item {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          position: relative;
          opacity: 0.7;
          transition: opacity 0.3s;
        }

        .nav-item.active, .nav-item:hover {
          opacity: 1;
        }
        
        .nav-item.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 1px;
          background: currentColor;
        }

        .lang-switcher {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          font-size: 0.75rem;
          font-family: var(--font-mono);
        }

        .lang-switcher button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: currentColor;
          opacity: 0.5;
        }

        .lang-switcher button.active {
          opacity: 1;
          text-decoration: underline;
        }




      `}</style>
    </header>
  );
};

export default Header;
