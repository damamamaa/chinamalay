import React from 'react';
import { content } from '../content';

const Footer = ({ lang }) => {
  const t = content[lang].footer;

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="brand">{t.brand}</div>
        <div className="reg-num">{t.reg}</div>

        <div className="copyright">
          &copy; {new Date().getFullYear()} {t.brand}. {t.rights}
        </div>
      </div>

      <style>{`

        .footer {
          background-color: #0F0F0F; /* Dark foundation (Black 43%) */
          color: rgba(255,255,255,0.8);
          padding: 6rem 0;
          font-family: var(--font-sans);
          text-align: center;
          position: relative;
          border-top: 1px solid #3A1C1C; /* Subtle red border */
        }

        .footer::before {
           content: '';
           position: absolute;
           top: 0; left: 0; width: 100%; height: 6px;
           background: linear-gradient(90deg, #0F0F0F 0%, #8B1E1E 50%, #0F0F0F 100%); /* Red influence (38%) */
           opacity: 0.8;
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .brand {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #D4AF37; /* Gold accent (small %) */
          background: linear-gradient(to right, #ffffff, #D4AF37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          opacity: 1;
        }

        .reg-num {
          font-size: 0.8rem;
          color: #888888;
          letter-spacing: 0.05em;
        }

        .copyright {
          font-size: 0.75rem;
          color: #555555;
          margin-top: 2rem;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
