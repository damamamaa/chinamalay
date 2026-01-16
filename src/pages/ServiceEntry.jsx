import React from 'react';
import { motion } from 'framer-motion';

const ServiceEntry = ({ lang }) => {
    const whatsappNumber = '60148271236';
    const whatsappMessage = encodeURIComponent('Hello, I would like to enquire about consultation.');
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    const email = 'masterrusheng123@gmail.com';

    const content = {
        en: {
            intro: "Choose your service and connect easily via WhatsApp or Email.\nClarity comes first — decisions follow.",
            services_title: "Our Services",
            services: [
                {
                    name: "Xin Jian (Destiny & Decision Analysis)",
                    desc: "Analytical guidance for life direction, timing, and decision clarity."
                },
                {
                    name: "Qi Men Dun Jia",
                    desc: "Strategic timing and situational analysis for better decisions."
                },
                {
                    name: "Traditional Chinese Medicine (TCM)",
                    desc: "Personalized diagnosis and treatment focusing on root causes."
                }
            ],
            contact_title: "Contact Options",
            whatsapp_btn: "Contact via WhatsApp",
            email_label: "Or Email:",
            closing: "All consultations are conducted with clarity, respect, and ethical boundaries.\nGuidance is provided for reference and decision support — not guarantees."
        },
        zh: {
            intro: "选择您的服务，通过 WhatsApp 或电子邮件轻松联系。\n清晰优先 — 决策随之而来。",
            services_title: "我们的服务",
            services: [
                {
                    name: "心鉴 (命理与决策分析)",
                    desc: "为人生方向、时机和决策清晰度提供分析指导。"
                },
                {
                    name: "奇门遁甲",
                    desc: "战略时机和情况分析，助您做出更好的决策。"
                },
                {
                    name: "传统中医 (TCM)",
                    desc: "个性化诊断和治疗，专注于从根本原因入手。"
                }
            ],
            contact_title: "联系方式",
            whatsapp_btn: "通过 WhatsApp 联系",
            email_label: "或发送电子邮件：",
            closing: "所有咨询均以清晰、尊重和道德界限进行。\n提供的指导仅供参考和决策支持 — 并非保证。"
        },
        ms: {
            intro: "Pilih perkhidmatan anda dan hubungi dengan mudah melalui WhatsApp atau Emel.\nKejelasan dahulu — keputusan menyusul.",
            services_title: "Perkhidmatan Kami",
            services: [
                {
                    name: "Xin Jian (Analisis Takdir & Keputusan)",
                    desc: "Panduan analitik untuk arah hidup, masa, dan kejelasan keputusan."
                },
                {
                    name: "Qi Men Dun Jia",
                    desc: "Analisis masa strategik dan situasi untuk keputusan yang lebih baik."
                },
                {
                    name: "Perubatan Tradisional Cina (TCM)",
                    desc: "Diagnosis dan rawatan diperibadikan yang menumpukan pada punca utama."
                }
            ],
            contact_title: "Pilihan Hubungi",
            whatsapp_btn: "Hubungi melalui WhatsApp",
            email_label: "Atau Emel:",
            closing: "Semua konsultasi dijalankan dengan kejelasan, rasa hormat, dan batasan etika.\nPanduan disediakan untuk rujukan dan sokongan keputusan — bukan jaminan."
        }
    };

    const t = content[lang];

    return (
        <div className="service-entry-page">
            <div className="se-container">

                {/* Section A: Introduction */}
                <motion.div
                    className="se-intro"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="intro-text">{t.intro}</p>
                </motion.div>

                {/* Section B: Service Selection */}
                <motion.div
                    className="se-services"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2 className="section-title">{t.services_title}</h2>
                    <div className="services-list">
                        {t.services.map((service, index) => (
                            <div key={index} className="service-item">
                                <h3 className="service-name">{service.name}</h3>
                                <p className="service-desc">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Section C: Contact Options */}
                <motion.div
                    className="se-contact"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <h2 className="section-title">{t.contact_title}</h2>

                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-button"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        {t.whatsapp_btn}
                    </a>

                    <div className="email-option">
                        <p className="email-label">{t.email_label}</p>
                        <a href={`mailto:${email}`} className="email-link">{email}</a>
                    </div>
                </motion.div>

                {/* Section D: Closing Guidance */}
                <motion.div
                    className="se-closing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <p className="closing-text">{t.closing}</p>
                </motion.div>

            </div>

            <style>{`
        .service-entry-page {
          min-height: 100vh;
          background: #FAFAFA;
          padding: 8rem 2rem 4rem;
        }

        .se-container {
          max-width: 800px;
          margin: 0 auto;
        }

        /* Section A: Introduction */
        .se-intro {
          margin-bottom: 4rem;
          text-align: center;
        }

        .intro-text {
          font-size: 1.3rem;
          line-height: 1.8;
          color: #333;
          white-space: pre-line;
          font-weight: 400;
        }

        /* Section B: Services */
        .se-services {
          margin-bottom: 4rem;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: 2rem;
          color: #111;
          margin-bottom: 2rem;
          text-align: center;
        }

        .services-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .service-item {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .service-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .service-name {
          font-family: var(--font-display);
          font-size: 1.5rem;
          color: #2C5E4F;
          margin-bottom: 0.8rem;
        }

        .service-desc {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #555;
        }

        /* Section C: Contact */
        .se-contact {
          background: white;
          padding: 3rem;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          margin-bottom: 4rem;
          text-align: center;
        }

        .whatsapp-button {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          background: #25D366;
          color: white;
          padding: 1.2rem 2.5rem;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s;
          margin-bottom: 2rem;
          box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
        }

        .whatsapp-button:hover {
          background: #20BA5A;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
        }

        .email-option {
          padding-top: 2rem;
          border-top: 1px solid #eee;
        }

        .email-label {
          font-size: 1rem;
          color: #666;
          margin-bottom: 0.8rem;
        }

        .email-link {
          font-size: 1.2rem;
          color: #2C5E4F;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.3s;
        }

        .email-link:hover {
          opacity: 0.7;
          text-decoration: underline;
        }

        /* Section D: Closing */
        .se-closing {
          text-align: center;
          padding: 2rem;
          background: rgba(44, 94, 79, 0.05);
          border-left: 4px solid #2C5E4F;
          border-radius: 4px;
        }

        .closing-text {
          font-size: 1rem;
          line-height: 1.8;
          color: #555;
          white-space: pre-line;
          font-style: italic;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .service-entry-page {
            padding: 6rem 1.5rem 3rem;
          }

          .intro-text {
            font-size: 1.1rem;
          }

          .section-title {
            font-size: 1.7rem;
          }

          .service-item {
            padding: 1.5rem;
          }

          .service-name {
            font-size: 1.3rem;
          }

          .se-contact {
            padding: 2rem 1.5rem;
          }

          .whatsapp-button {
            padding: 1rem 2rem;
            font-size: 1rem;
          }

          .email-link {
            font-size: 1rem;
            word-break: break-all;
          }
        }
      `}</style>
        </div>
    );
};

export default ServiceEntry;
