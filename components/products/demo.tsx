<div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.images[0] || "/placeholder.svg?height=500&width=500"}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.isOnSale && <Badge className="absolute top-4 left-4 bg-red-500 text-white">Sale</Badge>}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1, 5).map((image, index) => (
                <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={image || "/placeholder.svg?height=100&width=100"}
                    alt={`${product.name} ${index + 2}`}
                    fill
                    className="object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-blue-600">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">{product.originalPrice}</span>
                )}
                {product.isOnSale && <Badge className="bg-green-500 text-white">Save {product.discount}%</Badge>}
              </div>
              <p className="text-gray-600">{product.shortDescription}</p>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-orange-500 text-orange-600 hover:bg-orange-50 bg-transparent"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call for Best Price: +92-51-123-4567
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Warranty</p>
                <p className="text-xs text-gray-600">{product.warranty}</p>
              </div>
              <div className="text-center">
                <Truck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Free Delivery</p>
                <p className="text-xs text-gray-600">Islamabad</p>
              </div>
              <div className="text-center">
                <Phone className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Support</p>
                <p className="text-xs text-gray-600">24/7 Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              <button className="py-2 px-1 border-b-2 border-blue-600 text-blue-600 font-medium">Specifications</button>
              <button className="py-2 px-1 text-gray-500 hover:text-gray-700">Description</button>
              <button className="py-2 px-1 text-gray-500 hover:text-gray-700">Reviews ({product.reviewCount})</button>
            </nav>
          </div>

          <ProductSpecifications specifications={product.specifications} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} />}