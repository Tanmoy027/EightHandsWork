# Storage Issues Resolution Guide

## Issue Summary
You've been experiencing Row Level Security (RLS) policy violations when attempting to upload files to your Supabase 'eighthand' storage bucket.

## IMPORTANT UPDATE
If you continue to experience RLS policy issues after running the SQL scripts, we've added an admin bypass solution:

1. Visit `/admin/storage-admin-test` - This uses the service role key to bypass RLS
2. Make sure your `.env.local` file has the `SUPABASE_SERVICE_ROLE_KEY` variable set
3. Run `node scripts/check-env.js` to verify your environment variables

## Files Updated
1. **API Routes**
   - `/api/storage/configure/route.js` - Improved error detection for RLS issues
   - `/api/storage/test-upload/route.js` - Better error handling
   - `/api/storage/upload/route.js` (NEW) - Robust file upload API

2. **Helper Libraries**
   - `lib/storage-helpers.js` (NEW) - Utilities for storage operations

3. **Product Pages**
   - `app/admin/products/new/page.jsx` - Using improved upload API
   - `app/admin/products/[id]/edit/page.jsx` - Using improved upload API

4. **Documentation**
   - `SUPABASE_STORAGE_GUIDE.md` (NEW) - Detailed storage setup guide
   - `scripts/setup-storage-policies.sql` (NEW) - SQL for proper RLS policies

## Steps to Fix

### 1. Configure Supabase Bucket
1. Login to your Supabase dashboard
2. Navigate to "Storage" section
3. Create an 'eighthand' bucket if it doesn't exist (check "Public bucket" option)

### 2. Set Up RLS Policies
1. In the Supabase dashboard, go to Storage → Policies
2. Try the simplified policies first (recommended):
   - Run the SQL in `scripts/simplified-storage-policies.sql` in the Supabase SQL Editor
   - This sets up more permissive policies that should work in most cases

3. If that doesn't work, try the stricter policies:
   - **Read access**: `CREATE POLICY "Allow public read access" ON storage.objects FOR SELECT USING (bucket_id = 'eighthand');`
   - **Upload access**: `CREATE POLICY "Allow authenticated uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'eighthand' AND auth.role() = 'authenticated');`
   - **Update access**: `CREATE POLICY "Allow authenticated updates" ON storage.objects FOR UPDATE USING (bucket_id = 'eighthand' AND auth.role() = 'authenticated');`
   - **Delete access**: `CREATE POLICY "Allow authenticated deletes" ON storage.objects FOR DELETE USING (bucket_id = 'eighthand' AND auth.role() = 'authenticated');`

The SQL script at `scripts/setup-storage-policies.sql` contains all these policies for easy reference.

### 3. Test Your Configuration
1. Go to Admin → Storage Tester in your application
2. Upload a test file
3. If successful, try creating or editing products with image uploads

## Additional Notes

### Service Role Key Approach
If you're still experiencing RLS issues, use the admin upload solution:

1. Ensure your `.env.local` file has these environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

2. Get your service role key from Supabase Dashboard > Project Settings > API > service_role key

3. Use the new admin endpoints:
   - For testing: `/admin/storage-admin-test`
   - For API uploads: `/api/storage/admin-upload`

4. In production code, you can modify product pages to use the admin upload endpoint:
   ```javascript
   const formData = new FormData();
   formData.append('file', imageFile);
   formData.append('folder', 'products');
   
   const uploadResponse = await fetch('/api/storage/admin-upload', {
     method: 'POST',
     body: formData
   });
   ```

### Run Environment Check
Execute this command to verify your environment setup:
```
node scripts/check-env.js
```

For more detailed information, refer to the `SUPABASE_STORAGE_GUIDE.md` file
