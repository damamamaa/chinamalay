import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { supabase } from '../../supabaseClient';
import { uploadImage } from '../../utils/imageUtils';

const AdminArticleFormPro = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;
    const fileInputRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [formData, setFormData] = useState({
        title_en: '',
        title_zh: '',
        title_ms: '',
        excerpt_en: '',
        excerpt_zh: '',
        excerpt_ms: '',
        content_en: '',
        content_zh: '',
        content_ms: '',
        image: '',
        category: 'TCM',
        slug: ''
    });

    // Quill modules configuration
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
        ],
    };

    useEffect(() => {
        const auth = localStorage.getItem('adminAuth');
        if (!auth) {
            navigate('/admin');
            return;
        }

        if (isEdit) {
            loadArticle();
        }
    }, [id, isEdit, navigate]);

    const loadArticle = async () => {
        try {
            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;

            if (data) {
                setFormData({
                    title_en: data.title_en,
                    title_zh: data.title_zh,
                    title_ms: data.title_ms,
                    excerpt_en: data.excerpt_en,
                    excerpt_zh: data.excerpt_zh,
                    excerpt_ms: data.excerpt_ms,
                    content_en: data.content_en || '',
                    content_zh: data.content_zh || '',
                    content_ms: data.content_ms || '',
                    image: data.image,
                    category: data.category,
                    slug: data.slug
                });
            }
        } catch (error) {
            console.error('Error loading article:', error);
            alert('Error loading article');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Auto-generate slug from English title
        if (name === 'title_en' && !isEdit) {
            const slug = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
    };

    const handleContentChange = (content, lang) => {
        setFormData(prev => ({ ...prev, [`content_${lang}`]: content }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        setUploadingImage(true);
        try {
            const publicUrl = await uploadImage(file, supabase);
            setFormData(prev => ({ ...prev, image: publicUrl }));
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Upload error:', error);
            alert('Error uploading image: ' + error.message);
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const articleData = {
                title_en: formData.title_en,
                title_zh: formData.title_zh,
                title_ms: formData.title_ms,
                excerpt_en: formData.excerpt_en,
                excerpt_zh: formData.excerpt_zh,
                excerpt_ms: formData.excerpt_ms,
                content_en: formData.content_en,
                content_zh: formData.content_zh,
                content_ms: formData.content_ms,
                image: formData.image,
                category: formData.category,
                slug: formData.slug,
                author: 'Rusheng',
                updated_at: new Date().toISOString()
            };

            if (isEdit) {
                const { error } = await supabase
                    .from('articles')
                    .update(articleData)
                    .eq('id', id);

                if (error) throw error;
            } else {
                articleData.created_at = new Date().toISOString();

                const { error } = await supabase
                    .from('articles')
                    .insert([articleData]);

                if (error) throw error;
            }

            alert(isEdit ? 'Article updated successfully!' : 'Article created successfully!');
            navigate('/admin/articles');
        } catch (error) {
            console.error('Error saving article:', error);
            alert('Error saving article: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-form-page">
            <div className="admin-header">
                <div className="container">
                    <h1>{isEdit ? 'Edit Article' : 'New Article'}</h1>
                </div>
            </div>

            <div className="form-container">
                <div className="container">
                    <form onSubmit={handleSubmit} className="article-form">

                        <div className="form-section">
                            <h3>Basic Information</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Category</label>
                                    <select name="category" value={formData.category} onChange={handleChange} required>
                                        <option value="TCM">TCM</option>
                                        <option value="Xin Jian">Xin Jian</option>
                                        <option value="Wellness">Wellness</option>
                                        <option value="Lifestyle">Lifestyle</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Slug (URL)</label>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        placeholder="article-url-slug"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Featured Image</label>
                                <div className="image-upload-section">
                                    {formData.image && (
                                        <div className="image-preview">
                                            <img src={formData.image} alt="Preview" />
                                        </div>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        style={{ display: 'none' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current.click()}
                                        className="btn-upload"
                                        disabled={uploadingImage}
                                    >
                                        {uploadingImage ? 'Uploading & Converting to WebP...' : '📁 Upload Image (Auto WebP)'}
                                    </button>
                                    <p className="help-text">Image will be automatically converted to WebP format</p>
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Title (All Languages)</h3>
                            <div className="form-group">
                                <label>English</label>
                                <input
                                    type="text"
                                    name="title_en"
                                    value={formData.title_en}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Chinese (中文)</label>
                                <input
                                    type="text"
                                    name="title_zh"
                                    value={formData.title_zh}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Malay</label>
                                <input
                                    type="text"
                                    name="title_ms"
                                    value={formData.title_ms}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Excerpt (Short Description)</h3>
                            <div className="form-group">
                                <label>English</label>
                                <textarea
                                    name="excerpt_en"
                                    value={formData.excerpt_en}
                                    onChange={handleChange}
                                    rows="3"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Chinese (中文)</label>
                                <textarea
                                    name="excerpt_zh"
                                    value={formData.excerpt_zh}
                                    onChange={handleChange}
                                    rows="3"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Malay</label>
                                <textarea
                                    name="excerpt_ms"
                                    value={formData.excerpt_ms}
                                    onChange={handleChange}
                                    rows="3"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Full Content (Rich Text Editor)</h3>

                            <div className="form-group">
                                <label>English Content</label>
                                <ReactQuill
                                    theme="snow"
                                    value={formData.content_en}
                                    onChange={(content) => handleContentChange(content, 'en')}
                                    modules={modules}
                                    className="rich-editor"
                                />
                            </div>

                            <div className="form-group">
                                <label>Chinese Content (中文)</label>
                                <ReactQuill
                                    theme="snow"
                                    value={formData.content_zh}
                                    onChange={(content) => handleContentChange(content, 'zh')}
                                    modules={modules}
                                    className="rich-editor"
                                />
                            </div>

                            <div className="form-group">
                                <label>Malay Content</label>
                                <ReactQuill
                                    theme="snow"
                                    value={formData.content_ms}
                                    onChange={(content) => handleContentChange(content, 'ms')}
                                    modules={modules}
                                    className="rich-editor"
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/articles')}
                                className="btn-cancel"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-submit"
                                disabled={loading || uploadingImage}
                            >
                                {loading ? 'Saving...' : (isEdit ? 'Update Article' : 'Create Article')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style>{`
        .admin-form-page {
          min-height: 100vh;
          background: #f5f5f5;
          padding-bottom: 4rem;
        }

        .admin-header {
          background: #2C5E4F;
          color: white;
          padding: 2rem 0;
        }

        .admin-header h1 {
          font-family: var(--font-display);
          font-size: 2rem;
          margin: 0;
        }

        .form-container {
          padding: 3rem 0;
        }

        .article-form {
          background: white;
          padding: 3rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          max-width: 1200px;
          margin: 0 auto;
        }

        .form-section {
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #eee;
        }

        .form-section:last-of-type {
          border-bottom: none;
        }

        .form-section h3 {
          font-family: var(--font-display);
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: #111;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 1rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
          font-size: 0.9rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          font-family: inherit;
        }

        .form-group textarea {
          resize: vertical;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #2C5E4F;
        }

        .image-upload-section {
          border: 2px dashed #ddd;
          padding: 2rem;
          border-radius: 8px;
          text-align: center;
        }

        .image-preview {
          margin-bottom: 1rem;
        }

        .image-preview img {
          max-width: 400px;
          max-height: 300px;
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .btn-upload {
          padding: 1rem 2rem;
          background: #2196F3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s;
        }

        .btn-upload:hover:not(:disabled) {
          background: #1976D2;
        }

        .btn-upload:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .help-text {
          margin-top: 0.5rem;
          font-size: 0.85rem;
          color: #666;
        }

        .rich-editor {
          background: white;
          border-radius: 4px;
        }

        .rich-editor .ql-container {
          min-height: 300px;
          font-size: 1rem;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
        }

        .btn-cancel,
        .btn-submit {
          padding: 1rem 2rem;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
        }

        .btn-cancel {
          background: #f5f5f5;
          color: #666;
        }

        .btn-submit {
          background: #2C5E4F;
          color: white;
        }

        .btn-cancel:hover:not(:disabled) {
          background: #e0e0e0;
        }

        .btn-submit:hover:not(:disabled) {
          background: #1a3b31;
        }

        .btn-cancel:disabled,
        .btn-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .article-form {
            padding: 2rem 1.5rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
          }

          .btn-cancel,
          .btn-submit {
            width: 100%;
          }

          .image-preview img {
            max-width: 100%;
          }
        }
      `}</style>
        </div>
    );
};

export default AdminArticleFormPro;
