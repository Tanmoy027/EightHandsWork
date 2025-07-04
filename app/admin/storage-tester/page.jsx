"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function BucketTester() {
  const [loading, setLoading] = useState(true)
  const [configResult, setConfigResult] = useState(null)
  const [uploadResult, setUploadResult] = useState(null)
  const [error, setError] = useState(null)
  const [file, setFile] = useState(null)
  const router = useRouter()

  // Check bucket configuration on load
  useEffect(() => {
    const checkBucketConfig = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/storage/configure")
        const data = await res.json()
        setConfigResult(data)
      } catch (error) {
        console.error("Error checking bucket configuration:", error)
        setError("Failed to check bucket configuration")
      } finally {
        setLoading(false)
      }
    }

    checkBucketConfig()
  }, [])

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUploadTest = async () => {
    if (!file) {
      setError("Please select a file first")
      return
    }

    try {
      setLoading(true)
      
      // Create form data
      const formData = new FormData()
      formData.append('file', file)
      
      // Test upload
      const res = await fetch("/api/storage/test-upload", {
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
      console.error("Error during test upload:", error)
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
          <h1 className="text-2xl font-bold">Storage Bucket Tester</h1>
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
          <h2 className="text-xl font-semibold mb-4">Bucket Configuration</h2>
          
          {loading && !configResult ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-500"></div>
            </div>
          ) : configResult ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Status</h3>
                  <p className={`font-bold ${configResult.success ? 'text-green-600' : 'text-red-600'}`}>
                    {configResult.success ? 'Working Correctly' : 'Configuration Issues'}
                  </p>
                  <p className="mt-2 text-gray-700">{configResult.message}</p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Configuration Details</h3>
                  <ul className="space-y-1">
                    <li className="flex items-center">
                      <span className={`h-4 w-4 rounded-full mr-2 ${configResult.data?.bucketExists ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      Bucket Exists: {configResult.data?.bucketExists ? 'Yes' : 'No'}
                    </li>
                    <li className="flex items-center">
                      <span className={`h-4 w-4 rounded-full mr-2 ${configResult.data?.isPublic ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      Public Access: {configResult.data?.isPublic ? 'Enabled' : 'Disabled'}
                    </li>
                    <li className="flex items-center">
                      <span className={`h-4 w-4 rounded-full mr-2 ${configResult.data?.uploadWorking ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      Test Upload: {configResult.data?.uploadWorking ? 'Working' : 'Failed'}
                    </li>
                  </ul>
                </div>
              </div>
              
              {configResult.data?.publicUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium">Sample Public URL Format:</p>
                  <code className="block p-2 bg-gray-100 rounded text-xs overflow-auto">
                    {configResult.data.publicUrl}
                  </code>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 bg-red-50 text-red-700 rounded">
              Failed to load bucket configuration. Please check the console for errors.
            </div>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Tester</h2>
          
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
            onClick={handleUploadTest}
            disabled={loading || !file}
            className="px-4 py-2 bg-amber-500 text-white rounded disabled:opacity-50"
          >
            {loading ? "Testing..." : "Test Upload"}
          </button>
          
          {uploadResult && (
            <div className="mt-6 border-t pt-4">
              <h3 className="font-medium mb-2">Upload Test Result</h3>
                <div className={`p-4 rounded ${uploadResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                <p className="font-bold">{uploadResult.success ? 'Success!' : 'Failed'}</p>
                <p>{uploadResult.message}</p>
                
                {!uploadResult.success && uploadResult.suggestions && (
                  <div className="mt-4 bg-white bg-opacity-50 p-3 rounded">
                    <p className="font-medium">Suggestions:</p>
                    <ul className="list-disc ml-5 text-sm">
                      {uploadResult.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                    <p className="text-sm mt-2">
                      <Link href="/SUPABASE_STORAGE_GUIDE.md" className="text-blue-600 hover:underline" target="_blank">
                        View detailed storage setup guide
                      </Link>
                    </p>
                  </div>
                )}
                
                {uploadResult.data?.publicUrl && (
                  <div className="mt-4">
                    <p className="text-sm font-medium">File URL:</p>
                    <a 
                      href={uploadResult.data.publicUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block p-2 bg-white bg-opacity-50 rounded text-xs overflow-auto hover:underline"
                    >
                      {uploadResult.data.publicUrl}
                    </a>
                    
                    <div className="mt-4">
                      <img 
                        src={uploadResult.data.publicUrl} 
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
          <h2 className="text-xl font-semibold mb-4">Common Issues & Solutions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">1. CORS Configuration</h3>
              <p className="text-gray-700">If uploads fail with CORS errors, you need to update your Supabase CORS settings.</p>
              <ol className="list-decimal ml-5 mt-2 text-gray-600">
                <li>Go to the Supabase Dashboard</li>
                <li>Go to Storage settings</li>
                <li>Add your website URL to the allowed origins (e.g., http://localhost:3000)</li>
              </ol>
            </div>
            
            <div>              <h3 className="font-medium text-lg">2. Bucket Permissions</h3>
              <p className="text-gray-700">Ensure your bucket is set to public, or configure appropriate RLS policies.</p>
              <ol className="list-decimal ml-5 mt-2 text-gray-600">
                <li>Go to the Supabase Dashboard {'->'} Storage</li>
                <li>Find the "eighthand" bucket</li>
                <li>Click on the "..." menu and select "Edit Bucket"</li>
                <li>Ensure "Public bucket" is checked</li>
              </ol>
            </div>
              <div>
              <h3 className="font-medium text-lg">3. Row Level Security (RLS) Policies</h3>
              <p className="text-gray-700">If you encounter "row-level security policy violation" errors, you need to set up proper RLS policies:</p>
              <ol className="list-decimal ml-5 mt-2 text-gray-600">
                <li>Go to the Supabase Dashboard {'->'} Storage</li>
                <li>Click on "Policies" tab</li>
                <li>Click "Create a new policy" for the "eighthand" bucket</li>
                <li>For upload access, use a policy like:</li>
                <pre className="p-2 bg-gray-100 rounded text-xs mt-2">
                  FOR INSERT<br/>
                  USING (auth.role() = 'authenticated')
                </pre>
                <li>Add additional policies for selecting and updating:</li>
                <pre className="p-2 bg-gray-100 rounded text-xs mt-2">
                  FOR SELECT<br/>
                  USING (true)<br/><br/>
                  FOR UPDATE<br/>
                  USING (auth.role() = 'authenticated')<br/><br/>
                  FOR DELETE<br/>
                  USING (auth.role() = 'authenticated')
                </pre>
              </ol>
            </div>
            
            <div>
              <h3 className="font-medium text-lg">4. Environment Variables</h3>
              <p className="text-gray-700">Verify your Supabase URL and API keys are correctly set in your .env file</p>
              <pre className="p-2 bg-gray-100 rounded text-xs mt-2">
                NEXT_PUBLIC_SUPABASE_URL=your_supabase_url<br/>
                NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
