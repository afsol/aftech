"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "@/utils/axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Eye, Cpu, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const FALLBACK_IMAGE =
  "https://admin.aftechnologies.pk/assets/adminassests/images/image-not-found.webp";

// ─── SUB-COMPONENT: INDIVIDUAL PRODUCT CARD ──────────────────────────────────
function ProductCard({ product, onClick }) {
  const [imgSrc, setImgSrc] = useState(product.image_url || FALLBACK_IMAGE);

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
          className="object-contain group-hover:scale-105 transition-transform duration-500"
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
          <Button
            size="sm"
            variant="secondary"
            className="h-10 w-10 p-0 rounded-xl bg-white/90 backdrop-blur-sm shadow-md"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Link href="/quote" passHref onClick={(e) => e.stopPropagation()}>
            <Button className="h-10 w-10 p-0 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md">
              <ShoppingCart size={13} />
            </Button>
          </Link>
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

// ─── MAIN COMPONENT: CATEGORY/BRAND ROW ─────────────────────────────────────
export default function CategoryRow({ id }) {
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FIX: Track global dynamic price boundaries to form accurate filter states
  const [globalPriceRange, setGlobalPriceRange] = useState({
    min: 0,
    max: 100000,
  });

  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    const headers = { "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY };

    // ✅ FIX: Parallelize brand layout mapping alongside pricing criteria context
    Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/brands/${id}`, {
        headers,
      }),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pricing-products`, {
        headers,
      }),
    ])
      .then(([brandRes, pricingRes]) => {
        // 1. Handle Brand / Product Layout Parsing
        if (brandRes.data && brandRes.data.success) {
          if (Array.isArray(brandRes.data.data)) {
            if (brandRes.data.data.length > 0) {
              setCategoryData(brandRes.data.data[0]);
            } else {
              setCategoryData(null);
            }
          } else {
            setCategoryData(brandRes.data.data);
          }
        }

        // 2. Handle Dynamic Price Matrix Initialization
        if (pricingRes.data && pricingRes.data.data) {
          const { min_price, max_price } = pricingRes.data.data;
          setGlobalPriceRange({
            min: Math.floor(min_price ?? 0),
            max: Math.ceil(max_price ?? 100000),
          });
        }
      })
      .catch((err) => {
        console.error(
          `❌ Network request boundary fault for brand context ${id}:`,
          err,
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="mb-16 animate-pulse">
        <div className="h-8 bg-slate-200 rounded-lg w-1/4 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border border-slate-100 rounded-2xl p-4 space-y-4"
            >
              <div className="aspect-square bg-slate-200 rounded-xl w-full" />
              <div className="h-4 bg-slate-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (
    !categoryData ||
    !categoryData.products ||
    categoryData.products.length === 0
  ) {
    return null;
  }

  const { category_name, products } = categoryData;

  // ✅ FIX: Construct structured URLs using URLSearchParams using dynamic data ranges
  const handleViewAllRoute = () => {
    const params = new URLSearchParams();
    params.set("brands", id.toString());
    params.set("min_price", globalPriceRange.min.toString());
    params.set("max_price", globalPriceRange.max.toString());
    params.set("page", "1");

    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="mb-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {category_name}
          </h3>
        </div>

        <Button
          variant="outline"
          onClick={handleViewAllRoute}
          className="text-blue-600 border-blue-200 hover:border-blue-600 hover:bg-blue-50/50 bg-white shadow-sm transition-all duration-200 rounded-xl font-medium"
        >
          View All {category_name}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => router.push(`/products/${product.slug}`)}
          />
        ))}
      </div>
    </div>
  );
}
