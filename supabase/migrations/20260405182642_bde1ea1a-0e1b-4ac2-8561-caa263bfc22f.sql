
-- Create blog-images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true);

-- Allow public read access
CREATE POLICY "Public read access for blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Allow uploads (admin-only enforced at app level via GitHub PAT)
CREATE POLICY "Allow uploads to blog images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-images');

-- Allow updates
CREATE POLICY "Allow updates to blog images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'blog-images');

-- Allow deletes
CREATE POLICY "Allow deletes from blog images"
ON storage.objects FOR DELETE
USING (bucket_id = 'blog-images');
