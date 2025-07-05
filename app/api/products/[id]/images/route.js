import { NextResponse } from "next/server"
import { ProductService } from "@/backend/services/ProductService"

// GET /api/products/[id]/images - Get all images for a product
export async function GET(request, { params }) {
  try {
    const id = await Promise.resolve(params).then(p => p.id)
    
    const result = await ProductService.getProductImages(id)
    
    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to fetch product images" }, { status: 400 })
    }
    
    return NextResponse.json({
      success: true,
      data: result.data,
    })
  } catch (error) {
    console.error("Error fetching product images:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// POST /api/products/[id]/images - Add images to a product
export async function POST(request, { params }) {
  try {
    const id = await Promise.resolve(params).then(p => p.id)
    const { images } = await request.json()
    
    if (!images || !Array.isArray(images)) {
      return NextResponse.json({ error: "Images array is required" }, { status: 400 })
    }
    
    const result = await ProductService.addProductImages(id, images)
    
    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to add product images" }, { status: 400 })
    }
    
    return NextResponse.json({
      success: true,
      data: result.data,
    })
  } catch (error) {
    console.error("Error adding product images:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// PUT /api/products/[id]/images - Update all images for a product
export async function PUT(request, { params }) {
  try {
    const id = await Promise.resolve(params).then(p => p.id)
    const { images } = await request.json()
    
    if (!images || !Array.isArray(images)) {
      return NextResponse.json({ error: "Images array is required" }, { status: 400 })
    }
    
    const result = await ProductService.updateProductImages(id, images)
    
    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to update product images" }, { status: 400 })
    }
    
    return NextResponse.json({
      success: true,
      data: result.data,
    })
  } catch (error) {
    console.error("Error updating product images:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
