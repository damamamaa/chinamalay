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
        <div className="container" style={{ paddingTop: '10rem', textAlign: 'center' }}>
          <h2>Loading...</h2>
        </div>
      </div>
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
    <div className="article-detail-page-medium">
      {/* Header - Minimal, clean */}
      <div className="article-header">
        <div className="header-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="category-badge">{article.category}</span>
            <h1 className="article-title">{article[`title_${lang}`]}</h1>

            <div className="article-meta">
              <div className="author-info">
                <div className="author-avatar">
                  {article.author.charAt(0).toUpperCase()}
                </div>
                <div className="author-details">
                  <span className="author-name">{article.author}</span>
                  <div className="meta-secondary">
                    <span className="publish-date">
                      {new Date(article.created_at).toLocaleDateString(lang === 'zh' ? 'zh-CN' : lang === 'ms' ? 'ms-MY' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="reading-time">• 5 min read</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Image - Full Width like Medium */}
      <motion.div
        className="featured-image-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <img src={article.image} alt={article[`title_${lang}`]} className="featured-image" />
      </motion.div>

      {/* Article Body - Medium Style */}
      <div className="article-body-medium">
        <div className="content-container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {/* Excerpt/Lead */}
            {article[`excerpt_${lang}`] && (
              <div className="article-excerpt">
                {article[`excerpt_${lang}`]}
              </div>
            )}

            {/* Main Content */}
            <div
              className="article-content-medium"
              dangerouslySetInnerHTML={{ __html: article[`content_${lang}`] }}
            />
          </motion.div>
        </div>
      </div>

      {/* Back to Articles */}
      <div className="article-footer">
        <div className="content-container">
          <NavLink to="/articles" className="back-link">
            ← {lang === 'zh' ? '返回文章列表' : lang === 'ms' ? 'Kembali ke Artikel' : 'Back to Articles'}
          </NavLink>
        </div>
      </div>

      <style>{`
        /* ===== MEDIUM-STYLE ARTICLE LAYOUT ===== */
        .article-detail-page-medium {
          background: #fff;
          min-height: 100vh;
        }

        /* Header Section */
        .article-header {
          max-width: 680px;
          margin: 0 auto;
          padding: 6rem 20px 3rem;
        }

        .header-container {
          position: relative;
        }

        .category-badge {
          display: inline-block;
          font-size: 14px;
          font-weight: 600;
          color: #6B6B6B;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 1.5rem;
        }

        .article-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 48px;
          font-weight: 700;
          line-height: 1.15;
          color: #242424;
          margin: 0 0 2rem 0;
          letter-spacing: -0.02em;
        }

        .article-meta {
          display: flex;
          align-items: center;
          padding: 1.5rem 0;
          border-top: 1px solid #E6E6E6;
          border-bottom: 1px solid #E6E6E6;
        }

        .author-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .author-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #2C5E4F;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 18px;
        }

        .author-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .author-name {
          font-size: 16px;
          font-weight: 600;
          color: #242424;
        }

        .meta-secondary {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #6B6B6B;
        }

        /* Featured Image */
        .featured-image-container {
          width: 100%;
          max-width: 100%;
          margin: 0 0 4rem 0;
        }

        .featured-image {
          width: 100%;
          height: auto;
          max-height: 600px;
          object-fit: cover;
          display: block;
        }

        /* Article Body */
        .article-body-medium {
          margin: 3rem 0 6rem;
        }

        .content-container {
          max-width: 680px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .article-excerpt {
          font-size: 21px;
          line-height: 1.7;
          color: #6B6B6B;
          font-style: italic;
          margin-bottom: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #E6E6E6;
        }

        /* Main Content Styling - MEDIUM STYLE */
        .article-content-medium {
          font-family: "Charter", Georgia, serif;
          font-size: 21px;
          line-height: 1.7;
          color: #242424;
          letter-spacing: -0.003em;
        }

        .article-content-medium p {
          margin: 0 0 2rem 0; /* Generous spacing like Medium */
        }

        .article-content-medium h2 {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 32px;
          font-weight: 700;
          line-height: 1.25;
          margin: 3.5rem 0 1.5rem;
          color: #242424;
          letter-spacing: -0.02em;
        }

        .article-content-medium h3 {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 26px;
          font-weight: 700;
          line-height: 1.3;
          margin: 3rem 0 1.25rem;
          color: #242424;
        }

        .article-content-medium img {
          width: 100%;
          height: auto;
          margin: 3rem 0;
          border-radius: 4px;
        }

        .article-content-medium a {
          color: #2C5E4F;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .article-content-medium a:hover {
          text-decoration-thickness: 2px;
        }

        .article-content-medium blockquote {
          border-left: 3px solid #242424;
          padding-left: 1.5rem;
          margin: 2.5rem 0;
          font-style: italic;
          color: #6B6B6B;
          font-size: 24px;
        }

        .article-content-medium ul,
        .article-content-medium ol {
          margin: 2rem 0;
          padding-left: 2rem;
        }

        .article-content-medium li {
          margin-bottom: 1rem;
        }

        .article-content-medium strong {
          font-weight: 700;
          color: #242424;
        }

        .article-content-medium em {
          font-style: italic;
        }

        .article-content-medium code {
          background: #F4F4F4;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: "Consolas", monospace;
          font-size: 0.9em;
        }

        /* Footer */
        .article-footer {
          padding: 3rem 0 6rem;
          border-top: 1px solid #E6E6E6;
        }

        .back-link {
          display: inline-block;
          font-size: 16px;
          font-weight: 600;
          color: #2C5E4F;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .back-link:hover {
          opacity: 0.7;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .article-header {
            padding: 4rem 20px 2rem;
          }

          .article-title {
            font-size: 36px;
          }

          .featured-image {
            max-height: 400px;
          }

          .article-content-medium {
            font-size: 18px;
          }

          .article-content-medium h2 {
            font-size: 28px;
          }

          .article-content-medium h3 {
            font-size: 22px;
          }

          .article-excerpt {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default ArticleDetail;
