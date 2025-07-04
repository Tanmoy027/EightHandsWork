// filepath: app/api/storage/check/route.js
import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"

// GET /api/storage/check - Check if storage is accessible
export async function GET(request) {
  try {
    // Try to list buckets to verify storage access
    const { data: buckets, error } = await supabase.storage.listBuckets()

    if (error) {
      console.error("Storage access check failed:", error)
      return NextResponse.json({ 
        success: false, 
        message: "Storage access check failed", 
        error: error.message 
      }, { status: 500 })
    }

    // Check if eighthand bucket exists
    const eighthandBucket = buckets.find(bucket => bucket.name === 'eighthand')
    
    return NextResponse.json({
      success: true,
      message: "Storage access check successful",
      data: {
        buckets: buckets.map(b => b.name),
        eighthandExists: !!eighthandBucket
      }
    })
  } catch (error) {
    console.error("Storage access check error:", error)
    return NextResponse.json({ 
      success: false, 
      message: "Storage access check error", 
      error: error.message 
    }, { status: 500 })
  }
}
