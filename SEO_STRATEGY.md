# SEO Strategy for Article Ranking - Live True Care

## 1. ON-PAGE SEO (Di dalam artikel)

### A. Meta Tags (PENTING!)
Setiap artikel harus punya:
- **Title Tag** (50-60 karakter): `<title>Cara Mengobati Sakit Punggung dengan TCM | Live True Care</title>`
- **Meta Description** (150-160 karakter): Ringkasan menarik yang bikin orang klik
- **URL Slug**: Pendek, deskriptif, pakai keyword (misal: `/articles/cara-mengobati-sakit-punggung-tcm`)

### B. Heading Structure
```html
<h1>Judul Utama Artikel (1x saja)</h1>
  <h2>Subjudul Penting (Pakai keyword)</h2>
    <h3>Detail</h3>
  <h2>Subjudul Berikutnya</h2>
```

### C. Keyword Optimization
- Keyword utama muncul di:
  - Title (H1)
  - 100 kata pertama
  - Beberapa heading (H2/H3)
  - URL slug
  - Alt text gambar
- Jangan keyword stuffing (over-use)

### D. Content Quality
- **Panjang artikel**: Minimal 1000 kata (idealnya 1500-2500 untuk topik kompleks)
- **Original content**: Jangan copy-paste
- **Struktur jelas**: Pakai paragraf pendek (3-4 baris), bullet points
- **Readability**: Bahasa mudah dipahami

### E. Internal & External Links
- Link ke 2-3 artikel lain di website Bapak (internal linking)
- Link ke 1-2 sumber kredibel (WebMD, medical journals) untuk authority

### F. Image Optimization
- Nama file deskriptif: `tcm-akupunktur-terapi.webp` (bukan `IMG_1234.jpg`)
- Alt text: `"Terapi akupunktur TCM untuk sakit punggung"`
- Ukuran file kecil (<200KB) - sudah otomatis jadi WebP di sistem Bapak ✅
- Aspect ratio konsisten

---

## 2. TECHNICAL SEO (Infrastruktur website)

### A. Schema Markup (Structured Data)
Google suka kalau ada Schema.org markup. Contoh untuk artikel:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Cara Mengobati Sakit Punggung dengan TCM",
  "image": "https://livedtruecare.com/images/artikel.webp",
  "author": {
    "@type": "Person",
    "name": "Rusheng"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Live True Care",
    "logo": {
      "@type": "ImageObject",
      "url": "https://livedtruecare.com/logo.png"
    }
  },
  "datePublished": "2026-01-17",
  "dateModified": "2026-01-17"
}
</script>
```

**ACTION**: Bapak harus tambahkan Schema JSON-LD ini di ArticleDetail component.

### B. Page Speed
- ✅ Gambar WebP (sudah ada)
- Minimize JavaScript/CSS
- Lazy load images
- CDN untuk images

### C. Mobile-Friendly
- ✅ Responsive design (sudah ada di Medium-style layout)

### D. Sitemap XML
Buat file `sitemap.xml` yang list semua artikel:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://livedtruecare.com/articles/artikel-slug</loc>
    <lastmod>2026-01-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

Submit ke Google Search Console.

---

## 3. OFF-PAGE SEO (Di luar website)

### A. Backlinks (PALING PENTING!)
Cara dapat backlink:
1. **Guest posting**: Tulis artikel untuk website lain (health blogs, TCM forums)
2. **Local directories**: Daftar di Google My Business, Yelp
3. **Social media**: Share artikel di Facebook, Instagram, LinkedIn
4. **Forum participation**: Jawab pertanyaan di Quora, Reddit (sisipkan link artikel)

### B. Social Signals
- Share artikel di semua platform social media
- Encourage likes, shares, comments

---

## 4. LOCAL SEO (Untuk klinik fisik)

### A. Google My Business
- Daftar klinik
- Upload foto klinik
- Minta review dari pasien
- Update alamat, jam buka, telepon

### B. NAP Consistency
Name, Address, Phone number harus sama persis di:
- Website
- Google My Business
- Facebook
- Direktori online lainnya

---

## 5. CONTENT STRATEGY (Long-term)

### A. Topik yang Dicari Orang
Gunakan tools gratis:
- **Google Trends**: Lihat tren pencarian
- **Google Search Console**: Lihat query apa yang bawa traffic
- **AnswerThePublic**: Cari pertanyaan yang orang tanya tentang TCM

### B. Content Calendar
Target: 2-4 artikel baru per bulan
Contoh topik:
- "Cara TCM Mengobati Insomnia Tanpa Obat"
- "Perbedaan Akupunktur dan Akupresur"
- "Herbal TCM untuk Meningkatkan Imunitas"
- "TCM untuk Ibu Hamil: Aman atau Tidak?"

### C. Update Artikel Lama
Setiap 6 bulan, update artikel lama dengan info baru → Google suka content fresh

---

## 6. MONITORING & ANALYTICS

### A. Google Search Console
- Submit sitemap
- Monitor indexing status
- Check for errors
- Lihat keyword yang bawa traffic

### B. Google Analytics
- Track page views
- Bounce rate (idealnya <60%)
- Time on page (semakin lama semakin baik)

---

## 7. QUICK WINS (Bisa dilakukan sekarang)

### Priority #1: Meta Tags
Tambahkan ke setiap artikel:
```jsx
<Helmet>
  <title>{article.title_en} | Live True Care</title>
  <meta name="description" content={article.excerpt_en} />
  <meta property="og:title" content={article.title_en} />
  <meta property="og:description" content={article.excerpt_en} />
  <meta property="og:image" content={article.image} />
  <meta property="og:type" content="article" />
</Helmet>
```

Install: `npm install react-helmet`

### Priority #2: Schema Markup (JSON-LD)
Lihat contoh di section 2A di atas.

### Priority #3: Submit to Google
1. Daftar Google Search Console
2. Submit sitemap
3. Request indexing untuk artikel baru

---

## 8. REALISTIC TIMELINE

- **1-3 bulan**: Artikel mulai muncul di Google (page 2-3)
- **3-6 bulan**: Mulai naik ke page 1 (jika kompetisi rendah)
- **6-12 bulan**: Ranking stabil di top 10

**Kunci sukses**: Konsistensi + Quality Content + Backlinks

---

## ACTION ITEMS UNTUK BAPAK:

### Segera (This week):
1. ✅ Install `react-helmet` untuk meta tags
2. ✅ Tambahkan Schema.org JSON-LD di ArticleDetail.jsx
3. ✅ Daftar Google Search Console
4. Generate sitemap.xml

### Jangka Pendek (This month):
1. Optimasi 5 artikel terbaik (title, meta, keywords)
2. Tambah internal links antar artikel
3. Daftar Google My Business

### Jangka Panjang (Ongoing):
1. Publish 2-4 artikel baru per bulan
2. Cari backlink opportunities
3. Share di social media consistently
4. Monitor Google Analytics & Search Console

---

**INGAT**: SEO adalah marathon, bukan sprint. Hasil tidak instant tapi sustainable!
