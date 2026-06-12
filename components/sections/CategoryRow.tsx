"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "@/utils/axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Eye, ShoppingBag, Cpu } from "lucide-react";
import { useRouter } from "next/navigation";

const FALLBACK_IMAGE = "https://aftechnologies.pk/assets/adminassests/images/image-not-found.webp";

// ─── SUB-COMPONENT: INDIVIDUAL PRODUCT CARD ──────────────────────────────────
// This isolates the imgSrc state safely for EVERY product card independently
function ProductCard({ product, onClick }) {
  const [imgSrc, setImgSrc] = useState(
    product.image_url || FALLBACK_IMAGE
  );

  return (
    <Card 
      onClick={onClick}
      className="group border-slate-100/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.02)] hover:shadow-[0_20px_30px_-10px_rgba(15,23,42,0.06)] border rounded-2xl overflow-hidden bg-white transition-all duration-300 cursor-pointer"
    >
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden border-b border-slate-50">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => {
            if (imgSrc !== FALLBACK_IMAGE) {
              setImgSrc(FALLBACK_IMAGE);
            }
          }}
        />
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-slate-900/80 backdrop-blur-md text-white font-medium text-[10px] uppercase tracking-wide px-2.5 py-1 border border-white/10 rounded-lg">
            {product.brand_id || "Enterprise"}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5 z-20">
          <Button size="sm" variant="secondary" className="h-10 w-10 p-0 rounded-xl bg-white/90 backdrop-blur-sm shadow-md">
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="sm" className="h-10 w-10 p-0 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md">
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-5">
        <div className="flex flex-col h-full justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#0D6EFD] font-bold text-[10px] uppercase tracking-wider">
              <Cpu className="h-3.5 w-3.5" />
              {product.specification_type || "System Node"}
            </div>
            <h4 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 h-10 capitalize">
              {product.name ? product.name.toLowerCase() : ""}
            </h4>
          </div>
          <div className="pt-2 border-t border-slate-50 flex items-baseline gap-2">
            <span className="text-base font-extrabold text-slate-900">
              PKR {product.price ? Number(product.price).toLocaleString() : "0"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── MAIN COMPONENT: CATEGORY ROW ─────────────────────────────────────────────
export default function CategoryRow({ id }) {
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
  if (!id) return;
  
  setLoading(true);
  console.log(`📡 Fetching category ID: ${id} from: ${process.env.NEXT_PUBLIC_API_URL}/products/categories/${id}`);

  axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/products/categories/${id}`, {
      headers: { "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY },
    })
    .then((res) => {
      // 😉 Let's see exactly what your Laravel API is replying with!
      console.log(`✅ API Response for Category ${id}:`, res.data);

      if (res.data && res.data.success) {
        // Handle both data structures: array of categories vs direct category object
        if (Array.isArray(res.data.data)) {
          if (res.data.data.length > 0) {
            setCategoryData(res.data.data[0]);
          } else {
            console.warn(`⚠️ Category ID ${id} returned a success status, but the data array is empty.`);
            setCategoryData(null);
          }
        } else {
          // Fallback if your route returns a direct object instead of an array matrix
          setCategoryData(res.data.data);
        }
      }
    })
    .catch((err) => {
      console.error(`❌ Axios network breakdown for category ${id}:`, err);
    })
    .finally(() => {
      // 💥 CRITICAL: This ensures the skeleton stops spinning no matter what!
      setLoading(false);
    });
}, [id]);

  if (loading) {
    return (
      <div className="mb-16 animate-pulse">
        <div className="h-8 bg-slate-200 rounded-lg w-1/4 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border border-slate-100 rounded-2xl p-4 space-y-4">
              <div className="aspect-square bg-slate-200 rounded-xl w-full" />
              <div className="h-4 bg-slate-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!categoryData || !categoryData.products || categoryData.products.length === 0) {
    return null;
  }

  const { category_name, products } = categoryData;

  return (
    <div className="mb-16">
      {/* Top Header Row Layout */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {category_name}
          </h3>
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => router.push(`/products?category_id=${id}`)}
          className="text-blue-600 border-blue-200 hover:border-blue-600 hover:bg-blue-50/50 bg-white shadow-sm transition-all duration-200 rounded-xl font-medium"
        >
          View All {category_name}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Responsive 4-Column Product Layout Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            product={product}
            onClick={() => router.push(`/products/${product.id}`)}
          />
        ))}
      </div>
    </div>
  );
}


// "use client";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import axios from "@/utils/axios";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import { ChevronRight, Eye, ShoppingBag, Cpu } from "lucide-react";
// import { useRouter } from "next/navigation";

// export default function CategoryRow({ id }) {
//   const [categoryData, setCategoryData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   const [imgSrc, setImgSrc] = useState(
//     product.image_url || "https://aftechnologies.pk/assets/adminassests/images/image-not-found.webp"
//   );

//   const fallbackImage = "https://aftechnologies.pk/assets/adminassests/images/image-not-found.webp";

//   useEffect(() => {
//     if (!id) return;
    
//     setLoading(true);
//     axios
//       .get(`${process.env.NEXT_PUBLIC_API_URL}/products/categories/${id}`, {
//         headers: { "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY },
//       })
//       .then((res) => {
//         if (res.data && res.data.success && res.data.data?.length > 0) {
//           // Store the specific category object block
//           setCategoryData(res.data.data[0]);
//         }
//       })
//       .catch((err) => console.error(`Error fetching category ${id}:`, err))
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="mb-16 animate-pulse">
//         <div className="h-8 bg-slate-200 rounded-lg w-1/4 mb-6" />
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {[1, 2, 3, 4].map((i) => (
//             <div key={i} className="border border-slate-100 rounded-2xl p-4 space-y-4">
//               <div className="aspect-square bg-slate-200 rounded-xl w-full" />
//               <div className="h-4 bg-slate-200 rounded w-3/4" />
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // If no category was returned or product list is completely empty, hide the row cleanly
//   if (!categoryData || !categoryData.products || categoryData.products.length === 0) {
//     return null;
//   }

//   const { category_name, products } = categoryData;

//   return (
//     <div className="mb-16">
//       {/* Top Header Row Layout */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
//         <div>
//           <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
//             {category_name}
//           </h3>
//         </div>
        
//         <Button 
//           variant="outline" 
//           onClick={() => router.push(`/products?category_id=${id}`)}
//           className="text-blue-600 border-blue-200 hover:border-blue-600 hover:bg-blue-50/50 bg-white shadow-sm transition-all duration-200 rounded-xl font-medium"
//         >
//           View All {category_name}
//           <ChevronRight className="ml-2 h-4 w-4" />
//         </Button>
//       </div>

//       {/* Responsive 4-Column Product Layout Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <Card 
//             key={product.id} 
//             onClick={() => router.push(`/products/${product.id}`)}
//             className="group border-slate-100/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.02)] hover:shadow-[0_20px_30px_-10px_rgba(15,23,42,0.06)] border rounded-2xl overflow-hidden bg-white transition-all duration-300 cursor-pointer"
//           >
//             <div className="relative aspect-square w-full bg-slate-50 overflow-hidden border-b border-slate-50">
//               <Image
//           // 2. Bind the source directly to our controlled React state
//           src={imgSrc}
//           alt={product.name}
//           fill
//           sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
//           className="object-cover group-hover:scale-105 transition-transform duration-500"
          
//           // 3. Clean React-controlled state update on error
//           onError={() => {
//             if (imgSrc !== fallbackImage) {
//               setImgSrc(fallbackImage);
//             }
//           }}
//         />
//               <div className="absolute top-3 left-3 z-10">
//                 <Badge className="bg-slate-900/80 backdrop-blur-md text-white font-medium text-[10px] uppercase tracking-wide px-2.5 py-1 border border-white/10 rounded-lg">
//                   {product.brand_id || "Enterprise"}
//                 </Badge>
//               </div>
//               <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5 z-20">
//                 <Button size="sm" variant="secondary" className="h-10 w-10 p-0 rounded-xl bg-white/90 backdrop-blur-sm shadow-md">
//                   <Eye className="h-4 w-4" />
//                 </Button>
//                 <Button size="sm" className="h-10 w-10 p-0 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md">
//                   <ShoppingBag className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>

//             <CardContent className="p-5">
//               <div className="flex flex-col h-full justify-between gap-3">
//                 <div className="space-y-1.5">
//                   <div className="flex items-center gap-1.5 text-[#0D6EFD] font-bold text-[10px] uppercase tracking-wider">
//                     <Cpu className="h-3.5 w-3.5" />
//                     {product.specification_type || "System Node"}
//                   </div>
//                   <h4 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 h-10 capitalize">
//                     {product.name.toLowerCase()}
//                   </h4>
//                 </div>
//                 <div className="pt-2 border-t border-slate-50 flex items-baseline gap-2">
//                   <span className="text-base font-extrabold text-slate-900">
//                     PKR {Number(product.price).toLocaleString()}
//                   </span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }