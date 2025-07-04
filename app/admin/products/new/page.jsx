"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/lib/supabase-provider"
import { ArrowLeft, LinkIcon, UploadCloud } from "lucide-react"

export default function NewProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    category: "",
    in_stock: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [categories, setCategories] = useState([])
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  const router = useRouter()
  const { supabase, user, loading: userLoading } = useSupabase()

  // Category groups for organization
  const categoryGroups = {
    "Living Room": [
      "Epoxy Table",
      "Center Table",
      "Sofa/Couch/Bean",
      "End Table",
      "Arm Chair",
      "TV Cabinet",
      "Display Cabinet",
      "Shelf",
      "Carpet/Rug",
      "Lamp/Light/Chandelier",
      "Living Room Set",
    ],
    Dining: ["Dining Table", "Dining Chair", "Dinner Wagon", "Fine Dining Furniture"],
    Bedroom: ["Bed", "Murphy Bed", "Bed Side Table", "Dressing Table", "Bedroom Set"],
    Office: [
      "Study Table",
      "Office Desk",
      "Conference Table",
      "Modular Work Station",
      "Visitor Chair",
      "Break Room Furniture",
      "Office Set",
    ],
    Storage: ["Cabinet/Almira", "Book Shelf", "Shoe Rack", "Store Cabinet"],
    Restaurant: ["Fine Dining Furniture", "Reception Furniture", "Bar Stool", "Cash Counter", "Restaurant Set"],
    Industrial: ["PU Flooring", "Lab Clear Coat", "Industrial Solutions"],
    Interior: ["Interior Consultation", "Project Execution", "Epoxy Services", "Portable Partition"],
    "Kitchen & Bath": ["Kitchen Counter Top", "Wooden Wash Basin"],
  }

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        if (!userLoading) {
          router.push("/login?redirect=/admin/products/new")
        }
        return
      }

      try {
        const { data, error } = await supabase.from("users").select("is_admin").eq("id", user.id).single()

        if (error) throw error

        if (!data.is_admin) {
          router.push("/")
        }
      } catch (error) {
        console.error("Error checking admin status:", error)
        router.push("/")
      }
    }

    if (!userLoading) {
      checkAdmin()
    }
  }, [supabase, user, userLoading, router])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase.from("categories").select("name").order("name")

        if (error) throw error

        setCategories(data?.map((cat) => cat.name) || [])
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [supabase])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }
  
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    // Check file type
    const fileType = file.type
    if (!fileType.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG, etc.)')
      return
    }
    
    // Check file size (limit to 5MB)
    const fileSizeInMB = file.size / (1024 * 1024)
    if (fileSizeInMB > 5) {
      setError('Image file is too large. Please upload an image smaller than 5MB.')
      return
    }
    
    setImageFile(file)
    setError(null)
    
    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
    
    // Clear the image_url field since we're uploading a file
    setFormData(prev => ({
      ...prev,
      image_url: ""
    }))
  }
  
  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview(null)
    fileInputRef.current.value = ""
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate price is a number
      const price = Number.parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        throw new Error("Price must be a positive number");
      }

      // Validate required fields
      if (!formData.name.trim()) {
        throw new Error("Product name is required");
      }
      if (!formData.description.trim()) {
        throw new Error("Product description is required");
      }
      if (!formData.category) {
        throw new Error("Product category is required");
      }

      // Handle image - either from file upload or URL
      let imageUrl = null;
      
      // If we have an image file, upload it to Supabase storage
      if (imageFile) {
        // Use our improved upload API
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('folder', 'products');
        
        try {
          // Try direct Supabase upload first
          try {
            console.log("Attempting direct Supabase upload...");
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `products/${fileName}`;
            
            // Convert file to array buffer for Supabase client
            const fileArrayBuffer = await imageFile.arrayBuffer();
            const fileBuffer = new Uint8Array(fileArrayBuffer);
            
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('eighthand')
              .upload(filePath, fileBuffer, {
                contentType: imageFile.type,
                cacheControl: '3600'
              });
              
            if (uploadError) {
              console.log("Direct upload failed:", uploadError.message);
              throw uploadError;
            }
            
            // Get the public URL
            const { data: urlData } = supabase.storage
              .from('eighthand')
              .getPublicUrl(filePath);
              
            imageUrl = urlData.publicUrl;
            console.log("Direct upload succeeded:", imageUrl);
          } catch (directUploadError) {
            console.log("Direct upload failed, trying API upload...");
            
            // If direct upload fails, try the API upload endpoint
            const uploadResponse = await fetch('/api/storage/upload', {
              method: 'POST',
              body: formData
            });
            
            const uploadResult = await uploadResponse.json();
            
            if (!uploadResponse.ok || !uploadResult.success) {
              // If regular upload fails, try the admin upload endpoint
              console.log("API upload failed, trying admin upload...");
              const adminUploadResponse = await fetch('/api/storage/admin-upload', {
                method: 'POST',
                body: formData
              });
              
              const adminUploadResult = await adminUploadResponse.json();
              
              if (!adminUploadResponse.ok || !adminUploadResult.success) {
                throw new Error(adminUploadResult.message || 'Admin upload also failed');
              }
              
              // Use the admin upload result
              imageUrl = adminUploadResult.data.url;
              console.log("Admin upload succeeded:", imageUrl);
            } else {
              // Regular upload worked
              imageUrl = uploadResult.data.url;
              console.log("API upload succeeded:", imageUrl);
            }
          }
        } catch (uploadError) {
          console.error("All upload methods failed:", uploadError);
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }
      } 
      // Otherwise use the provided URL if available
      else if (formData.image_url) {
        imageUrl = formData.image_url.trim();
        // If URL is provided but doesn't start with http:// or https://, add https://
        if (imageUrl && !imageUrl.match(/^https?:\/\//)) {
          imageUrl = `https://${imageUrl}`;
        }
      }

      // Prepare product data
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price,
        image_url: imageUrl,
        category: formData.category,
        in_stock: formData.in_stock,
      };

      console.log("Inserting product:", productData);

      // Insert product into database
      const { data, error } = await supabase.from("products").insert([productData]).select();

      if (error) {
        console.error("Database error:", error);
        throw new Error(`Database error: ${error.message}`);
      }

      console.log("Product created successfully:", data);

      // Show success message
      setSuccess(true);

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        image_url: "",
        category: "",
        in_stock: true,
      });
      setImageFile(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setImageFile(null)
      setImagePreview(null)

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/admin/products");
      }, 2000);
    } catch (error) {
      console.error("Error creating product:", error);
      setError(error.message || "Failed to create product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to check if a category exists in our database
  const categoryExists = (categoryName) => {
    return categories.includes(categoryName)
  }

  if (userLoading) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  if (!user) {
    return null // Redirect handled in useEffect
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <Link href="/admin/products" className="inline-flex items-center text-amber-500 hover:text-amber-600 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

            {error && (
              <div className="bg-red-50 text-red-800 p-4 rounded-md mb-6">
                <div className="font-medium">Error:</div>
                <div>{error}</div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-800 p-4 rounded-md mb-6">
                Product created successfully! Redirecting...
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="input-field"
                    placeholder="Enter product description"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0.01"
                    step="0.01"
                    className="input-field"
                    placeholder="0.00"
                  />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4">
                  <p className="text-amber-800 text-sm">
                    You can either upload an image file directly or provide an image URL, but not both.
                  </p>
                </div>

                {/* Image URL Input */}
                <div>
                  <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <div className="flex items-center">
                    <LinkIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                      type="text" 
                      id="image_url"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleChange}
                      className={`input-field ${imageFile ? 'bg-gray-100' : ''}`}
                      placeholder="https://example.com/image.jpg"
                      disabled={imageFile !== null}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter a URL for the product image. Leave blank to use a placeholder.
                    {imageFile && <span className="text-amber-600"> (Disabled while using file upload)</span>}
                  </p>
                  {formData.image_url && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 mb-1">Preview:</p>
                      <img
                        src={formData.image_url.match(/^https?:\/\//) ? formData.image_url : `https://${formData.image_url}`}
                        alt="Preview"
                        className="h-40 object-contain border rounded"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/placeholder.svg";
                          setError("Image URL is invalid or inaccessible. Please check the URL.");
                        }}
                        onLoad={() => {
                          // Clear any previous image errors when the image loads successfully
                          if (error && error.includes("Image URL is invalid")) {
                            setError(null);
                          }
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Image Upload Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image Upload
                  </label>
                  <div className="flex items-center">
                    <UploadCloud className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className={`input-field ${formData.image_url ? 'bg-gray-100' : ''}`}
                      ref={fileInputRef}
                      disabled={formData.image_url !== ""}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Upload an image for the product. Max size: 5MB.
                    {formData.image_url && <span className="text-amber-600"> (Disabled while using image URL)</span>}
                  </p>
                  {imagePreview && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 mb-1">Preview:</p>
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Image Preview"
                          className="h-40 object-contain border rounded"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                          aria-label="Remove image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select a category</option>

                    {/* Group categories in the dropdown */}
                    {Object.entries(categoryGroups).map(([groupName, groupCategories]) => {
                      // Only show groups that have at least one category in our database
                      const existingCategories = groupCategories.filter(categoryExists)
                      if (existingCategories.length === 0) return null

                      return (
                        <optgroup key={groupName} label={groupName}>
                          {existingCategories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </optgroup>
                      )
                    })}
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="in_stock"
                    name="in_stock"
                    checked={formData.in_stock}
                    onChange={handleChange}
                    className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="in_stock" className="ml-2 block text-sm text-gray-700">
                    In Stock
                  </label>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Link href="/admin/products" className="btn-outline mr-4">
                  Cancel
                </Link>
                <button type="submit" disabled={isSubmitting} className="btn-primary">
                  {isSubmitting ? "Creating..." : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
