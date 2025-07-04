# Supabase Storage Setup Guide

This guide will help you properly configure Supabase storage for your luxury furniture website, focusing on resolving Row Level Security (RLS) policy issues.

## 1. Create the 'eighthand' Bucket

1. Log in to your Supabase dashboard
2. Navigate to Storage section in the left sidebar
3. Click "New Bucket"
4. Enter "eighthand" as the bucket name
5. Check "Public bucket" option if you want public access to images
6. Click "Create bucket"

## 2. Configure Row Level Security (RLS) Policies

RLS policies control who can upload, read, update, and delete files in your storage buckets. The current error you're facing is due to missing or incorrect RLS policies.

### Essential Policies for the 'eighthand' Bucket

1. Navigate to Storage → Policies in your Supabase dashboard
2. Select the "eighthand" bucket
3. Create the following policies:

#### For Public Read Access

```sql
-- Allow anyone to view/download files (good for product images)
CREATE POLICY "Public Access" 
ON storage.objects
FOR SELECT 
USING (bucket_id = 'eighthand');
```

#### For Authenticated Uploads

```sql
-- Allow authenticated users to upload files
CREATE POLICY "Authenticated Users Can Upload" 
ON storage.objects
FOR INSERT 
USING (
  bucket_id = 'eighthand' 
  AND auth.role() = 'authenticated'
);
```

#### For Admin Updates/Deletes

```sql
-- Allow authenticated users to update and delete their own files
CREATE POLICY "Authenticated Users Can Update Own Files" 
ON storage.objects
FOR UPDATE 
USING (
  bucket_id = 'eighthand' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated Users Can Delete Own Files" 
ON storage.objects
FOR DELETE 
USING (
  bucket_id = 'eighthand' 
  AND auth.role() = 'authenticated'
);
```

## 3. Testing Your Configuration

After setting up these policies, return to the Admin → Storage Tester page in your application to verify that uploads are working correctly.

## 4. Troubleshooting

If you're still facing issues:

1. **Check Console Errors**: Inspect browser console and server logs for specific error messages
2. **Verify Authentication**: Make sure users are properly authenticated before uploading
3. **Check File Size**: Ensure files aren't exceeding size limits (5MB recommended)
4. **CORS Configuration**: Configure CORS in Supabase to allow requests from your domain

## 5. Code Changes

If needed, you can modify your upload code to use the service role key for admin functions:

```javascript
// For admin functions that need to bypass RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Then use supabaseAdmin for storage operations
const { data, error } = await supabaseAdmin.storage
  .from('eighthand')
  .upload(filePath, file);
```

> **Important**: Only use the service role key in secure server-side code, never in client-side code!

## Resources

- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
