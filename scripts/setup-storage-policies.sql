-- filepath: scripts/setup-storage-policies.sql
-- This script sets up the recommended RLS policies for the 'eighthand' storage bucket

-- 1. Create policy for public read access (SELECT)
CREATE POLICY "Allow public read access"
ON storage.objects
FOR SELECT 
USING (
  bucket_id = 'eighthand'
);

-- 2. Create policy for authenticated uploads (INSERT)
CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'eighthand' 
  AND auth.role() = 'authenticated'
);

-- 3. Create policy for authenticated updates (UPDATE)
CREATE POLICY "Allow authenticated updates"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'eighthand' 
  AND auth.role() = 'authenticated'
);

-- 4. Create policy for authenticated deletes (DELETE)
CREATE POLICY "Allow authenticated deletes"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'eighthand' 
  AND auth.role() = 'authenticated'
);

-- 5. Optional: Add stricter policies for specific folders
-- For example, restricting admin folder access to admin users only
-- CREATE POLICY "Admin folder access"
-- ON storage.objects
-- USING (
--   bucket_id = 'eighthand' 
--   AND (storage.foldername(name))[1] = 'admin'
--   AND auth.jwt() ->> 'role' = 'admin'
-- );

-- Note: You can run this script in the Supabase SQL Editor
-- To get there: Supabase Dashboard -> SQL Editor -> New query
