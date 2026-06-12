import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types/product"
import { Eye, ShoppingBag, Star } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden">
        <Image
          src={product.images[0] || "/placeholder.svg?height=200&width=200"}
          alt={product.name}
          width={200}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isOnSale && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-red-500 text-white">Sale</Badge>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-2">
            <Link href={`/products/${product.id}`}>
              <Button size="sm" variant="secondary">
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
            </Link>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <ShoppingBag className="h-4 w-4 mr-1" />
              Buy
            </Button>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs">
            {product.category.toUpperCase()}
          </Badge>
          <Link href={`/products/${product.id}`}>
            <h4 className="font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
              {product.name}
            </h4>
          </Link>
          <div className="flex items-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-blue-600">{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
            )}
          </div>
          <p className="text-xs text-gray-600 line-clamp-2">{product.shortDescription}</p>
        </div>
      </CardContent>
    </Card>
  )
}
