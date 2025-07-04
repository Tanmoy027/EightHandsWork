// filepath: lib/storage-helpers.js
import { createClient } from '@supabase/supabase-js';

// Create a Supabase client for regular user operations (uses anon key)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check for required credentials
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("ERROR: Missing Supabase credentials in environment variables");
}

// Create regular client
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// For server-side operations that need to bypass RLS (admin only)
// This should ONLY be used in server-side code (API routes), never in client components
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create admin client only if service role key is available
export const supabaseAdmin = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Check if the admin client is properly configured
if (!supabaseAdmin && process.env.NODE_ENV !== 'production') {
  console.warn('SUPABASE_SERVICE_ROLE_KEY is not configured. Admin operations will not work.');
}

/**
 * Uploads a file to Supabase storage
 * @param {File|Blob|Buffer} file - The file to upload
 * @param {string} filePath - The path within the bucket to store the file
 * @param {string} bucketName - The name of the bucket (default: 'eighthand')
 * @param {boolean} useAdmin - Whether to use the admin client (bypasses RLS)
 * @returns {Promise<{path: string, url: string, error: Error|null}>}
 */
export async function uploadFile(file, filePath, bucketName = 'eighthand', useAdmin = false) {
  try {
    // Choose client based on whether we want to bypass RLS
    const client = useAdmin && supabaseAdmin ? supabaseAdmin : supabase;
    
    // Upload the file
    const { data, error } = await client.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });
      
    if (error) throw error;
    
    // Get the public URL
    const { data: urlData } = client.storage
      .from(bucketName)
      .getPublicUrl(filePath);
      
    return {
      path: filePath,
      url: urlData.publicUrl,
      error: null
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return {
      path: null,
      url: null,
      error: error
    };
  }
}

/**
 * Deletes a file from Supabase storage
 * @param {string} filePath - The path of the file to delete
 * @param {string} bucketName - The name of the bucket (default: 'eighthand')
 * @param {boolean} useAdmin - Whether to use the admin client (bypasses RLS)
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export async function deleteFile(filePath, bucketName = 'eighthand', useAdmin = false) {
  try {
    const client = useAdmin && supabaseAdmin ? supabaseAdmin : supabase;
    
    const { error } = await client.storage
      .from(bucketName)
      .remove([filePath]);
      
    if (error) throw error;
    
    return {
      success: true,
      error: null
    };
  } catch (error) {
    console.error('Error deleting file:', error);
    return {
      success: false,
      error: error
    };
  }
}

/**
 * Helper to extract the file path from a Supabase storage URL
 * @param {string} url - The public URL from Supabase storage
 * @param {string} bucketName - The name of the bucket (default: 'eighthand') 
 * @returns {string|null} - The file path or null if not a valid storage URL
 */
export function extractFilePathFromUrl(url, bucketName = 'eighthand') {
  if (!url) return null;
  
  try {
    // Extract the path portion after the bucket name
    const regex = new RegExp(`storage/v1/object/public/${bucketName}/(.+)`);
    const match = url.match(regex);
    
    return match ? match[1] : null;
  } catch (error) {
    console.error('Error extracting file path:', error);
    return null;
  }
}
