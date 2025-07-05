import { supabaseAdmin } from "../config/database.js"

export class ProductImageModel {
  static tableName = "product_images"

  // Get all images for a product
  static async findByProductId(productId) {
    try {
      const { data, error } = await supabaseAdmin
        .from(this.tableName)
        .select("*")
        .eq("product_id", productId)
        .order("display_order", { ascending: true })

      if (error) throw error
      return { success: true, data: data || [], error: null }
    } catch (error) {
      console.error("Error finding product images:", error)
      return { success: false, data: [], error: error.message }
    }
  }

  // Create new product image
  static async create(imageData) {
    try {
      const { data, error } = await supabaseAdmin
        .from(this.tableName)
        .insert([{
          product_id: imageData.product_id,
          image_url: imageData.image_url,
          is_main: imageData.is_main || false,
          display_order: imageData.display_order || 0
        }])
        .select()
        .single()

      if (error) throw error
      return { success: true, data, error: null }
    } catch (error) {
      console.error("Error creating product image:", error)
      return { success: false, data: null, error: error.message }
    }
  }

  // Create multiple product images at once
  static async createMany(images) {
    try {
      if (!images || images.length === 0) {
        return { success: true, data: [], error: null }
      }

      const { data, error } = await supabaseAdmin
        .from(this.tableName)
        .insert(images)
        .select()

      if (error) throw error
      return { success: true, data: data || [], error: null }
    } catch (error) {
      console.error("Error creating multiple product images:", error)
      return { success: false, data: [], error: error.message }
    }
  }

  // Update product image
  static async update(id, imageData) {
    try {
      const { data, error } = await supabaseAdmin
        .from(this.tableName)
        .update({
          image_url: imageData.image_url,
          is_main: imageData.is_main,
          display_order: imageData.display_order
        })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return { success: true, data, error: null }
    } catch (error) {
      console.error("Error updating product image:", error)
      return { success: false, data: null, error: error.message }
    }
  }

  // Delete product image
  static async delete(id) {
    try {
      const { error } = await supabaseAdmin
        .from(this.tableName)
        .delete()
        .eq("id", id)

      if (error) throw error
      return { success: true, error: null }
    } catch (error) {
      console.error("Error deleting product image:", error)
      return { success: false, error: error.message }
    }
  }

  // Delete all images for a product
  static async deleteByProductId(productId) {
    try {
      const { error } = await supabaseAdmin
        .from(this.tableName)
        .delete()
        .eq("product_id", productId)

      if (error) throw error
      return { success: true, error: null }
    } catch (error) {
      console.error("Error deleting product images:", error)
      return { success: false, error: error.message }
    }
  }
}
