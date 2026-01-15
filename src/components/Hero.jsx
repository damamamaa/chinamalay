import React, { useEffect, useState } from 'react';
import { content } from '../content';

const Hero = ({ lang }) => {
  const t = content[lang].hero;
  const [activeSide, setActiveSide] = useState(null); // 'tcm' | 'xj' | null
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2, // -1 to 1
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section className="hero-masterpiece">
      {/* Cinematic Intro Title */}
      <div className={`intro-center ${activeSide ? 'fade-out' : ''}`}>
        <h1 className="hero-title reveal-text">
          <span style={{ animationDelay: '0.1s' }}>{t.title}</span>
        </h1>
        <div className="hero-subtitle reveal-text">
          <span style={{ animationDelay: '0.3s' }}>{t.subtitle}</span>
        </div>
        <div className="scroll-indicator">
          <div className="line"></div>
        </div>
      </div>

      <div className="dual-portals">
        {/* TCM Portal */}
        <div
          className={`portal tcm-portal ${activeSide === 'xj' ? 'recede' : ''} ${activeSide === 'tcm' ? 'expand' : ''}`}
          onMouseEnter={() => setActiveSide('tcm')}
          onMouseLeave={() => setActiveSide(null)}
          onClick={() => document.getElementById('tcm').scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="portal-bg" style={{
            transform: `scale(1.1) translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`
          }}></div>
          <div className="portal-content">
            <span className="label-mono">{t.section_tcm.title}</span>
            <h2 className="display-3">{t.section_tcm.desc}</h2>
            <button className="btn-magnetic">{t.section_tcm.button}</button>
          </div>
          <div className="overlay-mist"></div>
        </div>

        {/* Xin Jian Portal */}
        <div
          className={`portal xj-portal ${activeSide === 'tcm' ? 'recede' : ''} ${activeSide === 'xj' ? 'expand' : ''}`}
          onMouseEnter={() => setActiveSide('xj')}
          onMouseLeave={() => setActiveSide(null)}
          onClick={() => document.getElementById('xinjian').scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="portal-bg" style={{
            transform: `scale(1.1) translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`
          }}></div>
          <div className="portal-content">
            <span className="label-mono">{t.section_xj.title}</span>
            <h2 className="display-3">{t.section_xj.desc}</h2>
            <button className="btn-magnetic btn-gold">{t.section_xj.button}</button>
          </div>
          <div className="overlay-warmth"></div>
        </div>
      </div>

      <style>{`

        .hero-masterpiece {
          position: relative;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          background: #FFFFFF;
        }

        .intro-center {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          text-align: center;
          color: var(--text-dark);
          pointer-events: none;
          mix-blend-mode: normal;
          transition: opacity 0.5s;
          width: 100%;
          padding: 0 1rem;
        }

        .intro-center.fade-out {
          opacity: 0;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 8vw, 8rem);
          white-space: nowrap;
          color: var(--text-dark);
          text-shadow: 0 2px 20px rgba(255,255,255,0.9);
        }

        .hero-subtitle {
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.3em;
          margin-top: 1rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          background: rgba(255,255,255,0.9);
          padding: 0.5rem 1rem;
          display: inline-block;
          border-radius: 4px;
        }


        .scroll-indicator {
          position: absolute;
          bottom: -15vh;
          left: 50%;
          height: 100px;
          width: 1px;
          background: rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .scroll-indicator .line {
          width: 100%;
          height: 100%;
          background: #333;
          animation: scrollDown 2s infinite;
        }

        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        /* Portals */
        .dual-portals {
          display: flex;
          height: 100%;
          width: 100%;
        }


        .portal {
          flex: 1;
          position: relative;
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          cursor: pointer;
          border-right: 1px solid rgba(0,0,0,0.05);
        }

        .portal-bg {
          position: absolute;
          top: -5%; left: -5%;
          width: 110%; height: 110%;
          background-size: cover;
          background-position: center;
          transition: filter 0.5s;
        }

        .tcm-portal .portal-bg {
          background-image: url('/tcm.webp');
          filter: grayscale(100%) brightness(0.95);
        }

        .xj-portal .portal-bg {
          background-image: url('/visual_xinjian.webp');
          filter: grayscale(100%) brightness(0.95);
        }

        .portal:hover .portal-bg {
          filter: grayscale(0%) brightness(1.05);
        }


        .portal.recede {
          flex: 0.4;
          filter: brightness(0.6);
        }
        
        .portal.expand {
          flex: 1.6;
        }

        .portal-content {
          position: absolute;
          bottom: 10vh;
          left: 4vw;
          z-index: 5;
          color: var(--text-dark);
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s 0.2s;
          max-width: 500px;
          background: rgba(255,255,255,0.85);
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .portal:hover .portal-content {
          opacity: 1;
          transform: translateY(0);
        }

        .portal-content h2 {
          margin: 1rem 0 2rem;
          font-weight: 300;
          color: var(--text-dark);
        }

        /* Overlays for atmosphere */
        .overlay-mist {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(255,255,255, 0.9), transparent);
          opacity: 0.7;
          pointer-events: none;
        }
        
        .overlay-warmth {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(255,255,255, 0.9), transparent);
          opacity: 0.7;
          pointer-events: none;
        }
        
        .btn-gold {
          color: var(--text-dark);
          border-color: rgba(0,0,0,0.1);
        }
        .btn-gold::before {
           background: var(--xj-accent);
        }

        @media (max-width: 768px) {
          .dual-portals {
            flex-direction: column;
          }
           .hero-title {
             font-size: 3.5rem;
             white-space: normal;
           }
           .intro-center {
             mix-blend-mode: normal;
           }
           .portal-content {
             opacity: 1;
             transform: translateY(0);
             bottom: 2rem;
             left: 1.5rem;
           }
           .display-3 { font-size: 1.5rem; }
           
           /* Always show color on mobile for appeal */
           .tcm-portal .portal-bg, .xj-portal .portal-bg {
             filter: brightness(0.7);
           }
        }
      `}</style>
    </section>
  );
};

export default Hero;
