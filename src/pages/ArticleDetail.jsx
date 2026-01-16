import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';

const ArticleDetail = ({ lang }) => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticle();
  }, [slug]);

  const loadArticle = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setArticle(data);
    } catch (error) {
      console.error('Error loading article:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="article-detail-page">
        < div className="container" style={{ paddingTop: '10rem', textAlign: 'center' }}>
          <h2>Loading...</h2>
        </div >
      </div >
    );
  }

  if (!article) {
    return (
      <div className="article-detail-page">
        <div className="container" style={{ paddingTop: '10rem', textAlign: 'center' }}>
          <h2>Article not found</h2>
          <NavLink to="/articles" style={{ color: '#2C5E4F', marginTop: '1rem', display: 'inline-block' }}>
            ← Back to Articles
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="article-detail-page">
      <div className="article-header" style={{ backgroundImage: `url(${article.image})` }}>
        <div className="article-overlay" />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="header-content"
          >
            <span className="article-category">{article.category}</span>
            <h1 className="article-title">{article[`title_${lang}`]}</h1>
            <div className="article-meta">
              <span>{article.author}</span>
              <span>•</span>
              <span>{new Date(article.created_at).toLocaleDateString(lang === 'zh' ? 'zh-CN' : lang === 'ms' ? 'ms-MY' : 'en-US')}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="article-body">
        <div className="container">
          <div className="article-content">
            <div
              className="content-text"
              dangerouslySetInnerHTML={{ __html: article[`content_${lang}`] || article[`excerpt_${lang}`] }}
            />

            <div className="article-footer">
              <NavLink to="/articles" className="back-link">← Back to Articles</NavLink>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .article-detail-page {
          background: #FAFAFA;
          min-height: 100vh;
        }

        .article-header {
          height: 60vh;
          background-size: cover;
          background-position: center;
          position: relative;
          display: flex;
          align-items: flex-end;
          padding-bottom: 3rem;
        }

        .article-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7));
        }

        .header-content {
          position: relative;
          z-index: 10;
          color: white;
        }

        .article-category {
          display: inline-block;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .article-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3.5rem);
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .article-meta {
          display: flex;
          gap: 0.8rem;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .article-body {
          padding: 4rem 0;
        }

        .article-content {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          padding: 3rem;
          border-radius: 8px;
          box-shadow: 0 2px 20px rgba(0,0,0,0.05);
        }

        .content-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #333;
        }

        .content-text p {
          margin-bottom: 1.5rem;
        }

        .content-text h2 {
          font-family: var(--font-display);
          font-size: 2rem;
          margin: 2rem 0 1rem;
          color: #111;
        }

        .content-text h3 {
          font-family: var(--font-display);
          font-size: 1.5rem;
          margin: 1.5rem 0 1rem;
          color: #222;
        }

        .content-text img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
          margin: 1.5rem 0;
        }

        .article-footer {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #eee;
        }

        .back-link {
          color: #2C5E4F;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.3s;
        }

        .back-link:hover {
          opacity: 0.7;
        }

        @media (max-width: 768px) {
          .article-content {
            padding: 2rem 1.5rem;
          }
          .article-header {
            height: 50vh;
          }
        }
      `}</style>
    </div>
  );
};

export default ArticleDetail;
