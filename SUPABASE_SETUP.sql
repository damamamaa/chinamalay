-- SQL Schema for Supabase Articles Table
-- Run this in your Supabase SQL Editor

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_zh TEXT NOT NULL,
  title_ms TEXT NOT NULL,
  excerpt_en TEXT NOT NULL,
  excerpt_zh TEXT NOT NULL,
  excerpt_ms TEXT NOT NULL,
  content_en TEXT,
  content_zh TEXT,
  content_ms TEXT,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT DEFAULT 'Rusheng',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on slug for fast lookup
CREATE INDEX IF NOT EXISTS articles_slug_idx ON articles(slug);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS articles_created_at_idx ON articles(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access
CREATE POLICY "Allow public read access"
  ON articles
  FOR SELECT
  USING (true);

-- Policy: Allow authenticated users to insert
CREATE POLICY "Allow authenticated insert"
  ON articles
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow authenticated users to update
CREATE POLICY "Allow authenticated update"
  ON articles
  FOR UPDATE
  USING (true);

-- Policy: Allow authenticated users to delete
CREATE POLICY "Allow authenticated delete"
  ON articles
  FOR DELETE
  USING (true);

-- Create storage bucket for article images
INSERT INTO storage.buckets (id, name, public)
VALUES ('articles', 'articles', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: Allow public read access to storage
CREATE POLICY "Allow public read access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'articles');

-- Policy: Allow authenticated upload
CREATE POLICY "Allow authenticated upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'articles');

-- Policy: Allow authenticated delete
CREATE POLICY "Allow authenticated delete storage"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'articles');
