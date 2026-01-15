import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { content } from '../content';

const Home = ({ lang }) => {
  const t = content[lang].hero;

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <div className="immersive-home">

      {/* 1. CINEMATIC BACKGROUND HERO */}
      <section ref={targetRef} className="hero-section">
        <motion.div style={{ opacity, scale, y }} className="hero-bg-layer" />
        <div className="hero-overlay-grad" />

        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hero-badge"
          >
            Live true care
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hero-title"
          >
            {t.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hero-desc"
          >
            {t.subtitle}
          </motion.p>
        </div>

        <div className="scroll-hint">
          <span>{t.explore}</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* 2. DUAL PATHWAYS - WIDE CARDS */}
      <section className="pathways-section">
        <div className="pathway-container">


          <NavLink to="/tcm" className="pathway-card tcm-card">
            <div className="pathway-bg" style={{ backgroundImage: "url('/tcm-artistic-rusheng.webp')" }}></div>
            <div className="pathway-content">
              <span className="pathway-label">{t.path_clinic}</span>
              <h2 className="pathway-title">{content[lang].hero.section_tcm.title}</h2>
              <p className="pathway-desc">{content[lang].hero.section_tcm.desc}</p>
              <span className="btn-explore">{t.btn_clinic} &rarr;</span>
            </div>
          </NavLink>


          <NavLink to="/xinjian" className="pathway-card xj-card">
            <div className="pathway-bg" style={{ backgroundImage: "url('/xj_compass_rusheng.webp')" }}></div>
            <div className="pathway-content">
              <span className="pathway-label">{t.path_destiny}</span>
              <h2 className="pathway-title">{content[lang].hero.section_xj.title}</h2>
              <p className="pathway-desc">{content[lang].hero.section_xj.desc}</p>
              <span className="btn-explore gold-accent">{t.btn_destiny} &rarr;</span>
            </div>
          </NavLink>

        </div>
      </section>


      <section className="statement-section" style={{ backgroundImage: "url('/profile-artistic.webp')", backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
        <div className="overlay-dark">
          <div className="container">
            <div className="statement-box">
              <h2 className="display-3 text-gradient">{content[lang].about.role}</h2>
              <p className="statement-text">
                "{content[lang].about.description}"
              </p>
              <div className="statement-sig">
                Rusheng
              </div>
              <NavLink to="/about" className="btn-statement">{t.read_profile}</NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLINICAL HIGHLIGHTS (TCM) */}
      <section className="h-section bg-light">
        <div className="container">
          <h3 className="section-label dark-label">{t.clinical_highlights}</h3>
          <div className="h-grid">
            {content[lang].tcm.services.slice(0, 3).map((s, i) => (
              <div key={i} className="h-card fade-in-scroll">
                <span className="h-num">0{i + 1}</span>
                <h4>{s.name}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DESTINY HIGHLIGHTS (XJ) */}
      <section className="h-section bg-dark">
        <div className="container">
          <h3 className="section-label light-label">{t.destiny_guidance}</h3>
          <div className="h-grid">
            {content[lang].fengshui.services.slice(0, 3).map((s, i) => (
              <div key={i} className="h-card dark-card fade-in-scroll">
                <span className="h-num text-gold">0{i + 1}</span>
                <h4 className="text-gold">{s.name}</h4>
                <p className="text-dim">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .immersive-home {
           background-color: var(--bg-color);
           color: var(--text-main);
        }

        .hero-section {
          height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .hero-bg-layer {
          position: absolute;
          inset: 0;

          background-image: url('/hero-split.webp');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 0;
        }

        .hero-overlay-grad {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(14,13,12,0.8) 100%);
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 900px;
          padding: 0 2rem;
        }

        .hero-badge {
           font-family: var(--font-mono);
           font-size: 0.8rem;
           letter-spacing: 0.3em;
           color: rgba(255,255,255,0.7);
           margin-bottom: 2rem;
           border: 1px solid rgba(255,255,255,0.2);
           display: inline-block;
           padding: 0.5rem 1rem;
           backdrop-filter: blur(10px);
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(3.5rem, 6vw, 6rem);
          line-height: 1.1;
          margin-bottom: 2rem;
          color: white;
          text-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .hero-desc {
          font-size: 1.25rem;
          color: rgba(255,255,255,0.9);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .scroll-hint {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.5);
        }

        .scroll-line {
          width: 1px;
          height: 60px;
          background: rgba(255,255,255,0.3);
        }

        /* PATHWAYS */
        .pathways-section {
          position: relative;
          z-index: 5;
          margin-top: -5vh; 
        }

        .pathway-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 80vh;
        }

        .pathway-card {
           position: relative;
           display: flex;
           align-items: center;
           justify-content: center;
           text-align: center;
           overflow: hidden;
           color: white;
           transition: flex 0.5s ease;
           border-right: 1px solid rgba(255,255,255,0.1);
        }

        .pathway-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.8s ease;
          z-index: 0;
          opacity: 1; /* Was 0.6, now full opacity but handled by brightness filter below */
          filter: brightness(0.4) grayscale(0.1); /* Significantly darker for contrast */
        }

        .pathway-card:hover .pathway-bg {
          transform: scale(1.1);
          filter: brightness(0.5) grayscale(0); /* Lighten slightly on hover but keep contrast */
        }

        .pathway-content {
          position: relative;
          z-index: 10;
          padding: 2rem;
          transition: transform 0.5s ease;
          text-shadow: 0 4px 15px rgba(0,0,0,0.9); /* Strong shadow */
        }
        
        .pathway-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.9rem;
          letter-spacing: 0.2em;
          margin-bottom: 2rem;
          font-weight: 600;
          opacity: 0.9;
        }

        .pathway-title {
          font-family: var(--font-display);
          font-size: 3.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .pathway-desc {
          max-width: 400px;
          margin: 0 auto 3rem;
          opacity: 1;
          font-size: 1.2rem;
          font-weight: 500;
          line-height: 1.6;
        }

        .btn-explore {
           display: inline-block;
           padding: 1rem 2rem;
           border: 1px solid rgba(255,255,255,0.3);
           text-transform: uppercase;
           letter-spacing: 0.15em;
           font-size: 0.8rem;
           transition: all 0.3s;
        }

        .pathway-card:hover .btn-explore {
          background: white;
          color: black;
          border-color: white;
        }
        
        .gold-accent:hover {
           background: var(--xj-gold) !important;
           border-color: var(--xj-gold) !important;
        }

        /* STATEMENT */
        .statement-section {
          padding: 10rem 0;
          position: relative;
        }
        
        .overlay-dark {
          background: rgba(0,0,0,0.8);
          padding: 5rem 0;
          backdrop-filter: blur(5px);
        }

        .statement-box {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .display-3 { font-size: 3rem; margin-bottom: 3rem; }
        
        .text-gradient {
          background: linear-gradient(to right, #fff, #888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .statement-text {
          font-family: var(--font-display);
          font-size: 2rem;
          line-height: 1.5;
          color: rgba(255,255,255,0.9);
          margin-bottom: 3rem;
        }

        .statement-sig {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 1.5rem;
          color: var(--tcm-light);
          margin-bottom: 3rem;
        }

        .btn-statement {
           color: #888;
           text-transform: uppercase;
           letter-spacing: 0.1em;
           font-size: 0.8rem;
           border-bottom: 1px solid #333;
           padding-bottom: 2px;
           transition: color 0.3s;
        }
        .btn-statement:hover { color: white; border-color: white; }
        
        /* HIGHLIGHT SECTIONS */
        .h-section { padding: 6rem 0; }
        .bg-light { background: #EFEFEF; color: #1a1a1a; }
        .bg-dark { background: #111; color: #fff; }

        .section-label {
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 3rem;
          display: block;
          opacity: 0.5;
        }
        
        .dark-label { border-left: 3px solid var(--tcm-primary); padding-left: 1rem; color: var(--tcm-primary); }
        .light-label { border-left: 3px solid var(--xj-gold); padding-left: 1rem; color: var(--xj-gold); }

        .h-grid {
           display: grid;
           grid-template-columns: repeat(3, 1fr);
           gap: 2rem;
        }

        .h-card {
           padding: 2rem;
           border: 1px solid rgba(0,0,0,0.1);
           transition: transform 0.3s;
        }
        .h-card:hover { transform: translateY(-5px); }
        
        .dark-card { border-color: rgba(255,255,255,0.1); }
        
        .h-num {
           display: block;
           font-family: var(--font-mono);
           font-size: 0.8rem;
           opacity: 0.5;
           margin-bottom: 1rem;
        }
        
        .h-card h4 {
           font-family: var(--font-display);
           font-size: 1.5rem;
           margin-bottom: 1rem;
        }
        
        .text-gold { color: var(--xj-gold); }
        .text-dim { color: rgba(255,255,255,0.6); }

        @media (max-width: 900px) {
           .pathway-container { grid-template-columns: 1fr; height: auto; }
           .pathway-card { height: 60vh; }
           .hero-title { font-size: 3.5rem; }
           .h-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Home;
