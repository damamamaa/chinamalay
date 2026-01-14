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
                    src={index % 2 === 0 ? "/xj-chart.webp" : "/fengshui-artistic.webp"}
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

      <style>{`

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

          background-image: url('/xj-chart.webp');
          background-size: cover;
          background-position: center;
          filter: grayscale(1) opacity(0.15); /* Slightly more visible grid */
        }
        
        .xj-hero-overlay {
           /* Removed radical gradient that might cause glare */
           position: absolute;
           inset: 0;
           background: transparent; 
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
           margin-right: auto;
           color: #333; /* Dark gray for readability */
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
