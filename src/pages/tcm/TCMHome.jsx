import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { content } from '../../content';

const TCMHome = ({ lang }) => {
  const t = content[lang].tcm;

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="tcm-page-rich">

      {/* 1. HERO SECTION */}
      <section ref={targetRef} className="tcm-hero">
        <motion.div style={{ y, opacity }} className="tcm-hero-bg" />
        <div className="tcm-hero-overlay" />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="tcm-hero-content"
          >
            <span className="sc-tag">{t.tagline}</span>
            <h1 className="sc-title">{t.brand}</h1>
            <p className="sc-desc">{t.description}</p>
            <div className="sc-line"></div>
          </motion.div>
        </div>
      </section>

      {/* 2. PROCESS / DIAGNOSIS SECTION (NEW) */}
      <section className="tcm-process section-padding bg-paper">
        <div className="container">
          <h3 className="section-header text-center text-jade">{t.process_title}</h3>

          <div className="process-grid">
            {t.process.map((step, i) => (
              <div key={i} className="process-card">
                <div className="p-num">0{i + 1}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="pulse-visual-row">
            <div className="pulse-text">
              <h3>{t.pulse_section.title}</h3>
              <p>{t.pulse_section.text}</p>
            </div>

            <div className="pulse-img">
              <img src="/tcm_pulse_rusheng.webp" alt="Pulse Diagnosis" className="shadow-lg" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. DETAILED SERVICES */}
      <section className="tcm-services section-padding">
        <div className="container">
          <h3 className="section-header text-center text-jade">{t.services_title}</h3>

          <div className="service-rows">
            {t.services.map((service, index) => (
              <div key={index} className={`s-row ${index % 2 !== 0 ? 'reverse' : ''}`}>
                <div className="s-content">
                  <span className="s-num">0{index + 1}</span>
                  <h3>{service.name}</h3>
                  <p className="s-desc">{service.desc}</p>
                  <p className="s-detail">{service.detail}</p>
                </div>

                <div className="s-visual">
                  <img
                    src={service.image || "/tcm-artistic.webp"}
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
      <section className="tcm-note">
        <div className="container text-center">
          <p className="note-text">{t.disclaimer}</p>
        </div>
      </section>

      <style>{`
        .tcm-page-rich {
          background-color: var(--tcm-light);
          color: #1A2E26;
        }

        .text-jade { color: var(--tcm-primary); }
        .bg-paper { background-color: var(--bg-paper); }
        .shadow-lg { box-shadow: 0 20px 50px rgba(0,0,0,0.15); }

        /* HERO */
        .tcm-hero {
          height: 90vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          color: white;
          text-align: center;
        }

        .tcm-hero-bg {
          position: absolute;
          inset: 0;

          background-image: url('/tcm-artistic.webp');
          background-size: cover;
          background-position: center;
          filter: brightness(0.4); /* Darkened from 0.6 to 0.4 for better contrast */
        }
        
        .tcm-hero-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6)); /* Added gradient for depth */
        }

        .tcm-hero-content {
          max-width: 800px;
          position: relative;
          z-index: 20;
          text-shadow: 0 4px 20px rgba(0,0,0,0.8); /* Strong shadow for readability */
        }

        .sc-tag {
          font-family: var(--font-mono);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-size: 1rem; /* Slightly larger */
          font-weight: 600; /* Bolder */
          display: block;
          margin-bottom: 2rem;
          color: rgba(255,255,255,0.9);
        }

        .sc-title {
          font-family: var(--font-display);
          font-size: 5rem;
          margin-bottom: 2rem;
          font-weight: 700; /* Bolder */
        }

        .sc-desc {
          font-size: 1.6rem;
          opacity: 1; /* Full opacity */
          font-weight: 500;
          line-height: 1.5;
        }

        /* PROCESS SECTION */
        .process-grid {
           display: grid;
           grid-template-columns: repeat(4, 1fr);
           gap: 2rem;
           margin-bottom: 6rem;
        }

        .process-card {
           background: white;
           padding: 2rem;
           border-top: 3px solid var(--tcm-primary);
        }

        .p-num {
           font-family: var(--font-display);
           font-size: 2rem;
           color: #ddd;
           margin-bottom: 1rem;
        }

        .process-card h4 {
           font-size: 1.2rem;
           margin-bottom: 1rem;
           text-transform: uppercase;
           letter-spacing: 0.1em;
        }

        .pulse-visual-row {
           display: grid;
           grid-template-columns: 1fr 1fr;
           gap: 4rem;
           align-items: center;
        }

        .pulse-text {
           padding: 2rem;
        }
        .pulse-text h3 { font-family: var(--font-display); font-size: 2.5rem; margin-bottom: 1.5rem; }
        .pulse-text p { font-size: 1.1rem; line-height: 1.8; color: #555; }
        
        .pulse-img img { width: 100%; border-radius: 4px; }

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
           margin-bottom: 4rem;
        }

        .s-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        
        .s-row.reverse { direction: rtl; }
        .s-row.reverse .s-content { direction: ltr; }

        .s-visual img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          box-shadow: 0 30px 60px -10px rgba(0,0,0,0.2);
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
          color: #ccc;
          display: block;
        }

        .s-desc {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .s-detail {
           font-size: 1rem;
           color: #666;
           line-height: 1.6;
           border-left: 2px solid var(--tcm-light);
           padding-left: 1rem;
        }

        /* NOTE */
        .tcm-note {
          background: #1A2E26;
          color: white;
          padding: 2rem 0;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          opacity: 0.9;
        }

        @media (max-width: 900px) {
          .process-grid { grid-template-columns: 1fr; }
          .pulse-visual-row { grid-template-columns: 1fr; }
          .s-row { grid-template-columns: 1fr; }
          .sc-title { font-size: 3.5rem; }
          .s-row.reverse { direction: ltr; }
        }
      `}</style>
    </div>
  );
};

export default TCMHome;
