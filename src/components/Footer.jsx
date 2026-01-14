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
          background-color: #1a1a1a;
          color: white;
          padding: 6rem 0;
          font-family: var(--font-sans);
          text-align: center;
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .brand {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0.9;
        }

        .reg-num {
          font-size: 0.8rem;
          opacity: 0.5;
          letter-spacing: 0.05em;
        }

        .copyright {
          font-size: 0.75rem;
          opacity: 0.3;
          margin-top: 2rem;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
