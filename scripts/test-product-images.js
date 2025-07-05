/**
 * Tests for multiple image functionality
 * Run this in the browser console when on the product edit or product detail page
 */

// Function to test image handling in product edit page
async function testProductEditImages(productId) {
  console.log("=== Testing Product Edit Images ===");
  
  // Fetch product data
  const response = await fetch(`/api/products/${productId}`);
  const result = await response.json();
  
  if (!result.success) {
    console.error("Failed to fetch product:", result.error);
    return;
  }
  
  console.log("Product data:", result.data);
  
  // Fetch product images
  const imagesResponse = await fetch(`/api/products/${productId}/images`);
  const imagesResult = await imagesResponse.json();
  
  if (!imagesResult.success) {
    console.error("Failed to fetch product images:", imagesResult.error);
    return;
  }
  
  console.log("Product images:", imagesResult.data);
  
  // Verify the main image
  const mainImage = imagesResult.data.find(img => img.is_main);
  if (mainImage) {
    console.log("Main image found:", mainImage);
  } else {
    console.warn("No main image found in product_images table");
    console.log("Using product.image_url instead:", result.data.image_url);
  }
  
  // Verify additional images
  const additionalImages = imagesResult.data.filter(img => !img.is_main);
  console.log(`Found ${additionalImages.length} additional images`);
  
  return {
    product: result.data,
    images: imagesResult.data,
    mainImage,
    additionalImages
  };
}

// Function to test image display in product detail page
function testProductDetailImages() {
  console.log("=== Testing Product Detail Images Display ===");
  
  // Get image elements
  const mainImageElement = document.querySelector('.relative.h-96 img');
  const thumbnailElements = document.querySelectorAll('.grid.grid-cols-4 .relative img');
  
  if (mainImageElement) {
    console.log("Main image src:", mainImageElement.src);
  } else {
    console.error("Main image element not found");
  }
  
  console.log(`Found ${thumbnailElements.length} thumbnail images`);
  thumbnailElements.forEach((img, i) => {
    console.log(`Thumbnail ${i+1} src:`, img.src);
  });
  
  return {
    mainImageElement,
    thumbnailElements
  };
}

// Usage instructions
console.log(`
To test product edit images:
  await testProductEditImages('your-product-id')
  
To test product detail images:
  testProductDetailImages()
`);
