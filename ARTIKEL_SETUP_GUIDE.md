# Artikel Editor Profesional - Setup Guide

## ✅ Yang Sudah Selesai

Sistem artikel profesional dengan fitur:
- ✅ Rich Text Editor (Quill) untuk menulis artikel
- ✅ Upload gambar dengan auto-convert ke WebP
- ✅ Multilingual (EN, ZH, MS)
- ✅ Integrasi Supabase (Database + Storage)
- ✅ Admin Dashboard lengkap

## 📋 Setup Supabase (PENTING!)

### Step 1: Create Table di Supabase

1. Buka Supabase Dashboard: https://supabase.com/dashboard
2. Pilih project Anda
3. Klik "SQL Editor" di sidebar
4. Copy semua isi file `SUPABASE_SETUP.sql`
5. Paste ke SQL Editor
6. Klik "Run" untuk execute

### Step 2: Verifikasi Storage Bucket

1. Klik "Storage" di Supabase Dashboard
2. Pastikan ada bucket bernama `articles`
3. Bucket harus **Public** (agar gambar bisa diakses)

## 🎯 Cara Menggunakan

### Login Admin
1. Buka `http://localhost:5173/admin`
2. Password: `rusheng2024`

### Membuat Artikel Baru
1. Klik "+ New Article"
2. Pilih Category
3. Upload gambar (akan otomatis convert ke WebP)
4. Isi Title, Excerpt, dan Content untuk 3 bahasa
5. Klik "Create Article"

### Edit/Delete Artikel
- Dari dashboard `/admin/articles`
- Klik "Edit" atau "Delete"

### Lihat Artikel (Public)
- `/articles` - Daftar semua artikel
- `/articles/slug-artikel` - Detail artikel

## 🔧 Dependencies Installed

```bash
npm install @supabase/supabase-js react-quill browser-image-compression --legacy-peer-deps
```

## 📁 File Structure

```
src/
├── supabaseClient.js          # Supabase configuration
├── utils/
│   └── imageUtils.js           # Image upload & WebP conversion
├── pages/
│   ├── Articles.jsx            # Public: List articles
│   ├── ArticleDetail.jsx       # Public: Article detail
│   └── admin/
│       ├── AdminLogin.jsx      # Admin login
│       ├── AdminArticles.jsx   # Admin: Manage articles
│       └── AdminArticleForm.jsx # Admin: Create/Edit form (Quill editor)
```

## 🎨 Rich Text Editor Features

- Headers (H1, H2, H3)
- Bold, Italic, Underline, Strike
- Lists (Ordered/Unordered)
- Text alignment
- Links
- Images
- Clean formatting

## 🖼️ Image Upload

- **Auto WebP Conversion**: Semua gambar otomatis di-convert ke WebP
- **Compression**: File size dioptimasi (max 1MB, max 1920px)
- **Storage**: Tersimpan di Supabase Storage bucket `articles`
- **Public URL**: Langsung dapat public URL untuk display

## 🔐 Security

- RLS (Row Level Security) enabled
- Public dapat READ artikel
- Hanya authenticated users dapat CREATE/UPDATE/DELETE
- Login menggunakan localStorage (simple auth)

## 🚀 Testing

1. Jalankan dev server:
```bash
npm run dev
```

2. Buka browser:
- Public: http://localhost:5173/articles
- Admin: http://localhost:5173/admin

3. Test workflow:
- Login → Create Article → Upload Image → Save
- Lihat di /articles
- Edit artikel
- Delete artikel

## ⚠️ Important Notes

1. **Supabase Setup WAJIB** - Jalankan SQL script dulu
2. **Storage Bucket** - Pastikan bucket `articles` public
3. **Image Format** - Support: JPG, PNG, GIF (auto convert ke WebP)
4. **Browser Support** - Modern browsers only (WebP support)

## 🎯 Next Steps (Optional Upgrades)

- [ ] Proper authentication (email/password)
- [ ] Image SEO (alt text, captions)
- [ ] Article categories filtering
- [ ] Search functionality
- [ ] Draft/Publish status
- [ ] Featured articles
- [ ] View count analytics
