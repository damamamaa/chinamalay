import React from 'react';
import { content } from '../content';

const About = ({ lang }) => {
    const t = content[lang].about;

    return (
        <section id="about" className="section-padding about-section">
            <div className="container">
                <div className="about-card fade-in">
                    <h2 className="about-title">{t.title}</h2>
                    <div className="about-role">{t.role}</div>
                    <div className="divider-line" />
                    <p className="about-desc">{t.description}</p>
                    <div className="about-reg">{t.reg}</div>
                </div>
            </div>

            <style>{`
        .about-section {
          background-color: var(--bg-color);
          text-align: center;
        }

        .about-card {
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem;
          border: 1px solid rgba(0,0,0,0.05);
          background: white;
          box-shadow: 0 10px 40px rgba(0,0,0,0.02);
        }

        .about-title {
          margin-bottom: 0.5rem;
        }

        .about-role {
          font-family: var(--font-sans);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .divider-line {
          width: 60px;
          height: 1px;
          background: var(--text-primary);
          margin: 0 auto 2rem;
          opacity: 0.2;
        }

        .about-desc {
          margin: 0 auto 2rem;
          font-size: 1.2rem;
          line-height: 2;
        }

        .about-reg {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: var(--text-secondary);
          opacity: 0.6;
        }
        
        @media (max-width: 768px) {
          .about-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
        </section>
    );
};

export default About;
