import type { Product, ProductFilters, ProductCategory } from "@/types/product"
import { productsData } from "@/data/products"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  await delay(100) // Simulate API call

  let filteredProducts = [...productsData]

  // Apply filters
  if (filters.category) {
    filteredProducts = filteredProducts.filter((p) => p.category === filters.category)
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (p) => p.name.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm),
    )
  }

  if (filters.brand) {
    filteredProducts = filteredProducts.filter((p) => p.brand === filters.brand)
  }

  if (filters.inStock !== undefined) {
    filteredProducts = filteredProducts.filter((p) => p.inStock === filters.inStock)
  }

  // Pagination
  const page = filters.page || 1
  const limit = filters.limit || 12
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  return filteredProducts.slice(startIndex, endIndex)
}

export async function getProductById(id: string): Promise<Product | null> {
  await delay(100) // Simulate API call

  return productsData.find((p) => p.id === id) || null
}

export async function getRelatedProducts(category: ProductCategory, excludeId: string): Promise<Product[]> {
  await delay(100) // Simulate API call

  return productsData.filter((p) => p.category === category && p.id !== excludeId).slice(0, 4)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await delay(100) // Simulate API call

  return productsData.filter((p) => p.isOnSale).slice(0, 8)
}
