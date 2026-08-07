import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import PricingAlert from "@/components/sections/PriceAlert";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${params.productId}`,
      {
        headers: {
          "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY || "",
        },
        cache: "no-store",
      },
    );

    if (!res.ok) return notFound();

    const product = await res.json();
    if (!product?.id) return notFound();

    return (
      <>
        <div className="flex flex-col min-h-screen bg-white">
          <Header />

          {/* 2. flex-grow pushes the footer to the bottom of the page */}
          <main className="flex-grow bg-white">
            <div className="container mx-auto px-4 py-8">
              {/* Top Section: Title and Basic Info */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {product.name}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                {/* Left: Product Image */}
                <div className="flex justify-center items-start">
                  {product.image_url ? (
                    <img
                      src={
                        product.image_url.startsWith("http")
                          ? product.image_url
                          : `http://localhost:8000${product.image_url}`
                      }
                      alt={product.name}
                      className="w-full max-w-md h-auto rounded-lg shadow-sm border border-gray-100"
                    />
                  ) : (
                    <div className="bg-gray-100 w-full aspect-square flex items-center justify-center rounded-lg">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                </div>

                {/* Right: Product Summary */}
                <div className="flex flex-col space-y-4">
                  <div className="border-b pb-4">
                    {product.sku && (
                      <p className="text-sm text-gray-500 mt-1">
                        SKU:{" "}
                        <span className="font-medium text-gray-800">
                          {product.sku}
                        </span>
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      Brand:{" "}
                      <span className="font-medium text-gray-800">
                        {product.brand_id}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Category:{" "}
                      <span className="font-medium text-gray-800">
                        {product.product_category_id}
                      </span>
                    </p>
                  </div>

                  <div>
                    <h2 className="text-sm uppercase tracking-wider font-bold text-gray-600 mb-2">
                      Short Description
                    </h2>
                    <div
                      className={`text-sm text-gray-600 leading-relaxed product-content-${product.id}`}
                      dangerouslySetInnerHTML={{
                        __html: product.short_discription || "",
                      }}
                    />
                  </div>
                    <PricingAlert />
                  {/* Tags UI - Matching your uploaded screenshot */}
                  {product.tags && (
                    <div className="mt-4">
                      <h2 className="text-sm uppercase tracking-wider font-bold text-gray-600 mb-2">
                        Tags
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {JSON.parse(product.tags).map(
                          (tag: { value: string }, index: number) => (
                            <div
                              key={index}
                              className="flex items-center border border-gray-300 bg-gray-50 px-3 py-1 text-sm text-gray-700 rounded-sm"
                            >
                              {tag.value}
                              <span className="ml-2 text-gray-400 text-xs">
                                ×
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                  
                </div>
              </div>

              {/* Bottom Section: Full Specifications / Long Description */}
              <div className="mt-10 border-t pt-10 pb-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Specifications</h2>
                <div 
                  style={{ 
                    height: 'auto', 
                    maxHeight: 'none', 
                    overflow: 'auto',
                  }}
                  className={`
                    scrollspy-right-box 
                    spec-table-container 
                    product-content-${product.id} 
                    w-full
                    
                    /* 🎨 Global Typography Overrides */
                    [&_*]:!font-['Inter',_sans-serif] 
                    [&_*]:!text-[12px] 
                    [&_*]:!leading-relaxed
                    
                    /* 🧼 Height & Spacing Reset Engine */
                    [&_*]:!h-auto
                    [&_br+br]:hidden 
                    [&_p:empty]:hidden 
                    
                    /* 🚨 NEW: Collapses all trailing margin/padding spacing from last elements */
                    flex flex-col
                    [&>*:last-child]:!mb-0
                    [&>*:last-child]:!pb-0
                    
                    /* 📐 Clean layout spacing */
                    [&_p]:mb-3
                  `} 
                  /* 🚨 NEW: Uses a JavaScript regex replace to strip trailing breaks and empty paragraph codes from the DB string before rendering */
                  dangerouslySetInnerHTML={{ 
                    __html: (product.long_description || "")
                      .replace(/(<br\s*\/?>|\s|&nbsp;|<\/?p>\s*<\/?p>)+$/, "") 
                  }}
                />
              </div>
              
            </div>
          </main>
        </div>
        <Footer />
      </>
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return notFound();
  }
}