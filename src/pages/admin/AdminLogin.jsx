import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple password check (in production, use proper authentication)
        if (password === 'rusheng2024') {
            localStorage.setItem('adminAuth', 'true');
            navigate('/admin/articles');
        } else {
            setError('Invalid password');
        }
    };

    return (
        <div className="admin-login">
            <div className="login-container">
                <h1>Admin Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin password"
                            autoFocus
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="btn-primary">Login</button>
                </form>
                <p className="hint">Hint: rusheng2024</p>
            </div>

            <style>{`
        .admin-login {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #2C5E4F 0%, #1a3b31 100%);
        }

        .login-container {
          background: white;
          padding: 3rem;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          width: 100%;
          max-width: 400px;
        }

        .login-container h1 {
          font-family: var(--font-display);
          font-size: 2rem;
          margin-bottom: 2rem;
          text-align: center;
          color: #111;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
        }

        .form-group input {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }

        .form-group input:focus {
          outline: none;
          border-color: #2C5E4F;
        }

        .btn-primary {
          width: 100%;
          padding: 1rem;
          background: #2C5E4F;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }

        .btn-primary:hover {
          background: #1a3b31;
        }

        .error {
          color: #d32f2f;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .hint {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.85rem;
          color: #666;
        }
      `}</style>
        </div>
    );
};

export default AdminLogin;
