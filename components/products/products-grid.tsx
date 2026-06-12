"use client";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { ShoppingCart, Eye, Tag, Hash, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────
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
  created_at: string;
  updated_at: string;
  image_url: string;
  gallery_urls: string[];
};

type Tag = {
  value: string;
};

type PaginatedResponse<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

const PER_PAGE_OPTIONS = [12, 24, 48];

// ─── Inject global CSS once on client only (avoids SSR hydration mismatch) ───
function useGlobalStyles() {
  useEffect(() => {
    const id = "products-grid-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,300&family=DM+Sans:wght@300;400;500&display=swap');

      @keyframes shimmer {
        0%   { background-position: -600px 0; }
        100% { background-position:  600px 0; }
      }

      @keyframes cardIn {
        from { opacity: 0; transform: translateY(14px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      .card-enter { animation: cardIn 0.38s ease both; }
    `;
    document.head.appendChild(el);
    return () => { document.getElementById(id)?.remove(); };
  }, []);
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={s.skeletonCard}>
      <div style={{ ...s.skeletonImg, ...s.shimmer }} />
      <div style={s.skeletonBody}>
        <div style={{ ...s.skeletonLine, width: "75%", ...s.shimmer }} />
        <div style={{ ...s.skeletonLine, width: "45%", ...s.shimmer }} />
        <div style={{ ...s.skeletonLine, width: "60%", ...s.shimmer }} />
      </div>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, onView }: { product: Product; onView: (id: number) => void }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdding(true);
    setTimeout(() => setAdding(false), 1200);
  };

  return (
    <article
      style={{
        ...s.productCard,
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 8px 32px rgba(0,0,0,0.10)"
          : "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={s.imageWrap}>
        {!imgLoaded && <div style={{ ...s.imgSkeleton, ...s.shimmer }} />}
        <img
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          style={{
            ...s.cardImg,
            opacity: imgLoaded ? 1 : 0,
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
          onLoad={() => setImgLoaded(true)}
        />
        <div style={{ ...s.overlay, opacity: hovered ? 1 : 0 }}>
          <button
            style={{ ...s.viewBtn, transform: hovered ? "translateY(0)" : "translateY(8px)" }}
            onClick={() => onView(product.id)}
          >
            <Eye size={15} />
            <span>Quick View</span>
          </button>
        </div>
        <span style={s.categoryChip}>
          <Tag size={10} />
          {product.product_category_id}
        </span>
      </div>

      <div style={s.cardBody}>
        <h2 style={s.cardTitle}>{product.name}</h2>
        <div style={s.cardMeta}>
          <span style={s.skuBadge}>
            <Hash size={10} />
            {product.sku || "—"}
          </span>
        </div>
        <div style={s.cardFooter}>
          <span style={s.price}>PKR {product.price}</span>
          <button
            style={{ ...s.cartBtn, background: adding ? "#5a7c4a" : "#1a1713" }}
            onClick={handleAddToCart}
          >
            <ShoppingCart size={14} />
            <span style={{ fontSize: "0.72rem" }}>{adding ? "Added!" : "Add"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "...")[] = [1];
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  return (
    <div style={s.pagination}>
      <button
        style={{ ...s.pageNavBtn, opacity: currentPage === 1 ? 0.35 : 1, cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={15} />
      </button>

      {getPageNumbers().map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} style={s.pageEllipsis}>…</span>
        ) : (
          <button
            key={p}
            style={{ ...s.pageNumBtn, ...(p === currentPage ? s.pageNumBtnActive : {}) }}
            onClick={() => onPageChange(p as number)}
          >
            {p}
          </button>
        )
      )}

      <button
        style={{ ...s.pageNavBtn, opacity: currentPage === totalPages ? 0.35 : 1, cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ProductsGrid() {
  useGlobalStyles(); // ← client-only, no SSR mismatch

  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(12);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const fetchProducts = (page = 1, limit = perPage) => {
    setLoading(true);

    const queryString = searchParams.toString();
    
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products?${queryString}`, {
        headers: { "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY },
      })
      .then((res) => {
        const paginated = res.data.data;
        setProducts(paginated.data);
        setTotalPages(paginated.last_page || 1);
        setCurrentPage(paginated.current_page);
        setTotal(paginated.total || 0);
      })
      .catch((err) => console.error("API error:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    router.replace(`/products?page=${currentPage}&per_page=${perPage}`);
  }, [currentPage, perPage]);

  useEffect(() => {
    fetchProducts(currentPage, perPage);
  }, [currentPage, perPage]);


useEffect(() => {
  fetchProducts();
}, [searchParams]);
  const handlePerPageChange = (value: number) => {
    setPerPage(value);
    setCurrentPage(1);

    router.push(`/products?page=1&per_page=${value}`);
  };

  return (
    <div style={s.root}>
      {/* ── Toolbar ── */}
      <div style={s.toolbar}>
        <div>
          {!loading && total > 0 && (
            <p style={s.totalCount}>{total} products total</p>
          )}
        </div>

        <div style={s.perPageWrap}>
          <span style={s.perPageLabel}>Show</span>
          <div style={s.perPageBtns}>
            {PER_PAGE_OPTIONS.map((n) => (
              <button
                key={n}
                style={{ ...s.perPageBtn, ...(perPage === n ? s.perPageBtnActive : {}) }}
                onClick={() => handlePerPageChange(n)}
              >
                {n}
              </button>
            ))}
          </div>
          <span style={s.perPageLabel}>per page</span>
        </div>
      </div>

      {/* ── Grid ── */}
      <div style={s.grid}>
        {loading ? (
          Array.from({ length: Math.min(perPage, 9) }).map((_, i) => <SkeletonCard key={i} />)
        ) : products.length > 0 ? (
          products.map((product, i) => (
            <div key={product.id} className="card-enter" style={{ animationDelay: `${i * 0.04}s` }}>
              <ProductCard product={product} onView={(id) => router.push(`/products/${id}`)} />
            </div>
          ))
        ) : (
          <div style={s.emptyState}>
            <div style={s.emptyIcon}><ShoppingCart size={22} color="#9e9789" /></div>
            <p style={s.emptyTitle}>No products found</p>
            <p style={s.emptySub}>Try adjusting your filters or check back later.</p>
          </div>
        )}
      </div>

      {/* ── Pagination ── */}
      {!loading && totalPages > 1 && (
        <div style={s.paginationRow}>
          <span style={s.pageInfo}>
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  root: { fontFamily: "'DM Sans', sans-serif", background: "#f7f5f0", minHeight: "100vh", padding: "40px 32px" },
  toolbar: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "32px", borderBottom: "1.5px solid #d9d4c7", paddingBottom: "20px" },
  title: { fontFamily: "'Fraunces', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 500, color: "#1a1713", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "6px" },
  titleEm: { fontStyle: "italic", color: "#8b6f47" },
  totalCount: { fontSize: "0.78rem", color: "#9e9789", fontWeight: 300, letterSpacing: "0.05em", textTransform: "uppercase", marginTop: "4px" },
  perPageWrap: { display: "flex", alignItems: "center", gap: "10px" },
  perPageLabel: { fontSize: "0.78rem", color: "#9e9789", fontWeight: 400, letterSpacing: "0.04em", textTransform: "uppercase" },
  perPageBtns: { display: "flex", gap: "4px", background: "#ede9e0", borderRadius: "50px", padding: "3px" },
  perPageBtn: { padding: "5px 13px", border: "none", borderRadius: "50px", background: "transparent", color: "#5c5243", fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", fontWeight: 500, cursor: "pointer", transition: "background 0.18s, color 0.18s" },
  perPageBtnActive: { background: "#1a1713", color: "#fff" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: "22px", marginBottom: "40px" },
  productCard: { background: "#fff", borderRadius: "16px", overflow: "hidden", transition: "transform 0.25s ease, box-shadow 0.25s ease", cursor: "pointer", display: "flex", flexDirection: "column", height: "100%" },
  imageWrap: { position: "relative", aspectRatio: "1", background: "#f0ece4", overflow: "hidden" },
  cardImg: { width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease, opacity 0.3s ease" },
  imgSkeleton: { position: "absolute", inset: 0 },
  overlay: { position: "absolute", inset: 0, background: "rgba(20,17,12,0.45)", backdropFilter: "blur(2px)", display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.3s ease" },
  viewBtn: { display: "flex", alignItems: "center", gap: "7px", padding: "10px 20px", background: "#fff", color: "#1a1713", border: "none", borderRadius: "50px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "transform 0.3s ease" },
  categoryChip: { position: "absolute", top: "12px", left: "12px", display: "inline-flex", alignItems: "center", gap: "4px", padding: "4px 10px", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(4px)", borderRadius: "50px", fontSize: "0.68rem", fontWeight: 500, color: "#5c5243", letterSpacing: "0.04em", textTransform: "uppercase" },
  cardBody: { padding: "18px 18px 16px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 },
  cardTitle: { fontFamily: "'Fraunces', serif", fontSize: "1.05rem", fontWeight: 500, color: "#1a1713", letterSpacing: "-0.01em", lineHeight: 1.3 },
  cardMeta: { display: "flex", alignItems: "center" },
  skuBadge: { display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.7rem", color: "#9e9789", fontWeight: 400, letterSpacing: "0.05em", fontFamily: "monospace" },
  cardFooter: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "12px", borderTop: "1px solid #f0ece4" },
  price: { fontSize: "1rem", fontWeight: 500, color: "#1a1713", letterSpacing: "-0.01em" },
  cartBtn: { display: "flex", alignItems: "center", gap: "5px", padding: "7px 14px", color: "#fff", border: "none", borderRadius: "50px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 500, cursor: "pointer", transition: "background 0.2s" },
  skeletonCard: { background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" },
  skeletonImg: { height: "220px" },
  skeletonBody: { padding: "18px", display: "flex", flexDirection: "column", gap: "10px" },
  skeletonLine: { height: "12px", borderRadius: "6px" },
  shimmer: { background: "linear-gradient(90deg, #ede9e0 25%, #e0dbd1 50%, #ede9e0 75%)", backgroundSize: "600px 100%", animation: "shimmer 1.4s infinite linear" },
  emptyState: { gridColumn: "1 / -1", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "80px 20px" },
  emptyIcon: { width: "56px", height: "56px", border: "1.5px solid #d9d4c7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" },
  emptyTitle: { fontFamily: "'Fraunces', serif", fontSize: "1.2rem", color: "#5c5243", fontWeight: 500 },
  emptySub: { fontSize: "0.82rem", color: "#9e9789", fontWeight: 300 },
  paginationRow: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" },
  pageInfo: { fontSize: "0.8rem", color: "#9e9789", fontWeight: 300, letterSpacing: "0.03em" },
  pagination: { display: "flex", alignItems: "center", gap: "4px" },
  pageNavBtn: { width: "34px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center", background: "#ede9e0", border: "none", borderRadius: "50%", color: "#1a1713", cursor: "pointer", transition: "background 0.18s" },
  pageNumBtn: { minWidth: "34px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "1.5px solid #d9d4c7", borderRadius: "8px", color: "#5c5243", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 400, cursor: "pointer", transition: "background 0.18s, color 0.18s, border-color 0.18s", padding: "0 8px" },
  pageNumBtnActive: { background: "#1a1713", color: "#fff", borderColor: "#1a1713", fontWeight: 600 },
  pageEllipsis: { width: "28px", textAlign: "center", color: "#9e9789", fontSize: "0.85rem", userSelect: "none" },
};
