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
            <img src="/xinjian-brand.webp" alt="Xin Jian" className="brand-mark rotating" loading="lazy" />
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
          background-color: var(--bg-paper); /* Clean medical white/gray */
          color: var(--text-main);
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
          opacity: 1; 
          margin-bottom: 2rem;
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
          color: var(--text-muted);
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
           background: #FFFFFF;
           border: 1px solid rgba(0,0,0,0.05);
           transition: all 0.5s ease;
           cursor: default;
           box-shadow: 0 4px 6px rgba(0,0,0,0.02);
        }

        .cosmos-card:hover {
           background: #FFFFFF;
           transform: translateY(-5px);
           box-shadow: 0 20px 40px rgba(0,0,0,0.08); 
           border-color: var(--xj-accent);
        }

        .cosmos-title {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: var(--xj-accent);
          margin-bottom: 1rem;
        }

        .cosmos-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
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
          opacity: 0.8;
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
          color: var(--text-muted);
        }

        /* Ambient Background - clean, no stars */
        .star-field {
          display: none; 
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
