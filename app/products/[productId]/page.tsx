import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: { productId: string } }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.productId}`, {
      headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC_X_API_KEY || '',
      },
      cache: 'no-store',
    });

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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{product.name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              
              {/* Left: Product Image */}
              <div className="flex justify-center items-start">
                {product.image_url ? (
                  <img
                    src={product.image_url.startsWith('http') ? product.image_url : `http://localhost:8000${product.image_url}`}
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
                  <p className="text-2xl font-bold text-blue-700">PKR {product.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">SKU: <span className="font-medium text-gray-800">{product.sku}</span></p>
                  <p className="text-sm text-gray-500">Brand: <span className="font-medium text-gray-800">{product.brand_id}</span></p>
                  <p className="text-sm text-gray-500">Category: <span className="font-medium text-gray-800">{product.product_category_id}</span></p>
                </div>

                <div>
                  <h2 className="text-sm uppercase tracking-wider font-bold text-gray-600 mb-2">Short Description</h2>
                  <div
                    className={`text-sm text-gray-600 leading-relaxed product-content-${product.id}`}
                    dangerouslySetInnerHTML={{ __html: product.short_discription || "" }}
                  />
                </div>

                {/* Tags UI - Matching your uploaded screenshot */}
                {product.tags && (
                  <div className="mt-4">
                    <h2 className="text-sm uppercase tracking-wider font-bold text-gray-600 mb-2">Tags</h2>
                    <div className="flex flex-wrap gap-2">
                      {JSON.parse(product.tags).map((tag: { value: string }, index: number) => (
                        <div
                          key={index}
                          className="flex items-center border border-gray-300 bg-gray-50 px-3 py-1 text-sm text-gray-700 rounded-sm"
                        >
                          {tag.value}
                          <span className="ml-2 text-gray-400 text-xs">×</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Section: Full Specifications / Long Description */}
            <div className="mt-10 border-t pt-10 pb-20">
              {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">Specifications</h2> */}
              <div 
              style={{ 
                height: 'auto', 
                maxHeight: 'none', 
                overflow: 'visible' 
              }}
              className={`spec-table-container product-content-${product.id} w-full`} 
              dangerouslySetInnerHTML={{ __html: product.long_description || "" }}
              />
            </div>

          </div>
        </main>
      </div>
        <Footer />
      </>
    );
  } catch (error) {
    console.error('Fetch error:', error);
    return notFound();
  }
}














// import Footer from '@/components/layout/footer';
// import Header from '@/components/layout/header';
// import { notFound } from 'next/navigation';

// export default async function ProductPage({ params }: { params: { productId: string } }) {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.productId}`, {
//       headers: {
//         'X-API-KEY': process.env.NEXT_PUBLIC_X_API_KEY || '',
//       },
//       cache: 'no-store',
//     });

//     if (!res.ok) return notFound();

//     const product = await res.json();
//     if (!product?.id) return notFound();

//     return (
//       <>
//         <Header />
//         <div className="container ">
//           <div className="mx-auto px-4 py-8">
//             <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Product Image */}
//               <div>
//                 {product.image_url ? (
//                   <img
//                     src={
//                       product.image_url.startsWith('http')
//                         ? product.image_url
//                         : `http://localhost:8000${product.image_url}`
//                     }
//                     alt={product.name}
//                     className="w-full h-auto rounded shadow"
//                   />
//                 ) : (
//                   <div className="bg-gray-200 h-64 flex items-center justify-center">
//                     <span>No image available</span>
//                   </div>
//                 )}

//               </div>

//               {/* Product Info */}
//               <div>
//                 <p className="text-xl font-semibold text-green-600">PKR {product.price}</p>

//                 {product.weight && (
//                   <p className="mt-2 text-sm text-gray-600">Weight: {product.weight}</p>
//                 )}

//                 {product.sku && (
//                   <p className="mt-2 text-sm text-gray-600">SKU: {product.sku}</p>
//                 )}

//                 {product.brand_id && (
//                   <p className="mt-2 text-sm text-gray-600">Brand: {product.brand_id}</p>
//                 )}

//                 {product.product_category_id && (
//                   <p className="mt-2 text-sm text-gray-600">
//                     Category: {product.product_category_id}
//                   </p>
//                 )}

//                 <div className="mt-4">
//                   <h2 className="text-lg font-medium">Short Description</h2>
//                   <style>
//                     {`
//                       .product-content-${product.id} ul {
//                         list-style-type: disc;
//                         margin-left: 1.25rem;
//                       }

//                       .product-content-${product.id} li::marker {
//                         color: ${product.icon_color}; /* dynamic color */
//                         font-size: 16pt;
//                       }

//                       .product-content-${product.id} li {
//                         font-size: 12pt;
//                         color: #4B5563;
//                         margin-bottom: 0.5rem;
//                       }
//                     `}
//                   </style>
//                   <div
//                     className={`text-sm leading-relaxed product-content-${product.id}`}
//                     dangerouslySetInnerHTML={{ __html: product.short_discription || "" }}
//                   />
//                 </div>

//                 {product.tags && (
//                   <div className="mt-4">
//                     <h2 className="text-lg font-medium">Tags</h2>
//                     <div className="flex flex-wrap gap-2 mt-1">
//                       {JSON.parse(product.tags).map((tag: { value: string }, index: number) => (
//                         <span
//                           key={index}
//                           className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
//                         >
//                           {tag.value}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className={`text-sm leading-relaxed product-content-${product.id}`} dangerouslySetInnerHTML={{ __html: product.long_description || "" }} />
//           </div>
//         </div>

//         <Footer />
//       </>
//     );
//   } catch (error) {
//     console.error('Fetch error:', error);
//     return notFound();
//   }
// }
