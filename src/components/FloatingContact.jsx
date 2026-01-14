import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../content';

const FloatingContact = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I am Rusheng's AI Assistant. How can I help you find balance today?", isBot: true }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { text: input, isBot: false };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        try {
            const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

            if (!apiKey || apiKey.includes('YOUR-KEY')) {
                console.error("Chat Error: API Key is missing or invalid in environment variables.");
                setMessages(prev => [...prev, {
                    text: "System Configuration Error: API Key is missing. Please check your website settings.",
                    isBot: true
                }]);
                return;
            }

            const systemContext = `
You are the AI Assistant for 'Rusheng', a professional practice offering Traditional Chinese Medicine (TCM) and Xin Jian (Destiny Analysis/Feng Shui).
Your goal is to answer visitor questions clearly and professionally based ONLY on the context provided below.

CONTEXT_START
${JSON.stringify(content, null, 2)}
CONTEXT_END

STRICT GUIDELINES:
1.  **NO MARKDOWN**: Do not use bold (**), italics (*), headers (#), lists (-/1.), or any other markdown symbols. Use strictly plain text with normal punctuation.
2.  **PROFESSIONAL TONE**: Be polite, calm, and wise. Matches the brand 'Balance, Clarity, Responsibility'.
3.  **ACCURATE**: Only answer based on the context. If you don't know, ask them to contact Master Rusheng via WhatsApp.
4.  **CONCISE**: Keep answers brief (under 3-4 sentences if possible) unless a detailed explanation is requested.
5.  **LANGUAGE**: Respond in the same language as the user (English, Malay, or Chinese).
`;

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": window.location.origin, // Required by OpenRouter
                    "X-Title": "Rusheng Website"
                },
                body: JSON.stringify({
                    model: "deepseek/deepseek-chat",
                    messages: [
                        { role: "system", content: systemContext },
                        ...messages.map(m => ({
                            role: m.isBot ? "assistant" : "user",
                            content: m.text
                        })),
                        { role: "user", content: input }
                    ],
                    temperature: 0.7,
                    max_tokens: 300
                })
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                console.error("OpenRouter API Error:", response.status, errData);
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            const botReply = data.choices[0].message.content || "I apologize, I am having trouble connecting clearly right now.";

            // Final clean up just in case
            const cleanReply = botReply.replace(/[*#_`]/g, '');

            setMessages(prev => [...prev, { text: cleanReply, isBot: true }]);

        } catch (error) {
            console.error("Chat Error:", error);

            // Default fallback
            let fallbackMsg = "I apologize, but I am currently experiencing high traffic. Please try again later or contact us directly via WhatsApp.";

            // Simple fallback if offline
            if (input.toLowerCase().includes('tcm')) fallbackMsg = "We offer Acupuncture, Cupping, and Tuina based on root cause diagnosis.";
            if (input.toLowerCase().includes('feng shui') || input.toLowerCase().includes('bazi')) fallbackMsg = "We provide BaZi analysis and Feng Shui audits to help navigate your destiny.";

            setMessages(prev => [...prev, {
                text: fallbackMsg,
                isBot: true
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            {/* 1. WHATSAPP BUTTON (Bottom) */}
            <a
                href="https://wa.me/6596961237"
                target="_blank"
                rel="noopener noreferrer"
                className="fab-whatsapp"
                aria-label="Chat on WhatsApp"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="wa-icon">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            </a>

            {/* 2. AI CHAT TRIGGER (Above WA) */}
            <button className="fab-ai" onClick={toggleChat}>
                <div className="ai-avatar-container">

                    <img src="/rusheng_real.webp" alt="Rusheng AI" className="ai-avatar" />
                    <span className="online-dot"></span>
                </div>
                <span className="ai-label">Ask Rusheng</span>
            </button>

            {/* 3. CHAT WINDOW */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="ai-chat-window"
                    >
                        <div className="chat-header">
                            <div className="header-info">

                                <img src="/rusheng_real.webp" alt="Bot" className="header-avatar" />
                                <div>
                                    <h4>Rusheng AI</h4>
                                    <span className="status">Always here to help</span>
                                </div>
                            </div>
                            <button onClick={toggleChat} className="close-btn">&times;</button>
                        </div>

                        <div className="chat-body">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`msg-row ${msg.isBot ? 'bot' : 'user'}`}>
                                    <div className="msg-bubble">
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="msg-row bot">
                                    <div className="msg-bubble typing">
                                        <span>.</span><span>.</span><span>.</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form className="chat-input" onSubmit={handleSend}>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isTyping}
                            />
                            <button type="submit" disabled={isTyping || !input.trim()}>
                                {isTyping ? '...' : '→'}
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        /* WhatsApp Floating Button */
        .fab-whatsapp {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 60px;
            height: 60px;
            background: #25D366;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 9990;
            transition: transform 0.3s ease;
        }
        .fab-whatsapp:hover { transform: scale(1.1); }
        .wa-icon { width: 35px; height: 35px; }

        /* AI Fab Trigger */
        .fab-ai {
            position: fixed;
            bottom: 7.5rem; /* Above WA button */
            right: 2.2rem;   /* Aligned centerish */
            background: #0E0D0C;
            border: 1px solid rgba(255,255,255,0.2);
            padding: 0.5rem 1rem 0.5rem 0.5rem;
            border-radius: 50px;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0,0,0,0.4);
            z-index: 9990;
            color: white;
            transition: all 0.3s ease;
        }

        .fab-ai:hover { background: #1a1a1a; transform: translateY(-3px); }

        .ai-avatar-container {
            position: relative;
            width: 40px;
            height: 40px;
        }

        .ai-avatar {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #C8B273; /* Gold border */
        }

        .online-dot {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 10px;
            height: 10px;
            background: #25D366;
            border: 2px solid #0E0D0C;
            border-radius: 50%;
        }

        .ai-label {
            font-family: var(--font-display);
            font-size: 0.9rem;
            font-weight: 600;
        }

        /* Chat Window */
        .ai-chat-window {
            position: fixed;
            bottom: 8rem;
            right: 2rem;
            width: 320px;
            height: 450px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 9991;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            font-family: var(--font-body);
        }

        .chat-header {
            background: #0E0D0C;
            color: white;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .header-info {
            display: flex;
            align-items: center;
            gap: 0.8rem;
        }

        .header-avatar {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            object-fit: cover;
            border: 1px solid #C8B273;
        }

        .header-info h4 { font-size: 1rem; margin-bottom: 2px; }
        .status { font-size: 0.7rem; color: #ccc; }

        .close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        }

        .chat-body {
            flex-grow: 1;
            padding: 1rem;
            background: #f5f5f5;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .msg-row { display: flex; }
        .msg-row.user { justify-content: flex-end; }
        .msg-row.bot { justify-content: flex-start; }

        .msg-bubble {
            max-width: 80%;
            padding: 0.8rem 1rem;
            border-radius: 12px;
            font-size: 0.9rem;
            line-height: 1.4;
        }

        .bot .msg-bubble {
            background: white;
            color: #333;
            border-bottom-left-radius: 2px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        
        .msg-bubble.typing {
            font-size: 1.5rem;
            line-height: 1rem;
            color: #ccc;
            padding: 0.5rem 1rem;
        }
        
        .msg-bubble.typing span {
            animation: blink 1.4s infinite both;
        }
        .msg-bubble.typing span:nth-child(2) { animation-delay: 0.2s; }
        .msg-bubble.typing span:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes blink { 0% { opacity: 0.2; } 50% { opacity: 1; } 100% { opacity: 0.2; } }

        .user .msg-bubble {
            background: #0E0D0C;
            color: white;
            border-bottom-right-radius: 2px;
        }

        .chat-input {
            padding: 1rem;
            background: white;
            border-top: 1px solid #eee;
            display: flex;
            gap: 0.5rem;
        }

        .chat-input input {
            flex-grow: 1;
            padding: 0.8rem;
            border: 1px solid #ddd;
            border-radius: 20px;
            outline: none;
        }
        
        .chat-input button {
            background: #0E0D0C;
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            transition: background 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .chat-input button:hover { background: #333; }
        .chat-input button:disabled { background: #ccc; cursor: not-allowed; }
        
        @media (max-width: 480px) {
            .fab-ai { bottom: 6rem; right: 1rem; }
            .fab-whatsapp { bottom: 1.5rem; right: 1rem; }
            .ai-chat-window { bottom: 0; right: 0; width: 100%; height: 100%; border-radius: 0; }
        }

      `}</style>
        </>
    );
};

export default FloatingContact;
