import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageGate = ({ onSelectLang }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if language has already been selected
        const savedLang = localStorage.getItem('user_lang_preference');
        if (!savedLang) {
            setIsVisible(true);
        }
    }, []);

    const handleSelect = (lang) => {
        localStorage.setItem('user_lang_preference', lang);
        onSelectLang(lang);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="language-gate-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="gate-content">
                    <motion.div
                        className="gate-logo"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="gate-brand">Live True Care</span>
                        <span className="gate-sub">Master Rusheng</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Welcome / Selamat Datang / 欢迎
                    </motion.h2>

                    <motion.p
                        className="gate-instruction"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Please select your preferred language
                    </motion.p>

                    <div className="gate-buttons">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSelect('en')}
                            className="btn-lang"
                        >
                            English
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSelect('ms')}
                            className="btn-lang"
                        >
                            Bahasa Melayu
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSelect('zh')}
                            className="btn-lang"
                        >
                            中文 (Chinese)
                        </motion.button>
                    </div>
                </div>

                <style>{`
          .language-gate-overlay {
            position: fixed;
            inset: 0;
            background: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(15px);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-family: 'Inter', sans-serif;
          }

          .gate-content {
            text-align: center;
            max-width: 500px;
            padding: 2rem;
            border: 1px solid rgba(255, 215, 0, 0.1);
            border-radius: 12px;
            background: linear-gradient(145deg, rgba(20,20,20,0.8), rgba(10,10,10,0.95));
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
          }

          .gate-logo {
            margin-bottom: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .gate-brand {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            letter-spacing: 0.1em;
            color: #D4AF37; /* Gold */
            text-transform: uppercase;
          }

          .gate-sub {
            font-family: monospace;
            font-size: 0.9rem;
            color: #888;
            margin-top: 0.5rem;
            letter-spacing: 0.2em;
          }

          h2 {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
            font-weight: 400;
            color: #eee;
          }

          .gate-instruction {
            color: #999;
            margin-bottom: 3rem;
            font-size: 0.95rem;
          }

          .gate-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: 100%;
          }

          .btn-lang {
            padding: 1rem;
            background: transparent;
            border: 1px solid rgba(255,255,255,0.15);
            color: white;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            border-radius: 4px;
          }

          .btn-lang:hover {
            border-color: #D4AF37;
            background: rgba(212, 175, 55, 0.1);
            color: #D4AF37;
          }
        `}</style>
            </motion.div>
        </AnimatePresence>
    );
};

export default LanguageGate;
