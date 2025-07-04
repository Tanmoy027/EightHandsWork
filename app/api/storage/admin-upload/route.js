// filepath: app/api/storage/admin-upload/route.js
import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

// Create a Supabase admin client with service role key
// This bypasses RLS policies
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Check if required credentials are available
if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials. Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local");
}

// Create client only if we have credentials
const supabaseAdmin = supabaseUrl && supabaseServiceKey ? 
  createClient(supabaseUrl, supabaseServiceKey) : null;

/**
 * ADMIN ONLY: API endpoint for file uploads to Supabase Storage
 * This endpoint uses the service role key to bypass RLS policies
 * WARNING: Be careful with this endpoint as it bypasses security policies
 */
export async function POST(request) {
  try {
    // Check if admin client was initialized properly
    if (!supabaseAdmin) {
      return NextResponse.json({
        success: false,
        message: "Admin upload is not configured. Please check server environment variables.",
        error: "SUPABASE_SERVICE_ROLE_KEY is missing or invalid"
      }, { status: 500 });
    }
    
    const formData = await request.formData();
    const file = formData.get('file');
    const folder = formData.get('folder') || 'products';
    
    if (!file) {
      return NextResponse.json({
        success: false,
        message: "No file provided"
      }, { status: 400 });
    }
    
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;
    
    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    console.log("Attempting admin upload to:", filePath);
    
    // Upload using admin client (bypasses RLS)
    const { data, error } = await supabaseAdmin.storage
      .from('eighthand')
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: true
      });
    
    if (error) {
      console.error("Admin upload error:", error);
      return NextResponse.json({
        success: false,
        message: `Admin upload failed: ${error.message}`,
        error: error
      }, { status: 500 });
    }
    
    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('eighthand')
      .getPublicUrl(filePath);
    
    return NextResponse.json({
      success: true,
      message: "File uploaded successfully via admin bypass",
      data: {
        path: filePath,
        url: urlData.publicUrl
      }
    });
    
  } catch (error) {
    console.error("Error in admin upload:", error);
    return NextResponse.json({
      success: false,
      message: `Server error: ${error.message}`,
      error: error.message
    }, { status: 500 });
  }
}

// Increase body size limit for file uploads
export const config = {
  api: {
    bodyParser: false
  }
};
