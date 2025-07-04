// filepath: app/api/storage/configure/route.js
import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"

/**
 * This API endpoint checks and configures the Supabase storage bucket settings
 * It verifies:
 * 1. Bucket exists
 * 2. Proper permissions are in place for uploads
 */
export async function GET(request) {
  try {
    // Step 1: Check if bucket exists
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    if (bucketsError) {
      console.error("Error listing buckets:", bucketsError)
      return NextResponse.json({ 
        success: false, 
        error: bucketsError.message,
        message: "Failed to list buckets. You may need to create the 'eighthand' bucket manually in the Supabase Dashboard." 
      }, { status: 500 })
    }

    let bucketExists = false
    let eighthandBucket = null
    
    for (const bucket of buckets) {
      if (bucket.name === 'eighthand') {
        bucketExists = true
        eighthandBucket = bucket
        break
      }
    }
    
    // If bucket doesn't exist, we need to inform the user to create it manually
    if (!bucketExists) {
      return NextResponse.json({ 
        success: false, 
        needsBucketCreation: true,
        message: "The 'eighthand' bucket doesn't exist. Please create it manually in the Supabase dashboard.",
        instructions: [
          "1. Go to your Supabase dashboard",
          "2. Navigate to Storage section",
          "3. Click 'New Bucket' button",
          "4. Enter 'eighthand' as the bucket name",
          "5. Check 'Public bucket' option if you want images to be publicly accessible",
          "6. Click 'Create bucket'"
        ]
      }, { status: 200 })
    }
    
    // If bucket exists, try to determine its permissions
    let isPublic = eighthandBucket.public || false
    
    // Step 2: Test upload functionality - this will help determine if we have proper permissions
    const testFile = new Blob(['test'], { type: 'text/plain' })
    const testFileName = `test-${Date.now()}.txt`
    
  try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('eighthand')
        .upload(`test/${testFileName}`, testFile)
    
      if (uploadError) {
        console.error("Error uploading test file:", uploadError)
        
        // Special handling for RLS policy errors
        if (uploadError.message.includes("new row violates row-level security policy") || 
            uploadError.message.includes("Permission denied")) {
          return NextResponse.json({ 
            success: false, 
            error: uploadError.message,
            message: "Failed to upload test file: Row Level Security (RLS) policy violation",
            needsRLSConfiguration: true,
            instructions: [
              "1. Go to your Supabase dashboard",
              "2. Navigate to Storage section",
              "3. Click on 'Policies' tab",
              "4. Click 'Create a new policy' or edit existing policies for the 'eighthand' bucket",
              "5. Create a policy that allows uploads from authenticated users",
              "6. Sample policy: FOR INSERT USING (auth.role() = 'authenticated')"
            ]
          }, { status: 200 })
        }
        
        return NextResponse.json({ 
          success: false, 
          error: uploadError.message,
          message: "Failed to upload test file" 
        }, { status: 500 })
      }
      
      // Step 4: Generate and check public URL
      const { data: urlData } = supabase.storage
        .from('eighthand')
        .getPublicUrl(`test/${testFileName}`)
    
    // Step 5: Clean up test file
    await supabase.storage
      .from('eighthand')
      .remove([`test/${testFileName}`])
      return NextResponse.json({
      success: true,
      message: "Storage bucket is properly configured",
      data: {
        bucketExists: true,
        isPublic: true,
        uploadWorking: !!uploadData,
        publicUrl: urlData?.publicUrl || null
      }
    })
    
    } catch (error) {
      console.error("Storage configuration check error:", error)
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        message: "Storage configuration check failed" 
      }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in storage configuration:", error)
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      message: "Storage configuration check failed" 
    }, { status: 500 })
  }
}
