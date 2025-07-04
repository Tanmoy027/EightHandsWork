// filepath: app/api/storage/test-upload/route.js
import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    
    if (!file) {
      return NextResponse.json({
        success: false,
        message: "No file provided"
      }, { status: 400 })
    }
    
    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = `test-upload/${Date.now()}-${file.name}`
    
    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from('eighthand')
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600'
      })
      if (error) {
      console.error("Upload error:", error)
      
      // Special handling for RLS policy errors
      if (error.message.includes("new row violates row-level security policy") || 
          error.message.includes("Permission denied")) {
        return NextResponse.json({
          success: false,
          message: `Upload failed: Row Level Security (RLS) policy violation`,
          error: error.message,
          needsRLSConfiguration: true,
          instructions: [
            "To fix this issue, you need to configure RLS policies in Supabase:",
            "1. Go to your Supabase dashboard → Storage → Policies",
            "2. Create a policy for the 'eighthand' bucket that allows uploads",
            "3. Sample policy: FOR INSERT USING (auth.role() = 'authenticated')"
          ]
        }, { status: 403 })
      }
      
      return NextResponse.json({
        success: false,
        message: `Upload failed: ${error.message}`,
        error: error.message
      }, { status: 500 })
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('eighthand')
      .getPublicUrl(fileName)
    
    return NextResponse.json({
      success: true,
      message: "Upload successful!",
      data: {
        path: fileName,
        publicUrl: urlData.publicUrl
      }
    })
    
  } catch (error) {
    console.error("Error in test upload:", error)
    return NextResponse.json({
      success: false,
      message: `Server error: ${error.message}`,
      error: error.message
    }, { status: 500 })
  }
}

// Increase body size limit for file uploads
export const config = {
  api: {
    bodyParser: false
  }
}
