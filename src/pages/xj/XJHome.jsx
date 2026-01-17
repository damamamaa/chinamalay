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
          <div className="xj-hero-content" style={{ position: 'relative', zIndex: 100 }}>

            {/* Replaced Brand Image with Simple Telescope Icon as requested */}
            <div className="hero-brand-icon mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '80px', height: '80px', margin: '0 auto', filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))' }}>
                <path d="M10.5 4.5l-6 6M10.5 4.5l6-6M4.5 10.5l-2.5 2.5a2.121 2.121 0 0 0 3 3L17.5 3.5a2.121 2.121 0 0 0-3-3L2 13" />
                <path d="M15 15l4 4" />
                <path d="M15 19l4-4" />
              </svg>
            </div>

            <h1 className="display-1 text-gold">{t.brand}</h1>
            <p className="xj-lead">{t.description}</p>
          </div>
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
              <img src="/rusheng_compass_v2.webp" alt="Strategic Navigation" className="philo-img" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. DETAILED SERVICES */}
      <section className="xj-services section-padding bg-void">
        <div className="container">
          <h3 className="section-header text-gold text-center">{t.services_title}</h3>

          <div className="service-rows">

            {t.services.map((service, index) => (
              <div key={index} className={`s-row ${index % 2 !== 0 ? 'reverse' : ''}`}>
                <div className="s-content">
                  <span className="s-num text-gold">0{index + 1}</span>
                  <h3 className="text-white">{service.name}</h3>
                  <p className="s-desc text-dim">{service.desc}</p>
                  <p className="s-detail text-dim-2">{service.detail}</p>
                </div>

                <div className="s-visual">
                  <img
                    src={service.image || (index % 2 === 0 ? "/xj_services_struct.webp" : "/xj_hero_strategic.webp")}
                    alt={service.name}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 4. DISCLAIMER */}
      <section className="xj-note">
        <div className="container text-center">
          <p className="note-text">{t.disclaimer}</p>
        </div>
      </section>

      {/* 5. QI MEN DUN JIA DEEP DIVE (NEW) */}
      <section className="xj-qimen section-padding bg-dark-rich">
        <div className="container">
          <div className="qimen-header text-center">
            <h2 className="display-3 text-gold mb-4">{t.qimen_details.title}</h2>
            <p className="qimen-intro">{t.qimen_details.intro}</p>
          </div>

          <div className="qimen-grid">
            {/* Left: What It Helps With */}
            <div className="q-list-box border-gold">
              <h4 className="q-title text-gold">{t.qimen_details.helps_title}</h4>
              <ul className="q-list check-list">
                {t.qimen_details.helps_list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="q-note">{t.qimen_details.helps_note}</p>
            </div>

            {/* Right: What It Does Not Do */}
            <div className="q-list-box border-dim">
              <h4 className="q-title text-gold">{t.qimen_details.not_title}</h4>
              <ul className="q-list cross-list">
                {t.qimen_details.not_list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="q-note">{t.qimen_details.not_note}</p>
            </div>
          </div>

          <div className="qimen-bottom-layout">
            <div className="q-bottom-card">
              <h4 className="q-title text-gold">{t.qimen_details.perspective_title}</h4>
              <p>{t.qimen_details.perspective_text}</p>
            </div>

            <div className="q-bottom-card">
              <h4 className="q-title text-gold">{t.qimen_details.vs_title}</h4>
              <p>{t.qimen_details.vs_text}</p>
            </div>
          </div>

          <div className="qimen-disclaimer mt-5 text-center">
            <h5 className="text-dim small-caps">{t.qimen_details.disclaimer_title}</h5>
            <p className="text-dim small-text">{t.qimen_details.disclaimer_text}</p>
          </div>
        </div>
      </section>

      <style>{`
        .xj-home {
          overflow-x: hidden;
          width: 100%;
          background-color: #FFFFFF;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          width: 100%;
          box-sizing: border-box;
        }

        .xj-page-rich {
          background-color: #FFFFFF;
          color: var(--text-main);
        }

        .text-gold { color: #D4AF37; text-shadow: 0 0 1px rgba(0,0,0,0.1); } 
        .bg-void { background: #F8F9FA; }
        .invert { opacity: 1; }
        .text-dim { color: #444; } /* Darkened from muted */
        .text-dim-2 { color: #666; font-style: italic; margin-top: 1rem; }
        .text-white { color: #000; } /* In XJ (light theme), "text-white" class name might be misleading if it was copied, but here it likely refers to cards. Checking context: It's in s-content inside s-row. The background is bg-void (light). So text MUST be dark. */

        /* HERO */
        .xj-hero {
          height: 90vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          text-align: center;
          background: #fff; /* Ensure white bg */
        }

        .xj-hero-bg {
          position: absolute;
          inset: 0;

          background-image: url('/visual_xinjian.webp');
          background-size: cover;
          background-position: center;
          filter: brightness(0.6); /* Adjusted for new strategic map image */
        }
        
        .xj-hero-overlay {
           /* Removed radical gradient that might cause glare */
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6));
         }

        .hero-brand-img {
          width: 80px;
          margin-bottom: 2rem;
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
        }

        .xj-lead {
           font-size: 1.6rem;
           margin-top: 1rem;
           max-width: 600px;
           margin-left: auto; 
           margin-left: auto; 
           margin-right: auto;
           color: #ffffff;
           opacity: 1;
           text-shadow: 0 4px 15px rgba(0,0,0,1); /* Max contrast shadow */
           font-weight: 500;
        }

        /* PHILOSOPHY */
        .philo-box {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            gap: 4rem;
            background: #FFFFFF;
            padding: 4rem;
            border: 1px solid rgba(0,0,0,0.05);
            box-shadow: 0 10px 40px rgba(0,0,0,0.03);
        }
        
        .philo-text {
            font-size: 1.2rem;
            line-height: 1.8;
            margin-top: 2rem;
            color: var(--text-muted);
        }

        .philo-img {
            width: 100%;
            border: 1px solid var(--xj-accent);
            opacity: 1;
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
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .s-content h3 {
          font-family: var(--font-display);
          font-size: 2.5rem;
          margin-bottom: 1rem;
          margin-top: 2rem;
          color: var(--text-dark);
        }

        .s-num {
          font-family: var(--font-mono);
          font-size: 3rem;
          display: block;
          opacity: 0.3;
          color: var(--xj-accent);
        }

        .s-desc {
          font-size: 1.25rem;
          max-width: 400px;
          line-height: 1.6;
        }

        /* NOTE */
        .xj-note {
          background: #F4F4F4;
          color: var(--xj-accent);
          padding: 2rem 0;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          border-top: 1px solid rgba(0,0,0,0.05);
        }



        /* QIMEN SECTION */
        .bg-dark-rich { background: #111; color: #eee; }
        .mb-4 { margin-bottom: 2rem; }
        .mt-5 { margin-top: 4rem; }

        .qimen-header {
           max-width: 800px;
           margin: 0 auto 5rem;
        }

        .qimen-intro {
           font-size: 1.3rem;
           line-height: 1.7;
           color: #ccc;
        }

        .qimen-grid {
           display: grid;
           grid-template-columns: 1fr 1fr;
           gap: 3rem;
           margin-bottom: 4rem;
        }

        .q-list-box {
           padding: 3rem;
           background: rgba(255,255,255,0.03);
           border-radius: 4px;
        }

        .border-gold { border: 1px solid rgba(212, 175, 55, 0.3); }
        .border-dim { border: 1px solid rgba(255,255,255,0.1); }

        .q-title {
           font-family: var(--font-display);
           font-size: 1.8rem;
           margin-bottom: 2rem;
        }

        .q-list {
           list-style: none;
           padding: 0;
           margin-bottom: 2rem;
        }

        .q-list li {
           position: relative;
           padding-left: 2rem;
           margin-bottom: 1rem;
           font-size: 1.1rem;
           color: #ddd;
        }

        .check-list li::before { content: "✓"; color: var(--xj-accent); position: absolute; left: 0; }
        .cross-list li::before { content: "✕"; color: #666; position: absolute; left: 0; }

        .q-note {
           font-family: var(--font-mono);
           font-size: 0.8rem;
           color: #888;
           border-top: 1px solid rgba(255,255,255,0.1);
           padding-top: 1rem;
        }

        .qimen-bottom-layout {
           display: grid;
           grid-template-columns: 1fr 1fr;
           gap: 3rem;
        }

        .q-bottom-card {
           padding: 2rem;
           border-left: 2px solid var(--xj-accent);
           background: rgba(0,0,0,0.2);
        }
        
        .q-bottom-card p {
           font-size: 1.1rem;
           color: #ccc;
           line-height: 1.8;
        }

        .small-caps {
           font-family: var(--font-mono);
           text-transform: uppercase;
           letter-spacing: 0.1em;
           font-size: 0.9rem;
           margin-bottom: 0.5rem;
        }

        .small-text {
           font-size: 0.9rem;
           opacity: 0.6;
           max-width: 600px;
           margin: 0 auto;
        }

        @media (max-width: 900px) {
          .philo-box { grid-template-columns: 1fr !important; padding: 2rem; }
          .s-row { grid-template-columns: 1fr !important; }
          .s-row.reverse { direction: ltr !important; }
          .display-1 { font-size: 2.5rem !important; }
          .qimen-grid, .qimen-bottom-layout { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .q-list-box { padding: 1.5rem !important; }
          .q-bottom-card { padding: 1.5rem !important; }
          .section-header { font-size: 2rem !important; }
          .xj-home { overflow-x: hidden !important; width: 100% !important; }
          .container { padding: 0 1rem !important; }
          .qimen-header { margin-bottom: 3rem !important; }
        }
      `}</style>
    </div>
  );
};

export default XJHome;
