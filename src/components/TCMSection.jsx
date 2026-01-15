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
        <div className="header-lockup">
          <span className="label-mono highlight-jade">{t.tagline}</span>
          <h2 className="display-2 section-title">{t.brand}</h2>
          <p className="intro-text-center">{t.description}</p>
        </div>

        <div className="services-grid">
          {t.services.map((item, index) => (
            <div key={index} className="service-card fade-in-scroll">
              <div className="card-image-wrapper">
                <img src={item.image || '/tcm.webp'} alt={item.name} loading="lazy" />
                <div className="card-num">0{index + 1}</div>
              </div>
              <div className="card-content">
                <h3 className="card-title display-3">{item.name}</h3>
                <p className="card-desc">{item.desc}</p>
                <div className="card-detail-line"></div>
                <p className="card-detail">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="disclaimer-stamp-center">
          {t.disclaimer}
        </div>
      </div>

      <style>{`
        .tcm-masterpiece {
          position: relative;
          background: var(--tcm-light);
          overflow: hidden;
          padding-top: 10vh;
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

        .header-lockup {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 6rem;
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

        .intro-text-center {
          font-size: 1.2rem;
          color: var(--tcm-primary);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 6rem;
        }

        .service-card {
           background: #FFFFFF;
           border: 1px solid rgba(0,0,0,0.05);
           transition: transform 0.4s ease, box-shadow 0.4s ease;
           display: flex;
           flex-direction: column;
        }

        .service-card:hover {
           transform: translateY(-10px);
           box-shadow: 0 20px 40px -10px rgba(44, 62, 54, 0.15);
        }

        .card-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
        }

        .card-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .service-card:hover .card-image-wrapper img {
          transform: scale(1.05);
        }

        .card-num {
          position: absolute;
          top: 0;
          left: 0;
          background: var(--tcm-primary);
          color: #fff;
          padding: 0.5rem 1rem;
          font-family: var(--font-mono);
          font-size: 0.9rem;
        }

        .card-content {
          padding: 2rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .card-title {
          font-size: 1.5rem;
          color: var(--tcm-primary);
          margin-bottom: 1rem;
        }

        .card-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .card-detail-line {
          width: 30px;
          height: 1px;
          background: var(--tcm-primary);
          opacity: 0.3;
          margin-bottom: 1rem;
          margin-top: auto;
        }

        .card-detail {
          font-size: 0.85rem;
          font-style: italic;
          color: var(--text-muted);
        }

        .disclaimer-stamp-center {
          text-align: center;
          margin: 0 auto;
          max-width: 600px;
          border: 1px solid var(--tcm-primary);
          color: var(--tcm-primary);
          padding: 1rem;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          text-transform: uppercase;
        }

        @media (max-width: 1024px) {
          .services-grid {
             grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .services-grid {
             grid-template-columns: 1fr;
          }
          .marquee-text {
            font-size: 8rem;
          }
        }
      `}</style>
    </section>
  );
};

export default TCMSection;
