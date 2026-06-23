"use client";
import { useEffect, useState, useMemo } from "react";
import axios from "@/utils/axios";
import { ShoppingCart, Eye, Tag, Hash, ChevronLeft, ChevronRight, PackageOpen } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

// ─── Interfaces & Structural Model Types ───
type Product = {
  id: number;
  name: string;
  brand_id: number | null;
  product_category_id: string;
  specification_type: string;
  value: string;
  sku: string;
  weight: string;
  long_description: string;
  short_description: string;
  tags: string;
  price: string;
  image_url: string;
  gallery_urls: string[];
};

interface GridProps {
  viewMode: "grid" | "list";
}

// ─── Inject Keyframe Shimmer Animations safely on Mount ───
function useGlobalStyles() {
  useEffect(() => {
    const id = "products-grid-view-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = `
      @keyframes gridShimmer {
        0% { background-position: -600px 0; }
        100% { background-position: 600px 0; }
      }
      .shimmer-bg {
        background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 25%);
        background-size: 600px 100%;
        animation: gridShimmer 1.4s infinite linear;
      }
      .card-animate {
        animation: slideCardUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      @keyframes slideCardUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(el);
    return () => { document.getElementById(id)?.remove(); };
  }, []);
}

export default function ProductsGrid({ viewMode }: GridProps) {
  useGlobalStyles();

  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const searchParams = useSearchParams();
  const router = useRouter();

  // Unified Request Dispatcher Pipeline Loop 
  useEffect(() => {
    setLoading(true);
    
    // Safety check: ensure tracking pagination sync attributes are present on runtime query parameters
    const query = new URLSearchParams(searchParams.toString());
    if (!query.has("page")) query.set("page", String(currentPage));
    query.set("per_page", "12"); // Constant fixed array capacity layout count constraint

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products?${query.toString()}`, {
        headers: { "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY },
      })
      .then((res) => {
        if (res.data && res.data.success) {
          const paginated = res.data.data;
          setProducts(paginated.data || []);
          setTotalPages(paginated.last_page || 1);
          setCurrentPage(paginated.current_page || 1);
          setTotal(paginated.total || 0);
        }
      })
      .catch((err) => console.error("Axios API breakdown on data resolution hook:", err))
      .finally(() => setLoading(false));
  }, [searchParams, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const query = new URLSearchParams(searchParams.toString());
    query.set("page", String(newPage));
    router.push(`/products?${query.toString()}`);
  };

  // Compile Pagination Page Nodes array allocation matrix
  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "...")[] = [1];
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  }, [currentPage, totalPages]);

  // Loading skeleton block matrix wrapper callback
  if (loading) {
    return (
      <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`bg-white border border-slate-100 rounded-2xl p-4 ${viewMode === "list" ? "flex flex-col sm:flex-row gap-5" : ""}`}>
            <div className={`shimmer-bg rounded-xl bg-slate-100 ${viewMode === "list" ? "w-full sm:w-44 h-40 sm:h-32 flex-shrink-0" : "aspect-square w-full mb-4"}`} />
            <div className="flex-1 space-y-3 py-2">
              <div className="h-4 bg-slate-100 shimmer-bg rounded w-3/4" />
              <div className="h-3 bg-slate-100 shimmer-bg rounded w-1/2" />
              <div className="h-5 bg-slate-100 shimmer-bg rounded w-1/4 mt-4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center border border-dashed border-slate-200 bg-white rounded-3xl">
        <div className="h-12 w-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mb-4 text-slate-400">
          <PackageOpen className="h-6 w-6" />
        </div>
        <h3 className="font-serif text-lg font-semibold text-slate-800">No Inventory Found</h3>
        <p className="text-sm text-slate-400 max-w-sm mt-1">We couldn't track matching items. Refine your parameter categories list or check back later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Dynamic Structural Grid vs List presentation frame engine */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className="card-animate" 
            style={{ animationDelay: `${index * 0.03}s` }}
          >
            <ProductCardItem product={product} viewMode={viewMode} router={router} />
          </div>
        ))}
      </div>

      {/* Pagination Footnote Navigation row toolbar layout strip */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
          <p className="text-xs font-medium text-slate-400 tracking-wide uppercase">
            Viewing total {total} solutions array entries
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-9 w-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {pageNumbers.map((num, idx) => num === "..." ? (
              <span key={`ellipsis-${idx}`} className="px-2 text-slate-400 tracking-widest text-sm">...</span>
            ) : (
              <button
                key={num}
                onClick={() => handlePageChange(num as number)}
                className={`h-9 min-w-[36px] px-2 text-xs font-semibold rounded-xl transition-all ${currentPage === num ? "bg-slate-900 text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-9 w-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-Component: Product Card Presenter ───
function ProductCardItem({ product, viewMode, router }: { product: Product; viewMode: "grid" | "list"; router: any }) {
  const [imgError, setImgError] = useState(false);
  const [adding, setAdding] = useState(false);

  const triggerAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdding(true);
    setTimeout(() => setAdding(false), 1200);
  };

  const currentImg = product.image_url;

  if (viewMode === "list") {
    return (
      <article 
        onClick={() => router.push(`/products/${product.id}`)}
        className="group flex flex-col sm:flex-row bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer p-4 gap-5"
      >
        <div className="relative w-full sm:w-44 h-44 sm:h-36 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full height-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
          <span className="absolute top-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wide border border-slate-100 shadow-xs">
            <Tag size={10} className="text-slate-400" />
            {product.product_category_id || "General"}
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <h2 className="font-serif text-base font-semibold text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-1">
              {product.name}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-1.5">
              <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                <Hash size={10} /> {product.sku || "N/A"}
              </span>
            </div>
            {product.short_description && (
              <p className="text-xs text-slate-400 mt-2 line-clamp-2 max-w-xl font-normal leading-relaxed">
                {product.short_description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 mt-4 sm:mt-0 pt-3 border-t border-slate-50">
            <span className="text-base font-semibold text-slate-900 tracking-tight">
              PKR {product.price ? Number(product.price).toLocaleString() : "—"}
            </span>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 rounded-full p-0 text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              >
                <Eye size={15} />
              </Button>
              {/* <Button
                size="sm"
                onClick={triggerAddToCart}
                className={`h-8 px-4 rounded-xl text-xs font-medium transition-all ${adding ? "bg-emerald-600 hover:bg-emerald-600 text-white" : "bg-slate-900 text-white hover:bg-slate-800"}`}
              >
                <ShoppingCart size={13} className="mr-1.5" />
                {adding ? "Added" : "Purchase"}
              </Button> */}
              <Link href="/quote" passHref onClick={(e) => e.stopPropagation()}>
                <Button className="h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-medium flex items-center gap-1.5">
                  <ShoppingCart size={13} />
                  
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Fallback Native Grid Render Element Box
  return (
    <article 
      onClick={() => router.push(`/products/${product.id}`)}
      className="group bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden cursor-pointer"
    >
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden border-b border-slate-50">
        <img
          src={currentImg}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
        
        <span className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[9px] font-bold text-slate-600 uppercase tracking-wider border border-slate-100 shadow-xs">
          <Tag size={9} className="text-slate-400" />
          {product.product_category_id || "General"}
        </span>

        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
          <div className="h-9 w-9 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-md scale-75 group-hover:scale-100 transition-transform duration-300">
            <Eye size={16} />
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div className="space-y-1">
          <h2 className="font-serif text-sm font-semibold text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-2 min-h-[40px] leading-snug">
            {product.name}
          </h2>
          <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-mono">
            <Hash size={9} /> {product.sku || "—"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100">
          <span className="text-sm font-bold text-slate-900 tracking-tight">
            PKR {product.price ? Number(product.price).toLocaleString() : "—"}
          </span>
          {/* <Button
            size="sm"
            onClick={triggerAddToCart}
            className={`h-8 w-8 rounded-full p-0 transition-all ${adding ? "bg-emerald-600 hover:bg-emerald-600 text-white" : "bg-slate-900 text-white hover:bg-slate-800"}`}
          >
            <ShoppingCart size={13} />
          </Button> */}
          <Link href="/quote" passHref onClick={(e) => e.stopPropagation()}>
            <Button className="h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-medium flex items-center gap-1.5">
              <ShoppingCart size={13} />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}