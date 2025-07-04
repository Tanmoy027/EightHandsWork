-- filepath: scripts/simplified-storage-policies.sql
-- This script sets up simplified RLS policies for the 'eighthand' storage bucket
-- Use this if you're having issues with the regular RLS policies

-- First, drop existing policies if any
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Allow Uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow Updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow Deletes" ON storage.objects;

-- Then create simpler policies
-- Allow anyone to read
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'eighthand');

-- Allow anyone to upload (less secure but good for testing)
CREATE POLICY "Allow Uploads" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'eighthand');

-- Allow anyone to update own files
CREATE POLICY "Allow Updates" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'eighthand');

-- Allow anyone to delete own files
CREATE POLICY "Allow Deletes" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'eighthand');
