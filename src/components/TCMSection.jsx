import React, { useEffect, useState } from 'react';
import { content } from '../content';

const TCMSection = ({ lang }) => {
  const t = content[lang].tcm;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.1);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="tcm" className="section-padding tcm-masterpiece">
      {/* Background Marquee */}
      <div className="bg-marquee">
        <span className="marquee-text">TRADITIONAL CHINESE MEDICINE • BALANCE • HEALING • </span>
      </div>

      <div className="container relative">
        <div className="layout-grid">

          {/* Text Column */}
          <div className="text-col">
            <span className="label-mono highlight-jade">{t.tagline}</span>
            <h2 className="display-2 section-title">{t.brand}</h2>
            <div className="divider-line"></div>
            <p className="intro-text">{t.description}</p>

            <div className="services-accordions">
              {t.services.map((item, index) => (
                <div key={index} className="accordion-item fade-in-scroll">
                  <span className="acc-num">0{index + 1}</span>
                  <div className="acc-content">
                    <h3 className="acc-title display-3">{item.name}</h3>
                    <p className="acc-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="disclaimer-stamp">
              {t.disclaimer}
            </div>
          </div>

          {/* Floater Images */}
          <div className="visual-col">

            <div className="floating-card main-img" style={{ transform: `translateY(${offset * -0.5}px)` }}>
              <img src="/tcm.webp" alt="TCM" loading="lazy" />
              <div className="card-overlay"></div>
            </div>

            {/* Decorative geometrical elements */}
            <div className="deco-circle"></div>
          </div>

        </div>
      </div>

      <style>{`
        .tcm-masterpiece {
          position: relative;
          background: var(--tcm-light);
          overflow: hidden;
          padding-top: 15vh;
        }

        .relative { position: relative; z-index: 2; }

        .bg-marquee {
          position: absolute;
          top: 5vh;
          left: 0;
          width: 100%;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0.05;
          z-index: 0;
          overflow: hidden;
          color: var(--tcm-primary);
        }

        .marquee-text {
          font-family: var(--font-display);
          font-size: 15rem;
          line-height: 1;
          display: inline-block;
          animation: marquee 40s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .layout-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 8vw;
        }

        .highlight-jade {
          color: var(--tcm-primary);
          background: rgba(136, 166, 156, 0.2);
          padding: 0.2rem 0.5rem;
        }

        .section-title {
          margin-top: 1.5rem;
          margin-bottom: 2rem;
          color: var(--tcm-primary);
        }

        .divider-line {
          width: 100%;
          height: 1px;
          background: rgba(0,0,0,0.1);
          margin-bottom: 3rem;
        }

        .intro-text {
          font-size: 1.2rem;
          margin-bottom: 5rem;
          color: var(--tcm-primary);
        }

        .services-accordions {
          border-top: 1px solid rgba(0,0,0,0.1);
        }

        .accordion-item {
          display: flex;
          gap: 2rem;
          padding: 2rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.1);
          transition: background 0.3s;
        }

        .accordion-item:hover {
          background: rgba(255,255,255,0.4);
          padding-left: 1rem;
        }

        .acc-num {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          opacity: 0.5;
        }

        .acc-title {
          font-size: 1.8rem; /* localized display-3 override */
          margin-bottom: 0.5rem;
          color: var(--tcm-primary);
        }
        
        .acc-desc {
          font-size: 0.95rem;
        }

        .disclaimer-stamp {
          margin-top: 4rem;
          border: 1px solid var(--tcm-primary);
          color: var(--tcm-primary);
          padding: 1rem;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          text-transform: uppercase;
          display: inline-block;
        }

        .visual-col {
          position: relative;
        }

        .floating-card {
          position: relative;
          z-index: 2;
          box-shadow: 0 40px 80px -20px rgba(44, 62, 54, 0.3);
        }

        .floating-card img {
          width: 100%;
          display: block;
        }

        .deco-circle {
          position: absolute;
          top: 20%;
          right: -10vw;
          width: 40vw;
          height: 40vw;
          border: 1px solid rgba(44, 62, 54, 0.1);
          border-radius: 50%;
          z-index: 1;
        }

        @media (max-width: 900px) {
          .layout-grid {
             grid-template-columns: 1fr;
          }
          .floating-card {
             display: none; /* Hide complex scrolling image on mobile or simplify */
          }
          .tcm-masterpiece {
            padding-top: 5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default TCMSection;
