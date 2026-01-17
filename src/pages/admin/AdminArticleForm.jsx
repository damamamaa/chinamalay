import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { uploadImage } from '../../utils/imageUtils';
import RichTextEditor from '../../components/RichTextEditor';
import { motion } from 'framer-motion';

const AdminArticleFormPro = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;
    const fileInputRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    // Preview Mode State
    const [showPreview, setShowPreview] = useState(false);
    const [previewLang, setPreviewLang] = useState('en');

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


    // ===== FEATURED IMAGE UPLOAD (Header/Main Image ONLY) =====
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
            alert('Featured image uploaded successfully!');
        } catch (error) {
            console.error('Featured image upload error:', error);
            alert('Error uploading featured image: ' + error.message);
        } finally {
            setUploadingImage(false);
        }
    };

    // ===== INLINE IMAGE UPLOAD (For rich text editor ONLY) =====
    // This does NOT touch formData.image or uploadingImage state
    const handleInlineImageUpload = async (file) => {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            throw new Error('Invalid file type');
        }

        try {
            const publicUrl = await uploadImage(file, supabase);
            return publicUrl; // Return URL to editor
        } catch (error) {
            console.error('Inline image upload error:', error);
            alert('Error uploading inline image: ' + error.message);
            throw error;
        }
    };


    // --- MAGIC TRANSLATE FEATURE ---
    const handleAutoTranslate = async () => {
        if (!formData.title_en) {
            alert("Please write at least the English Title before translating.");
            return;
        }

        const confirm = window.confirm("✨ Auto-Translate\n\nThis will attempt to translate Title, Excerpt AND Content to Chinese and Malay.\n\nNote: For complex layouts with images, you might need to touch up the translated content.");
        if (!confirm) return;

        setLoading(true);
        try {
            // Using free Google GTX endpoint for demo purposes (robust for short text)
            const translate = async (text, targetLang) => {
                if (!text) return '';
                try {
                    // Split text into smaller chunks if too large (basic safety for GET request)
                    // For now, we try sending direct. 
                    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
                    const res = await fetch(url);
                    const data = await res.json();

                    // API returns array of segments, join them
                    // data[0] is array of [translatedText, originalText, ...]
                    if (data && data[0]) {
                        return data[0].map(x => x[0]).join('');
                    }
                    return text;
                } catch (e) {
                    console.error("Translation fail:", e);
                    return text; // Fallback to original if fail
                }
            };

            // 1. Translate Basic Fields
            const title_zh = await translate(formData.title_en, 'zh-CN');
            const title_ms = await translate(formData.title_en, 'ms');

            const excerpt_zh = await translate(formData.excerpt_en, 'zh-CN');
            const excerpt_ms = await translate(formData.excerpt_en, 'ms');

            // 2. Handle Rich Content
            // We TRY to translate the HTML string. Google Translate often handles basic HTML tags okayish.
            let content_zh = formData.content_en;
            let content_ms = formData.content_en;

            if (formData.content_en) {
                const zRes = await translate(formData.content_en, 'zh-CN');
                if (zRes) content_zh = zRes;

                const mRes = await translate(formData.content_en, 'ms');
                if (mRes) content_ms = mRes;
            }

            setFormData(prev => ({
                ...prev,
                title_zh,
                title_ms,
                excerpt_zh,
                excerpt_ms,
                content_zh,
                content_ms
            }));

            alert("✨ Translation Magic Complete!");

        } catch (error) {
            alert("Translation error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const articleData = {
                ...formData,
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

    // ----------------------------------------------------------------------
    // Preview Mode Render
    // ----------------------------------------------------------------------
    if (showPreview) {
        return (
            <div className="preview-mode-overlay">
                <div className="preview-toolbar">
                    <button onClick={() => setShowPreview(false)} className="btn-close-preview">
                        ← Exit Preview & Continue Editing
                    </button>
                    <div className="lang-switcher">
                        <span style={{ color: 'white', marginRight: '10px' }}>Preview Language:</span>
                        <select
                            value={previewLang}
                            onChange={(e) => setPreviewLang(e.target.value)}
                            style={{ padding: '5px', borderRadius: '4px' }}
                        >
                            <option value="en">English</option>
                            <option value="zh">Chinese</option>
                            <option value="ms">Malay</option>
                        </select>
                    </div>
                    <button onClick={handleSubmit} className="btn-save-preview" disabled={loading}>
                        {loading ? 'Saving...' : 'Save & Publish Now'}
                    </button>
                </div>

                {/* Content Preview (Masterpiece Style) */}
                <div className="article-detail-page-preview">
                    {/* Hero */}
                    <div className="article-hero" style={{ backgroundImage: `url(${formData.image || '/placeholder-image.jpg'})` }}>
                        <div className="hero-overlay" />
                        <div className="hero-content container">
                            <span className="hero-category">{formData.category}</span>
                            <h1 className="hero-title">{formData[`title_${previewLang}`] || '(No Title)'}</h1>
                            <div className="hero-meta">
                                <span className="meta-author">By <strong>Rusheng</strong></span>
                                <span className="meta-separator">•</span>
                                <span className="meta-date">
                                    {new Date().toLocaleDateString(previewLang === 'zh' ? 'zh-CN' : previewLang === 'ms' ? 'ms-MY' : 'en-US', {
                                        year: 'numeric', month: 'long', day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="article-body">
                        <div className="container">
                            <div className="article-content">
                                <div className="content-divider">
                                    <span className="divider-line"></span>
                                    <span className="divider-icon">❖</span>
                                    <span className="divider-line"></span>
                                </div>
                                <div
                                    className="content-text"
                                    dangerouslySetInnerHTML={{
                                        __html: (formData[`content_${previewLang}`] || formData[`excerpt_${previewLang}`]) || '<p>No content written yet...</p>'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <style>{`
                    .preview-mode-overlay {
                        position: fixed;
                        inset: 0;
                        background: white;
                        z-index: 9999;
                        overflow-y: auto;
                    }
                    .preview-toolbar {
                        position: sticky;
                        top: 0;
                        background: #2C5E4F;
                        padding: 1rem 2rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        z-index: 1000;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                    }
                    .btn-close-preview { background: transparent; color: white; border: 1px solid rgba(255,255,255,0.3); padding: 0.5rem 1rem; cursor: pointer; border-radius: 4px; }
                    .btn-save-preview { background: #c5a059; color: #111; border: none; padding: 0.5rem 1.5rem; font-weight: bold; cursor: pointer; border-radius: 4px; }

                    /* REUSED STYLES FROM ARTICLE DETAIL (Simplified for Preview) */
                    :root { --color-gold: #c5a059; --font-serif: "Merriweather", "Georgia", serif; --font-display: "Playfair Display", serif; }
                    .article-detail-page-preview { font-family: var(--font-serif); background: #fff; min-height: 100vh; }
                    .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
                    
                    /* Hero */
                    .article-hero { height: 60vh; min-height: 400px; background-size: cover; background-position: center; position: relative; display: flex; align-items: center; justify-content: center; text-align: center; }
                    .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6)); }
                    .hero-content { position: relative; z-index: 10; color: white; max-width: 900px; }
                    .hero-category { display: inline-block; background: var(--color-gold); color: #111; padding: 0.6rem 1.2rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 2rem; }
                    .hero-title { font-size: 3.5rem; margin-bottom: 2rem; font-family: var(--font-display); line-height: 1.1; }
                    .hero-meta { font-family: sans-serif; opacity: 0.9; }
                    .meta-separator { margin: 0 1rem; color: var(--color-gold); }

                    /* Body */
                    .article-body { background: white; padding: 5rem 0; }
                    .article-content { max-width: 740px; margin: 0 auto; }
                    .content-divider { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 4rem; color: var(--color-gold); opacity: 0.6; }
                    .divider-line { height: 1px; width: 60px; background: currentColor; }
                    
                    .content-text { font-size: 1.25rem; line-height: 1.8; color: #333; }
                    .content-text p { margin-bottom: 1.5rem; }
                    .content-text h2 { font-size: 2rem; margin-top: 3rem; margin-bottom: 1rem; font-family: var(--font-display); }
                    .content-text img { max-width: 100%; height: auto; margin: 2rem 0; box-shadow: 0 4px 20px rgba(0,0,0,0.1); border-radius: 4px; }
                    .content-text blockquote { border-left: 4px solid var(--color-gold); padding-left: 1.5rem; margin: 2rem 0; font-style: italic; background: #fafafa; padding: 2rem; }
                `}</style>
            </div>
        );
    }

    // ----------------------------------------------------------------------
    // Standard Form Render
    // ----------------------------------------------------------------------
    return (
        <div className="admin-form-page">
            <div className="admin-header">
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1>{isEdit ? 'Edit Article' : 'New Article'}</h1>
                        <div className="header-actions" style={{ display: 'flex', gap: '10px' }}>
                            <button
                                type="button"
                                onClick={handleAutoTranslate}
                                className="btn-magic"
                                title="Translate English to Chinese & Malay"
                            >
                                ✨ Magic Translate
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowPreview(true)}
                                className="btn-preview-top"
                            >
                                👁️ Live Preview
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-container">
                <div className="container">
                    <form onSubmit={handleSubmit} className="article-form">

                        {/* ... Basic Info Section ... */}
                        <div className="form-section">
                            <h3>Basic Information</h3>
                            <div className="form-row">
                                <div className="form-group half">
                                    <label>Category</label>
                                    <select name="category" value={formData.category} onChange={handleChange} required>
                                        <option value="TCM">TCM</option>
                                        <option value="Xin Jian">Xin Jian</option>
                                        <option value="Wellness">Wellness</option>
                                        <option value="Lifestyle">Lifestyle</option>
                                    </select>
                                </div>
                                <div className="form-group half">
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

                        {/* Title Section */}
                        <div className="form-section">
                            <h3>Title (All Languages)</h3>
                            <div className="form-group">
                                <label>English</label>
                                <input name="title_en" value={formData.title_en} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Chinese (中文)</label>
                                <input name="title_zh" value={formData.title_zh} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Malay</label>
                                <input name="title_ms" value={formData.title_ms} onChange={handleChange} required />
                            </div>
                        </div>

                        {/* Excerpt Section */}
                        <div className="form-section">
                            <h3>Excerpt (Short Description)</h3>
                            <div className="form-group">
                                <label>English</label>
                                <textarea name="excerpt_en" value={formData.excerpt_en} onChange={handleChange} rows="3" required />
                            </div>
                            <div className="form-group">
                                <label>Chinese (中文)</label>
                                <textarea name="excerpt_zh" value={formData.excerpt_zh} onChange={handleChange} rows="3" required />
                            </div>
                            <div className="form-group">
                                <label>Malay</label>
                                <textarea name="excerpt_ms" value={formData.excerpt_ms} onChange={handleChange} rows="3" required />
                            </div>
                        </div>

                        {/* Rich Content Section */}
                        <div className="form-section">
                            <h3>Full Content (Rich Editor)</h3>

                            <div className="form-group">
                                <label>English Content - <small>Use 🖼️ to insert image in text</small></label>
                                <RichTextEditor
                                    value={formData.content_en}
                                    onChange={(content) => handleContentChange(content, 'en')}
                                    placeholder="Write your article content in English here..."
                                    onImageUpload={handleInlineImageUpload}
                                />
                            </div>

                            <div className="form-group">
                                <label>Chinese Content (中文)</label>
                                <RichTextEditor
                                    value={formData.content_zh}
                                    onChange={(content) => handleContentChange(content, 'zh')}
                                    placeholder="在此处用中文撰写文章内容..."
                                    onImageUpload={handleInlineImageUpload}
                                />
                            </div>

                            <div className="form-group">
                                <label>Malay Content</label>
                                <RichTextEditor
                                    value={formData.content_ms}
                                    onChange={(content) => handleContentChange(content, 'ms')}
                                    placeholder="Tulis kandungan artikel dalam Bahasa Melayu di sini..."
                                    onImageUpload={handleInlineImageUpload}
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
                                type="button"
                                onClick={() => setShowPreview(true)}
                                className="btn-preview"
                            >
                                👁️ Preview
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
                    background-color: #f3f4f6;
                    min-height: 100vh;
                    padding-bottom: 4rem;
                }
                .admin-header {
                    background-color: #2C5E4F;
                    color: white;
                    padding: 3rem 0 6rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                .admin-header h1 {
                    font-family: "Playfair Display", serif;
                    font-size: 2.5rem;
                    margin: 0;
                }
                .form-container {
                    margin-top: -4rem;
                }
                .article-form {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    padding: 2.5rem;
                }
                .form-section {
                    margin-bottom: 2.5rem;
                    padding-bottom: 2rem;
                    border-bottom: 1px solid #e5e7eb;
                }
                .form-section:last-child {
                    border-bottom: none;
                }
                .form-section h3 {
                    color: #111827;
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                    font-family: "Inter", sans-serif;
                }
                .form-row {
                    display: flex;
                    gap: 1.5rem;
                }
                .form-group {
                    margin-bottom: 1.5rem;
                    width: 100%;
                }
                .form-group.half {
                    width: 50%;
                }
                label {
                    display: block;
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 0.5rem;
                }
                input[type="text"],
                select,
                textarea {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    border: 1px solid #d1d5db;
                    border-radius: 6px;
                    font-size: 1rem;
                    transition: border-color 0.2s;
                    font-family: "Inter", sans-serif;
                }
                input[type="text"]:focus,
                select:focus,
                textarea:focus {
                    outline: none;
                    border-color: #2C5E4F;
                    box-shadow: 0 0 0 3px rgba(44, 94, 79, 0.1);
                }
                
                /* Buttons */
                .header-actions button {
                    font-family: "Inter", sans-serif;
                    font-weight: 600;
                    border-radius: 6px;
                    border: none;
                    cursor: pointer;
                    padding: 0.6rem 1.2rem;
                    transition: all 0.2s;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .btn-magic {
                    background: #9C27B0;
                    color: white;
                }
                .btn-magic:hover { background: #7B1FA2; transform: translateY(-1px); }
                
                .btn-preview-top {
                    background: white;
                    color: #2C5E4F;
                }
                .btn-preview-top:hover { background: #f0fdf9; transform: translateY(-1px); }

                .form-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    margin-top: 2rem;
                    padding-top: 2rem;
                    border-top: 1px solid #e5e7eb;
                }
                .btn-cancel {
                    padding: 0.75rem 1.5rem;
                    background: white;
                    border: 1px solid #d1d5db;
                    color: #374151;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                }
                .btn-preview {
                    padding: 0.75rem 1.5rem;
                    background: #2196F3;
                    border: none;
                    color: white;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                }
                .btn-submit {
                    padding: 0.75rem 2rem;
                    background: #2C5E4F;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    box-shadow: 0 4px 6px rgba(44, 94, 79, 0.2);
                }
                .btn-submit:hover {
                    background: #1e4238;
                    transform: translateY(-1px);
                }

                /* Image Upload */
                .image-upload-section {
                    border: 2px dashed #d1d5db;
                    border-radius: 8px;
                    padding: 1.5rem;
                    text-align: center;
                    background: #f9fafb;
                }
                .image-preview img {
                    max-width: 100%;
                    max-height: 200px;
                    border-radius: 6px;
                    margin-bottom: 1rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                .btn-upload {
                    background: #4B5563;
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.9rem;
                }
                .help-text {
                    color: #6B7280;
                    font-size: 0.85rem;
                    margin-top: 0.5rem;
                }

                @media (max-width: 768px) {
                    .form-row { flex-direction: column; gap: 0; }
                    .form-group.half { width: 100%; }
                    .article-form { padding: 1.5rem; }
                    .admin-header { padding-bottom: 4rem; }
                    .admin-header h1 { font-size: 1.8rem; }
                    .form-actions { flex-direction: column; }
                    .header-actions { flex-direction: column; }
                }
            `}</style>
        </div>
    );
};

export default AdminArticleFormPro;
