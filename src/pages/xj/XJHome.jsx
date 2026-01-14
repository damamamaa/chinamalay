import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { content } from '../../content';

const XJHome = ({ lang }) => {
  const t = content[lang].fengshui;

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="xj-page-rich">

      {/* 1. HERO SECTION */}
      <section ref={targetRef} className="xj-hero">
        <motion.div style={{ y, opacity }} className="xj-hero-bg" />
        <div className="xj-hero-overlay" />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="xj-hero-content"
          >

            <img src="/xinjian-brand.webp" alt="Xin Jian" className="hero-brand-img invert" />
            <h1 className="display-1 text-gold">{t.brand}</h1>
            <p className="xj-lead">{t.description}</p>
          </motion.div>
        </div>
      </section>

      {/* 2. PHILOSOPHY SECTION (NEW) */}
      <section className="xj-philosophy section-padding">
        <div className="container">
          <div className="philo-box">
            <div className="philo-content">
              <h2 className="display-3 text-gold">{t.philosophy.title}</h2>
              <p className="philo-text">{t.philosophy.text}</p>
            </div>

            <div className="philo-visual">
              <img src="/xj-map.webp" alt="Celestial Map" className="philo-img" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. DETAILED SERVICES */}
      <section className="xj-services section-padding bg-void">
        <div className="container">
          <h3 className="section-header text-gold text-center">{t.services_title}</h3>

          <div className="service-rows">

            {/* Service 1 - BaZi */}
            <div className="s-row">
              <div className="s-content">
                <span className="s-num text-gold">01</span>
                <h3 className="text-white">{t.services[0].name}</h3>
                <p className="s-desc text-dim">{t.services[0].desc}</p>
                <p className="s-detail text-dim-2">{t.services[0].detail}</p>
              </div>

              <div className="s-visual">
                <img src="/xj-chart.webp" alt="BaZi Chart" loading="lazy" />
              </div>
            </div>

            {/* Service 2 - Feng Shui */}
            <div className="s-row reverse">
              <div className="s-content">
                <span className="s-num text-gold">02</span>
                <h3 className="text-white">{t.services[4].name}</h3>
                <p className="s-desc text-dim">{t.services[4].desc}</p>
                <p className="s-detail text-dim-2">{t.services[4].detail}</p>
              </div>

              <div className="s-visual">
                <img src="/fengshui-artistic.webp" alt="Feng Shui" loading="lazy" />
              </div>
            </div>

            {/* Service 3 - Zi Wei / Strategy */}
            <div className="s-row">
              <div className="s-content">
                <span className="s-num text-gold">03</span>
                <h3 className="text-white">{t.services[3].name}</h3>
                <p className="s-desc text-dim">{t.services[3].desc}</p>
                <p className="s-detail text-dim-2">{t.services[3].detail}</p>
              </div>

              <div className="s-visual">
                <img src="/xj-tea.webp" alt="Strategy" loading="lazy" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. DISCLAIMER */}
      <section className="xj-note">
        <div className="container text-center">
          <p className="note-text">{t.disclaimer}</p>
        </div>
      </section>

      <style>{`
        .xj-page-rich {
          background-color: #0E0D0C;
          color: #EFEFEF;
        }

        .text-gold { color: var(--xj-accent); }
        .bg-void { background: #050505; }
        .invert { filter: invert(1); opacity: 0.8; }
        .text-dim { color: rgba(255,255,255,0.8); }
        .text-dim-2 { color: rgba(255,255,255,0.5); font-style: italic; margin-top: 1rem; }

        /* HERO */
        .xj-hero {
          height: 90vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          text-align: center;
        }

        .xj-hero-bg {
          position: absolute;
          inset: 0;

          background-image: url('/xj-chart.webp');
          background-size: cover;
          background-position: center;
          filter: brightness(0.4) sepia(0.3);
        }
        
        .xj-hero-overlay {
           position: absolute;
           inset: 0;
           background: radial-gradient(circle, transparent 0%, #0E0D0C 90%);
        }

        .hero-brand-img {
          width: 80px;
          margin-bottom: 2rem;
        }

        .xj-lead {
           font-size: 1.5rem;
           margin-top: 1rem;
           max-width: 600px;
           margin-left: auto; 
           margin-right: auto;
           opacity: 0.8;
        }

        /* PHILOSOPHY */
        .philo-box {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            gap: 4rem;
            background: #111;
            padding: 4rem;
            border: 1px solid #222;
        }
        
        .philo-text {
            font-size: 1.2rem;
            line-height: 1.8;
            margin-top: 2rem;
            color: #ccc;
        }

        .philo-img {
            width: 100%;
            border: 1px solid var(--xj-accent);
            opacity: 0.8;
        }

        /* SERVICES */
        .service-rows {
          margin-top: 6rem;
          display: flex;
          flex-direction: column;
          gap: 8rem;
        }

        .section-header {
           font-family: var(--font-display);
           font-size: 3rem;
           margin-bottom: 2rem;
        }

        .s-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }
        
        .s-row.reverse { direction: rtl; }
        .s-row.reverse .s-content { direction: ltr; }

        .s-visual img {
          width: 100%;
          height: 450px;
          object-fit: cover;
          filter: contrast(1.1);
        }

        .s-content h3 {
          font-family: var(--font-display);
          font-size: 2.5rem;
          margin-bottom: 1rem;
          margin-top: 2rem;
        }

        .s-num {
          font-family: var(--font-mono);
          font-size: 3rem;
          display: block;
          opacity: 0.5;
        }

        .s-desc {
          font-size: 1.25rem;
          max-width: 400px;
          line-height: 1.6;
        }

        /* NOTE */
        .xj-note {
          background: #1C1917;
          color: var(--xj-accent);
          padding: 2rem 0;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          opacity: 0.7;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        @media (max-width: 900px) {
          .philo-box { grid-template-columns: 1fr; padding: 2rem; }
          .s-row { grid-template-columns: 1fr; }
          .s-row.reverse { direction: ltr; }
          .display-1 { font-size: 4rem; }
        }
      `}</style>
    </div>
  );
};

export default XJHome;
