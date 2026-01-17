import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const AdminArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (!auth) {
      navigate('/admin');
      return;
    }

    loadArticles();
  }, [navigate]);

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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        const { error } = await supabase
          .from('articles')
          .delete()
          .eq('id', id);

        if (error) throw error;

        // Reload articles
        loadArticles();
        alert('Article deleted successfully');
      } catch (error) {
        console.error('Error deleting article:', error);
        alert('Error deleting article: ' + error.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  return (
    <div className="admin-articles">
      <div className="admin-header">
        <div className="container">
          <div className="header-content">
            <h1>Manage Articles</h1>
            <div className="header-actions">
              <NavLink to="/admin/articles/new" className="btn-create">+ New Article</NavLink>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="container">
          {loading ? (
            <div className="loading-state">
              <p>Loading articles...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="empty-state">
              <p>No articles yet. Create your first article!</p>
              <NavLink to="/admin/articles/new" className="btn-primary">Create Article</NavLink>
            </div>
          ) : (
            <div className="articles-table">
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title (EN)</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map(article => (
                    <tr key={article.id}>
                      <td>
                        <div className="table-image" style={{ backgroundImage: `url(${article.image})` }} />
                      </td>
                      <td>{article.title_en}</td>
                      <td><span className="badge">{article.category}</span></td>
                      <td>{new Date(article.created_at).toLocaleDateString()}</td>
                      <td>
                        <div className="action-buttons">
                          <NavLink to={`/admin/articles/${article.id}/edit`} className="btn-edit">Edit</NavLink>
                          <button onClick={() => handleDelete(article.id)} className="btn-delete">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .admin-articles {
          min-height: 100vh;
          background: #f5f5f5;
        }

        .admin-header {
          background: #2C5E4F;
          color: white;
          padding: 2rem 0;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-content h1 {
          font-family: var(--font-display);
          font-size: 2rem;
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }

        .btn-create, .btn-logout {
          padding: 0.8rem 1.5rem;
          border-radius: 4px;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-create {
          background: white;
          color: #2C5E4F;
        }

        .btn-logout {
          background: transparent;
          color: white;
          border: 1px solid white;
        }

        .btn-create:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .btn-logout:hover {
          background: rgba(255,255,255,0.1);
        }

        .admin-content {
          padding: 3rem 0;
        }

        .loading-state,
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: 8px;
        }

        .empty-state p {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 2rem;
        }

        .btn-primary {
          display: inline-block;
          padding: 1rem 2rem;
          background: #2C5E4F;
          color: white;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 600;
        }

        .articles-table {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: #f5f5f5;
        }

        th, td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        th {
          font-weight: 600;
          color: #333;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
        }

        .table-image {
          width: 80px;
          height: 60px;
          background-size: cover;
          background-position: center;
          border-radius: 4px;
        }

        .badge {
          display: inline-block;
          padding: 0.3rem 0.8rem;
          background: #E8F5E9;
          color: #2C5E4F;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .btn-edit, .btn-delete {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
        }

        .btn-edit {
          background: #2196F3;
          color: white;
        }

        .btn-delete {
          background: #f44336;
          color: white;
        }

        .btn-edit:hover, .btn-delete:hover {
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }

          .header-actions {
            width: 100%;
            display: flex;
            justify-content: center;
          }

          /* Mobile Friendly Card View for Table */
          .articles-table {
            background: transparent;
            box-shadow: none;
          }

          table, thead, tbody, th, td, tr {
            display: block;
          }

          thead tr {
            position: absolute;
            top: -9999px;
            left: -9999px;
          }

          tr {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            margin-bottom: 1.5rem;
            padding: 1.5rem;
            position: relative;
          }

          td {
            border: none;
            position: relative;
            padding: 0.5rem 0;
            padding-left: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            text-align: right;
          }

          /* Force image to be top full width or large thumbnail */
          td:nth-of-type(1) {
            justify-content: center;
            margin-bottom: 1rem;
            padding: 0;
          }
          
          .table-image {
            width: 100%;
            height: 180px;
            border-radius: 6px;
          }

          /* Title */
          td:nth-of-type(2) {
            display: block;
            text-align: left;
            font-size: 1.2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
          }

          /* Category & Date */
          td:nth-of-type(3), td:nth-of-type(4) {
            flex-direction: row;
            justify-content: flex-start;
            gap: 0.5rem;
            font-size: 0.9rem;
            color: #666;
            padding: 0.2rem 0;
          }

          /* Actions */
          td:nth-of-type(5) {
            margin-top: 1.5rem;
            justify-content: stretch;
            gap: 1rem;
          }

          .action-buttons {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }

          .btn-edit, .btn-delete {
            text-align: center;
            padding: 0.8rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminArticles;
