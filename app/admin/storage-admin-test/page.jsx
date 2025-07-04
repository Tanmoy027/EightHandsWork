// filepath: app/admin/storage-admin-test/page.jsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AdminBucketTester() {
  const [loading, setLoading] = useState(false)
  const [uploadResult, setUploadResult] = useState(null)
  const [error, setError] = useState(null)
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleAdminUploadTest = async () => {
    if (!file) {
      setError("Please select a file first")
      return
    }

    try {
      setLoading(true)
      
      // Create form data
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'test-admin')
      
      // Test upload using admin route
      const res = await fetch("/api/storage/admin-upload", {
        method: "POST",
        body: formData
      })
      
      const data = await res.json()
      setUploadResult(data)
      
      if (!data.success) {
        setError(data.message || "Upload failed")
      } else {
        setError(null)
      }
    } catch (error) {
      console.error("Error during admin test upload:", error)
      setError("Test upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Link href="/admin" className="flex items-center text-gray-600 hover:text-amber-500">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin
          </Link>
          <h1 className="text-2xl font-bold">Admin Storage Tester</h1>
        </div>

        <div className="p-4 mb-6 bg-amber-50 border-l-4 border-amber-500 text-amber-700">
          <h2 className="text-lg font-bold">Important Note</h2>
          <p>This page uses a special admin upload endpoint that bypasses Row Level Security (RLS) policies.</p>
          <p className="mt-2">Use this only for testing purposes while you resolve RLS policy issues.</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Admin Upload Tester</h2>
          <p className="mb-4 text-gray-600">This uses the service role key to bypass RLS policies. You need to have the <code className="bg-gray-100 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> set in your environment variables.</p>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Test File
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
              accept="image/*"
            />
            <p className="mt-1 text-sm text-gray-500">Select an image file to test uploads (max 5MB)</p>
          </div>
          
          <button
            onClick={handleAdminUploadTest}
            disabled={loading || !file}
            className="px-4 py-2 bg-amber-500 text-white rounded disabled:opacity-50"
          >
            {loading ? "Testing..." : "Test Admin Upload"}
          </button>
          
          {uploadResult && (
            <div className="mt-6 border-t pt-4">
              <h3 className="font-medium mb-2">Upload Test Result</h3>
              
              <div className={`p-4 rounded ${uploadResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                <p className="font-bold">{uploadResult.success ? 'Success!' : 'Failed'}</p>
                <p>{uploadResult.message}</p>
                
                {uploadResult.data?.url && (
                  <div className="mt-4">
                    <p className="text-sm font-medium">File URL:</p>
                    <a 
                      href={uploadResult.data.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block p-2 bg-white bg-opacity-50 rounded text-xs overflow-auto hover:underline"
                    >
                      {uploadResult.data.url}
                    </a>
                    
                    <div className="mt-4">
                      <img 
                        src={uploadResult.data.url} 
                        alt="Uploaded test" 
                        className="max-w-full h-auto max-h-40 border rounded" 
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">1. Check your .env file</h3>
              <p className="text-gray-700">Make sure you have the service role key in your environment variables:</p>
              <pre className="p-2 bg-gray-100 rounded text-xs mt-2">
                NEXT_PUBLIC_SUPABASE_URL=your_supabase_url<br/>
                NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key<br/>
                SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
              </pre>
            </div>
            
            <div>
              <h3 className="font-medium text-lg">2. Try Revised RLS Policies</h3>
              <p className="text-gray-700">Here's a simplified RLS policy script that might work better:</p>
              <pre className="p-2 bg-gray-100 rounded text-xs mt-2 overflow-auto">
{`-- First, drop existing policies if any
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;

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
USING (bucket_id = 'eighthand');`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
