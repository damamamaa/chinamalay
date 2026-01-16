import React from 'react';
import { motion } from 'framer-motion';
import { content } from '../content';

const HowToConsult = ({ lang }) => {
    const t = content[lang].how_to_consult;

    return (
        <div className="consult-page">
            <div className="container">

                {/* HEADER */}
                <header className="consult-header">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="page-title">{t.title}</h1>
                        <p className="page-subtitle">{t.subtitle}</p>
                    </motion.div>
                </header>

                {/* SECTION 1: INTRO */}
                <section className="consult-section intro-section">
                    <p className="intro-text">{t.intro}</p>
                </section>

                {/* SECTION 2: CONTACT OPTIONS */}
                <section className="consult-section">
                    <h2 className="section-heading">{t.contact_options.title}</h2>
                    <div className="options-grid">
                        {t.contact_options.options.map((opt, i) => (
                            <div key={i} className="option-card">
                                <h3 className="opt-title">{opt.title}</h3>
                                <p className="opt-desc">{opt.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SECTION 3: ONLINE CONSULTATION */}
                <section className="consult-section">
                    <h2 className="section-heading">{t.online.title}</h2>
                    <div className="online-content">
                        <ul className="consult-list">
                            {t.online.list.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                        <p className="section-desc">{t.online.desc}</p>
                    </div>
                </section>

                {/* SECTION 4: TCM CONSULTATION */}
                <section className="consult-section">
                    <h2 className="section-heading">{t.tcm.title}</h2>
                    <p className="section-desc">{t.tcm.desc}</p>
                </section>

                {/* SECTION 5: PAYMENT METHODS */}
                <section className="consult-section">
                    <h2 className="section-heading">{t.payment.title}</h2>
                    <ul className="consult-list">
                        {t.payment.list.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                    <p className="section-desc">{t.payment.desc}</p>
                </section>

                {/* SECTION 6: ETHICS */}
                <section className="consult-section ethics-section">
                    <h2 className="section-heading">{t.ethics.title}</h2>
                    <p className="ethics-text">{t.ethics.text}</p>
                </section>

                {/* SECTION 7: ACTION BUTTON */}
                <div className="cta-container">
                    <a
                        href="https://wa.me/6596961237"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="consult-cta-btn"
                    >
                        {t.cta}
                    </a>
                </div>

            </div>

            <style>{`
        .consult-page {
          padding-top: 10rem;
          padding-bottom: 6rem;
          background-color: #FAFAFA;
          min-height: 100vh;
          color: #333;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* HEADER */
        .consult-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .page-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          margin-bottom: 0.5rem;
          color: #111;
        }

        .page-subtitle {
          font-family: var(--font-sans);
          font-size: 1.2rem;
          color: #666;
          letter-spacing: 0.05em;
        }

        /* SECTIONS */
        .consult-section {
          margin-bottom: 4rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .consult-section:last-of-type {
          border-bottom: none;
        }

        .intro-text {
          font-size: 1.2rem;
          line-height: 1.7;
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
          color: #444;
        }

        .section-heading {
          font-family: var(--font-display);
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: #222;
        }

        .section-desc {
          font-size: 1.05rem;
          line-height: 1.6;
          color: #444;
          margin-top: 1rem;
        }

        /* OPTIONS GRID */
        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        .option-card {
          background: #fff;
          padding: 1.5rem;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.05);
          transition: transform 0.2s;
        }

        .option-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .opt-title {
          font-family: var(--font-mono);
          font-size: 0.95rem;
          text-transform: uppercase;
          margin-bottom: 0.8rem;
          color: #B09B73; /* Gold/Accent */
          font-weight: bold;
          letter-spacing: 0.05em;
        }

        .opt-desc {
          font-size: 0.95rem;
          color: #555;
          line-height: 1.5;
        }

        /* LISTS */
        .consult-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .consult-list li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.8rem;
          font-size: 1.05rem;
          color: #333;
        }

        .consult-list li::before {
          content: "—";
          position: absolute;
          left: 0;
          color: #B09B73;
          font-weight: bold;
        }
        
        /* ETHICS */
        .ethics-section {
           background: #FFF;
           padding: 2.5rem;
           border-radius: 4px;
           border: 1px solid rgba(0,0,0,0.05);
           text-align: center;
        }

        .ethics-text {
            font-size: 1.1rem;
            font-style: italic;
            color: #555;
        }

        /* CTA */
        .cta-container {
          text-align: center;
          margin-top: 3rem;
        }

        .consult-cta-btn {
          display: inline-block;
          background-color: #2C5E4F; /* TCM Primary */
          color: white;
          padding: 1.2rem 3rem;
          border-radius: 50px;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          text-decoration: none;
          transition: all 0.3s;
          font-weight: bold;
          font-size: 0.9rem;
        }

        .consult-cta-btn:hover {
          transform: translateY(-2px);
          background-color: #1a3b31;
          box-shadow: 0 4px 15px rgba(44, 94, 79, 0.3);
        }

        @media (max-width: 600px) {
           .consult-page { padding-top: 7rem; }
           .page-title { font-size: 2.2rem; }
           .section-heading { font-size: 1.5rem; }
           .consult-section { margin-bottom: 3rem; }
        }
      `}</style>
        </div>
    );
};

export default HowToConsult;
