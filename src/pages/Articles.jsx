import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';

const Articles = ({ lang }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const t = {
    en: { title: 'Articles & Insights', subtitle: 'Knowledge from Traditional Wisdom', readMore: 'Read More', loading: 'Loading articles...' },
    zh: { title: '文章与洞察', subtitle: '来自传统智慧的知识', readMore: '阅读更多', loading: '加载文章中...' },
    ms: { title: 'Artikel & Wawasan', subtitle: 'Pengetahuan daripada Kebijaksanaan Tradisional', readMore: 'Baca Lagi', loading: 'Memuatkan artikel...' }
  };

  return (
    <div className="articles-page">
      <div className="articles-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="page-title">{t[lang].title}</h1>
            <p className="page-subtitle">{t[lang].subtitle}</p>
          </motion.div>
        </div>
      </div>

      <div className="articles-content section-padding">
        <div className="container">
          {loading ? (
            <div className="loading-state">
              <p>{t[lang].loading}</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="empty-state">
              <p>No articles yet. Check back soon!</p>
            </div>
          ) : (
            <div className="articles-grid">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="article-card"
                >
                  <NavLink to={`/articles/${article.slug}`}>
                    <div className="article-image" style={{ backgroundImage: `url(${article.image})` }} />
                    <div className="article-content">
                      <span className="article-category">{article.category}</span>
                      <h3 className="article-title">{article[`title_${lang}`]}</h3>
                      <p className="article-excerpt">{article[`excerpt_${lang}`]}</p>
                      <span className="read-more">{t[lang].readMore} →</span>
                    </div>
                  </NavLink>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .articles-page {
          background: #FAFAFA;
          min-height: 100vh;
        }

        .articles-hero {
          background: linear-gradient(135deg, #2C5E4F 0%, #1a3b31 100%);
          color: white;
          padding: 8rem 0 4rem;
          text-align: center;
        }

        .page-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 4rem);
          margin-bottom: 1rem;
        }

        .page-subtitle {
          font-size: 1.2rem;
          opacity: 0.9;
        }

        .articles-content {
          padding: 4rem 0;
        }

        .loading-state,
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          font-size: 1.2rem;
          color: #666;
        }

        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }

        .article-card {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .article-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .article-image {
          height: 220px;
          background-size: cover;
          background-position: center;
        }

        .article-content {
          padding: 1.5rem;
        }

        .article-category {
          display: inline-block;
          background: #E8F5E9;
          color: #2C5E4F;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .article-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          margin-bottom: 0.8rem;
          color: #111;
        }

        .article-excerpt {
          color: #666;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .read-more {
          color: #2C5E4F;
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @media (max-width: 768px) {
          .articles-grid {
            grid-template-columns: 1fr;
          }
          .articles-hero {
            padding: 6rem 0 3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Articles;
