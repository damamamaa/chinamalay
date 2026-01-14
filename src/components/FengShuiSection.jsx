import React, { useEffect } from 'react';
import { content } from '../content';

const FengShuiSection = ({ lang }) => {
  const t = content[lang].fengshui;

  return (
    <section id="xinjian" className="section-padding xj-masterpiece">
      <div className="container relative">
        {/* Central Axis Layout */}
        <div className="center-axis">

          <div className="brand-lockup fade-in-scroll">
            <img src="/xinjian-brand.png" alt="Xin Jian" className="brand-mark rotating" />
            <h2 className="display-1 brand-name">{t.brand}</h2>
            <p className="brand-philosophy">{t.description}</p>
          </div>

          <div className="cosmos-grid">
            {t.services.map((item, index) => (
              <div key={index} className="cosmos-card">
                <div className="card-border"></div>
                <h3 className="cosmos-title">{item.name}</h3>
                <p className="cosmos-desc">{item.desc}</p>
                <div className="card-corner"></div>
              </div>
            ))}
          </div>

          <div className="wisdom-footer">
            <div className="wisdom-line"></div>
            <p className="wisdom-text">{t.disclaimer}</p>
          </div>

        </div>
      </div>

      {/* Background Star Map Effect (CSS generated) */}
      <div className="star-field"></div>

      <style>{`
        .xj-masterpiece {
          background-color: #1a1816; /* Deep cosmic dark */
          color: #fbf8f3;
          position: relative;
          padding-top: 15vh;
          padding-bottom: 15vh;
          overflow: hidden;
        }

        .relative { position: relative; z-index: 5; }

        .center-axis {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .brand-lockup {
          margin-bottom: 8vh;
        }

        .brand-mark {
          width: 120px;
          height: 120px;
          filter: invert(1) brightness(0.9); /* Invert to make it white/gold on dark */
          margin-bottom: 2rem;
          opacity: 0.8;
        }

        .rotating {
          animation: subtleRotate 20s linear infinite;
        }

        @keyframes subtleRotate {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
          100% { transform: rotate(0deg); }
        }

        .brand-name {
          color: var(--xj-accent);
          margin-bottom: 2rem;
        }

        .brand-philosophy {
          max-width: 600px;
          margin: 0 auto;
          font-family: var(--font-serif);
          font-size: 1.3rem;
          opacity: 0.8;
          line-height: 1.8;
        }

        .cosmos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          width: 100%;
          margin: 4rem 0;
        }

        .cosmos-card {
           position: relative;
           padding: 3rem 2rem;
           background: rgba(255,255,255,0.03);
           border: 1px solid rgba(194, 178, 128, 0.1);
           transition: all 0.5s ease;
           cursor: default;
        }

        .cosmos-card:hover {
           background: rgba(194, 178, 128, 0.08); /* light gold tint */
           transform: translateY(-5px);
           border-color: rgba(194, 178, 128, 0.4);
        }

        .cosmos-title {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: var(--xj-accent);
          margin-bottom: 1rem;
        }

        .cosmos-desc {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.6);
        }

        .card-corner {
          position: absolute;
          top: 0; right: 0;
          width: 20px; height: 20px;
          border-top: 1px solid var(--xj-accent);
          border-right: 1px solid var(--xj-accent);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .cosmos-card:hover .card-corner {
          opacity: 1;
        }

        .wisdom-footer {
          margin-top: 4rem;
          opacity: 0.5;
        }
        
        .wisdom-line {
          width: 1px;
          height: 60px;
          background: var(--xj-accent);
          margin: 0 auto 2rem;
        }

        .wisdom-text {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          max-width: 500px;
        }

        /* Star Map Background */
        .star-field {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(white 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.1;
          z-index: 1;
        }

        @media (max-width: 900px) {
          .cosmos-grid {
             grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default FengShuiSection;
