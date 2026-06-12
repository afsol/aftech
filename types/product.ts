export type ProductCategory = "cctv" | "solar" | "accessories" | "dvr" | "inverters" | "batteries"

export interface Product {
  id: string
  name: string
  category: ProductCategory
  price: string
  originalPrice?: string
  discount?: number
  isOnSale: boolean
  shortDescription: string
  description: string
  features: string[]
  specifications: Record<string, string>
  images: string[]
  rating: number
  reviewCount: number
  warranty: string
  inStock: boolean
  brand: string
  model: string
  createdAt: string
  updatedAt: string
}

export interface ProductFilters {
  category?: ProductCategory
  search?: string
  minPrice?: number
  maxPrice?: number
  brand?: string
  inStock?: boolean
  page?: number
  limit?: number
}
