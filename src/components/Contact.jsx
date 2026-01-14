import React, { useState, useEffect } from 'react';
import { content } from '../content';

const Contact = ({ lang }) => {
  const t = content[lang].contact;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'tcm',
    message: ''
  });

  // Reset service selection based on language to match keys
  useEffect(() => {
    setFormData(prev => ({ ...prev, service: 'tcm' }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getWhatsappLink = () => {
    const isTCM = formData.service === 'tcm';
    const msg = isTCM ? t.whatsapp.tcm_msg : t.whatsapp.xj_msg;
    // Default to SG number as primary, or let user pick? 
    // Logic: if TCM use A, if XJ use A? Same number requested.
    const phone = "6596961237";
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container contact-container">

        <div className="contact-details">
          <h2 className="section-title text-left">{t.title}</h2>

          <div className="address-block">
            <p>{t.address}</p>
            <a href={`mailto:${t.email}`} className="email-link">{t.email}</a>
          </div>

          <div className="phone-block">
            <div className="phone-row">
              <span className="country-code">SG</span>
              <a href={`tel:${t.phone_sg.replace(/\s/g, '')}`}>{t.phone_sg}</a>
            </div>
            <div className="phone-row">
              <span className="country-code">MY</span>
              <a href={`tel:${t.phone_my.replace(/\s/g, '')}`}>{t.phone_my}</a>
            </div>
          </div>

          <a href={getWhatsappLink()} target="_blank" rel="noreferrer" className="btn-primary whatsapp-btn">
            {t.whatsapp.label}
          </a>
        </div>

        <form className="contact-form shadow-lift" onSubmit={(e) => { e.preventDefault(); window.open(getWhatsappLink(), '_blank'); }}>
          <div className="form-group">
            <label>{t.form.name}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="..."
              required
            />
          </div>

          <div className="form-group">
            <label>{t.form.email}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="..."
              required
            />
          </div>

          <div className="form-group">
            <label>{t.form.service}</label>
            <div className="select-wrapper">
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
              >
                <option value="tcm">{t.form.service_options.tcm}</option>
                <option value="xj">{t.form.service_options.xj}</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>{t.form.message}</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="..."
            ></textarea>
          </div>

          <button type="submit" className="btn-primary submit-btn">
            {t.form.submit}
          </button>
        </form>
      </div>

      <style>{`
        .contact-section {
          background-color: var(--bg-secondary);
        }

        .contact-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8rem;
          align-items: center;
        }

        .contact-details {
          font-family: var(--font-sans);
        }

        .address-block {
          margin: 3rem 0;
          color: var(--text-secondary);
          line-height: 1.8;
          font-size: 0.95rem;
        }

        .email-link {
          display: block;
          margin-top: 1rem;
          color: var(--text-primary);
          text-decoration: underline;
        }

        .phone-block {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .phone-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-family: var(--font-serif);
          font-size: 1.5rem;
        }

        .country-code {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          padding: 2px 6px;
          border: 1px solid var(--text-secondary);
          border-radius: 3px;
          color: var(--text-secondary);
        }

        .contact-form {
          background: white;
          padding: 4rem;
          border-radius: 2px;
          transition: transform 0.3s;
        }
        
        .shadow-lift {
           box-shadow: 0 20px 50px rgba(0,0,0,0.03);
        }

        .form-group label {
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          color: var(--text-light);
          margin-bottom: 0.8rem;
        }

        .form-group input, 
        .form-group select, 
        .form-group textarea {
          border: none;
          border-bottom: 1px solid #eee;
          background: transparent;
          padding: 0.5rem 0;
          border-radius: 0;
        }

        .form-group input:focus, 
        .form-group select:focus, 
        .form-group textarea:focus {
          border-bottom-color: var(--text-primary);
          background: transparent;
        }

        @media (max-width: 900px) {
          .contact-container {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          .contact-form {
            padding: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
