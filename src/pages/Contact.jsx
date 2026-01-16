import React, { useState } from 'react';
import { color, motion, AnimatePresence } from 'framer-motion';
import { content } from '../content';

const Contact = ({ lang }) => {
  const t = content[lang].contact;
  const [activeTab, setActiveTab] = useState('tcm');

  const toggleTab = (tab) => setActiveTab(tab);

  return (
    <div className="contact-page-immersive">

      {/* 1. VISUAL HEADER */}
      <div className="contact-hero">
        <div className="contact-hero-bg" style={{ backgroundImage: `url(${activeTab === 'tcm' ? '/tcm-herbs.webp' : '/xj-map.webp'})` }} />
        <div className="contact-overlay" />
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="ch-content"
        >
          <span className="mono-label">{t.connect}</span>
          <h1 className="hero-title">{t.title}</h1>
          <p className="hero-desc">
            {activeTab === 'tcm' ? t.hero_tcm : t.hero_xj}
          </p>
        </motion.div>
      </div>

      <div className="contact-body">
        <div className="container">

          {/* TABS */}
          <div className="glass-tabs">
            <button
              className={`g-tab ${activeTab === 'tcm' ? 'active' : 'inactive'}`}
              onClick={() => toggleTab('tcm')}
            >
              <span className="dot"></span> {content[lang].contact.form.service_options.tcm}
            </button>
            <button
              className={`g-tab ${activeTab === 'xj' ? 'active' : 'inactive'}`}
              onClick={() => toggleTab('xj')}
            >
              <span className="dot"></span> {content[lang].contact.form.service_options.xj}
            </button>
          </div>

          <div className="contact-layout">
            {/* LEFT: INFO & FAQ */}
            <div className="c-info">
              <h3 className="section-label">{t.details_title}</h3>

              <div className="info-card">
                <label>{t.visit}</label>
                <p className="address-text">{t.address}</p>
                <a href="https://maps.google.com" target="_blank" className="map-link">{t.maps} &rarr;</a>
              </div>

              <div className="info-card">
                <label>{t.direct}</label>
                <div className="phone-row">
                  <span>SG:</span> <a href={`tel:${t.phone_sg}`}>{t.phone_sg}</a>
                </div>
                <div className="phone-row">
                  <span>MY:</span> <a href={`tel:${t.phone_my}`}>{t.phone_my}</a>
                </div>
                <a href="#" className="whatsapp-btn">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" width="20" />
                  {t.chat}
                </a>
              </div>

              <div className="faq-mini">
                <h4 className="faq-title">{t.faq_title}</h4>
                {t.faqs && t.faqs.map((faq, i) => (
                  <details key={i} open={i === 0}>
                    <summary>{faq.q}</summary>
                    <p>{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* RIGHT: FORM */}
            <div className="c-form-wrapper">
              <h3 className="section-label">{t.form.title}</h3>
              <form className="master-form">
                <div className="form-group">
                  <label>{t.form.name}</label>
                  <input type="text" placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label>{t.form.email}</label>
                  <input type="email" placeholder="john@example.com" />
                </div>
                <div className="form-group">
                  <label>{t.form.service}</label>
                  <select className="minimal-select">
                    {activeTab === 'tcm' ? (
                      <>
                        <option>{t.form.options.tcm_gen}</option>
                        <option>{t.form.options.acu}</option>
                        <option>{t.form.options.bone}</option>
                      </>
                    ) : (
                      <>
                        <option>{t.form.options.bazi}</option>
                        <option>{t.form.options.fs}</option>
                        <option>{t.form.options.career}</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="form-group">
                  <label>{t.form.message}</label>
                  <textarea rows="5" placeholder={t.form.placeholder}></textarea>
                </div>
                <button type="submit" className="submit-btn-premium">
                  {t.form.submit}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      <style>{`
                .contact-page-immersive {
                    background-color: #0E0D0C;
                    color: #EFEFEF;
                    min-height: 100vh;
                }

                /* HERO */
                .contact-hero {
                    min-height: 60vh;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    overflow: hidden;
                    padding-top: 4rem;
                }

                .contact-hero-bg {
                    position: absolute;
                    inset: 0;
                    background-size: cover;
                    background-position: center;
                    transition: background-image 0.8s ease-in-out;
                    filter: brightness(0.5);
                }

                .contact-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, rgba(0,0,0,0.3), #0E0D0C);
                }

                .ch-content {
                    position: relative;
                    z-index: 10;
                    max-width: 700px;
                    padding: 0 2rem;
                }

                .mono-label {
                    font-family: var(--font-mono);
                    color: var(--xj-gold);
                    letter-spacing: 0.2em;
                    font-size: 0.8rem;
                    display: block;
                    margin-bottom: 1rem;
                    text-transform: uppercase;
                }

                .hero-title {
                    font-family: var(--font-display);
                    font-size: clamp(2.5rem, 6vw, 4.5rem);
                    line-height: 1.1;
                    margin-bottom: 1.5rem;
                    word-wrap: break-word;
                    max-width: 100%;
                }

                .hero-desc {
                    font-size: clamp(1rem, 2vw, 1.2rem);
                    color: rgba(255,255,255,0.7);
                    max-width: 90%;
                    margin: 0 auto;
                }

                /* TABS */
                .contact-body {
                    position: relative;
                    z-index: 20;
                    margin-top: -3rem;
                    padding-bottom: 10rem;
                }

                .glass-tabs {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 4rem;
                }

                .g-tab {
                    background: rgba(255,255,255,0.05);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 1rem 2rem;
                    border-radius: 50px;
                    color: white;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-family: var(--font-mono);
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .g-tab.active {
                    background: var(--xj-gold);
                    color: black;
                    border-color: var(--xj-gold);
                }
                
                .dot { width: 6px; height: 6px; background: currentColor; border-radius: 50%; opacity: 0.5; }

                /* LAYOUT */
                .contact-layout {
                    display: grid;
                    grid-template-columns: 1fr 1.5fr;
                    gap: 6rem;
                    margin-top: 2rem;
                }

                .section-label {
                    font-family: var(--font-display);
                    font-size: 2rem;
                    margin-bottom: 2rem;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    padding-bottom: 1rem;
                }

                .info-card {
                    margin-bottom: 3rem;
                    background: rgba(255,255,255,0.02);
                    padding: 2rem;
                    border-radius: 8px;
                    border: 1px solid rgba(255,255,255,0.05);
                }

                .info-card label {
                    font-family: var(--font-mono);
                    color: var(--tcm-light);
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    display: block;
                    margin-bottom: 1rem;
                }

                .address-text {
                    font-size: 1.1rem;
                    line-height: 1.6;
                    margin-bottom: 1rem;
                    color: rgba(255,255,255,0.9);
                }

                .map-link, .whatsapp-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--xj-gold);
                    font-size: 0.9rem;
                    text-decoration: none;
                    margin-top: 0.5rem;
                    padding-bottom: 2px;
                    border-bottom: 1px solid transparent;
                    transition: border 0.3s;
                }
                .map-link:hover { border-color: var(--xj-gold); }

                .phone-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    padding-bottom: 0.5rem;
                }
                .phone-row a { color: white; }

                .whatsapp-btn {
                    margin-top: 1.5rem;
                    background: #25D366;
                    color: white;
                    padding: 0.8rem 1.5rem;
                    border-radius: 30px;
                    font-weight: 600;
                    text-transform: uppercase;
                    font-size: 0.8rem;
                }

                .faq-mini details {
                    margin-bottom: 1rem;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    padding-bottom: 1rem;
                    cursor: pointer;
                }
                
                .faq-mini summary { font-family: var(--font-display); font-size: 1.1rem; outline: none; }
                .faq-mini p { margin-top: 0.5rem; color: #888; font-size: 0.95rem; line-height: 1.5; }

                /* FORM */
                .master-form {
                    background: #151515;
                    padding: 3rem;
                    border-radius: 4px; /* Crisp edges */
                }

                .form-group { margin-bottom: 2rem; }
                
                .form-group label {
                    display: block;
                    font-family: var(--font-mono);
                    font-size: 0.75rem;
                    margin-bottom: 0.8rem;
                    color: #666;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }

                .master-form input, .master-form textarea, .minimal-select {
                    width: 100%;
                    background: transparent;
                    border: none;
                    border-bottom: 1px solid #333;
                    padding: 1rem 0;
                    color: white;
                    font-family: var(--font-body);
                    font-size: 1.1rem;
                    transition: border 0.3s;
                }

                .master-form input:focus, .master-form textarea:focus {
                    outline: none;
                    border-color: var(--xj-gold);
                }

                .submit-btn-premium {
                    width: 100%;
                    padding: 1.5rem;
                    background: white;
                    color: black;
                    font-family: var(--font-mono);
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    border: 1px solid white;
                    cursor: pointer;
                    transition: all 0.3s;
                    margin-top: 2rem;
                    font-weight: bold;
                }

                .submit-btn-premium:hover {
                    background: var(--xj-gold);
                    border-color: var(--xj-gold);
                }

                @media (max-width: 900px) {
                    .contact-layout { grid-template-columns: 1fr; gap: 4rem; }
                    .glass-tabs { flex-wrap: wrap; }
                    .contact-hero { height: auto; min-height: 50vh; padding-top: 8rem; padding-bottom: 4rem; }
                    .ch-content { padding: 0 1rem; }
                    .submit-btn-premium { font-size: 0.9rem; padding: 1.2rem; }
                }
            `}</style>
    </div>
  );
};

export default Contact;
