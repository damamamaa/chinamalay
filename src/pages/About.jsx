import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { content } from '../content';

const About = ({ lang }) => {
  const t = content[lang].about;
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });

  const yImg = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <div className="about-masterpiece">

      <section className="about-hero">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="display-1 text-center"
          >
            {t.title}
          </motion.h1>
        </div>
      </section>

      <section ref={targetRef} className="about-content">
        <div className="container about-grid">

          {/* LEFT: IMAGE */}
          <div className="about-visual">
            <div className="frame-gold">

              <motion.img
                style={{ y: yImg }}
                src="/rusheng_real.webp"
                alt="Rusheng Portrait"
                loading="eager"
              />
            </div>

            <div className="scrolls-visual">
              <img src="/about-scrolls.webp" alt="Ancient Wisdom" loading="lazy" />
            </div>
          </div>

          {/* RIGHT: STORY */}
          <div className="about-story">
            <h2 className="display-3">Wisdom in Practice.</h2>
            <p className="lead-text">{t.description}</p>
            <p className="deep-text">{t.bio_deep}</p>

            <div className="philosophy-box">
              <h3>Core Philosophy</h3>
              <ul>
                <li><strong>Balance:</strong> Health is not the absence of disease, but the dynamic equilibrium of Yin and Yang.</li>
                <li><strong>Clarity:</strong> Destiny analysis is not prediction, but a tool for clear decision making.</li>
                <li><strong>Responsibility:</strong> We empower clients to take charge of their health and life choices.</li>
              </ul>
            </div>

            <div className="credentials">
              <div className="cred-item">
                <span className="c-label">Registered Practitioner</span>
                <span className="c-val">{t.reg}</span>
              </div>
              <div className="cred-item">
                <span className="c-label">Experience</span>
                <span className="c-val">15+ Years Clinical & Advisory</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <style>{`
                .about-masterpiece {
                    background: #F8FBF9;
                    color: #1A2E26;
                }

                .about-hero {
                    padding: 8rem 0 4rem;
                }

                .about-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 6rem;
                    align-items: center;
                    padding-bottom: 8rem;
                }

                .about-visual {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                .frame-gold {
                    border: 10px solid #EFEFEF;
                    box-shadow: 0 40px 80px -20px rgba(0,0,0,0.2);
                    overflow: hidden;
                }

                .about-visual img {
                    width: 100%;
                    display: block;
                }
                
                .scrolls-visual img {
                    width: 80%;
                    margin-left: auto;
                    border: 5px solid white;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    transform: translateY(-50px);
                    z-index: 10;
                }

                .lead-text {
                    font-size: 1.4rem;
                    line-height: 1.7;
                    color: #444;
                    margin-bottom: 2rem;
                }
                
                .deep-text {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: #666;
                    margin-bottom: 3rem;
                }

                .philosophy-box {
                    background: #fff;
                    padding: 2rem;
                    border-left: 4px solid var(--tcm-primary);
                    margin-bottom: 3rem;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                }

                .philosophy-box h3 { font-family: var(--font-display); margin-bottom: 1rem; }
                .philosophy-box li { margin-bottom: 0.5rem; list-style: none; }
                
                .credentials {
                    display: flex;
                    gap: 4rem;
                    border-top: 1px solid #ddd;
                    padding-top: 2rem;
                }

                .c-label {
                    display: block;
                    font-family: var(--font-mono);
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    color: #888;
                    margin-bottom: 0.5rem;
                }
                
                .c-val {
                    font-family: var(--font-display);
                    font-size: 1.2rem;
                }

                @media (max-width: 900px) {
                    .about-grid { grid-template-columns: 1fr; }
                    .scrolls-visual img { width: 100%; transform: none; margin-top: -2rem; }
                }
            `}</style>
    </div>
  );
};

export default About;
