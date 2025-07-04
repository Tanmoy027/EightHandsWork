// filepath: app/api/storage/upload/route.js
import { NextResponse } from "next/server";
import { uploadFile } from "@/lib/storage-helpers";

/**
 * Improved API endpoint for file uploads to Supabase Storage
 * Handles uploads with better error reporting and uses admin client when needed
 */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const folder = formData.get('folder') || 'products';
    const useAdmin = formData.get('useAdmin') === 'true';
    
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
    
    // Upload to Supabase using our helper
    const { path, url, error } = await uploadFile(buffer, filePath, 'eighthand', useAdmin);
    
    if (error) {
      // Special handling for RLS errors
      if (error.message && (
          error.message.includes("new row violates row-level security policy") || 
          error.message.includes("Permission denied")
      )) {
        return NextResponse.json({
          success: false,
          message: "Storage permission denied: Row Level Security (RLS) policy violation",
          error: error.message,
          suggestions: [
            "1. Configure RLS policies in Supabase dashboard",
            "2. Check the SUPABASE_STORAGE_GUIDE.md file for detailed instructions",
            "3. Make sure you're authenticated before uploading"
          ]
        }, { status: 403 });
      }
      
      return NextResponse.json({
        success: false,
        message: `Upload failed: ${error.message}`,
        error: error.message
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      data: {
        path,
        url
      }
    });
    
  } catch (error) {
    console.error("Error in file upload:", error);
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
