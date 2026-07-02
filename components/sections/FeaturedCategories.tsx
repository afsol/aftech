"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "@/utils/axios";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const FALLBACK_IMAGE =
  "https://admin.aftechnologies.pk/assets/adminassests/images/image-not-found.webp";

// ─── SUB-COMPONENT: INDIVIDUAL CATEGORY CARD ──────────────────────────────────
function CategoryCard({ category, onClick }) {
  let initialSrc = category.image_url || FALLBACK_IMAGE;
  if (initialSrc.includes("https://aftechnologies.pk/storage")) {
    initialSrc = initialSrc.replace(
      "https://aftechnologies.pk/storage",
      "https://admin.aftechnologies.pk/storage",
    );
  }

  const [imgSrc, setImgSrc] = useState(initialSrc);

  const rawColor = category.color_code || "#2196F3";
  const isHex = rawColor.startsWith("#");

  const inlineStyle = isHex
    ? { backgroundColor: `${rawColor}15`, borderColor: `${rawColor}30` }
    : {};
  const bgClassName = !isHex
    ? `bg-${rawColor}-50/50 border-${rawColor}-100`
    : "";

  return (
    // 💡 Added shrink-0 and specific column sizing logic for the slider engine
    <Card
      onClick={onClick}
      className="text-center hover:shadow-lg hover:border-slate-200 transition-all duration-300 cursor-pointer group rounded-2xl border border-slate-100/80 bg-white overflow-hidden w-[calc(50vw-24px)] md:w-[calc(33.33vw-24px)] lg:w-[calc(20vw-24px)] shrink-0 mx-3"
    >
      <CardContent className="p-6 flex flex-col items-center justify-center">
        <div
          style={inlineStyle}
          className={`${bgClassName} relative aspect-square w-24 h-24 mb-4 rounded-full border p-3 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 duration-300`}
        >
          <Image
            src={imgSrc}
            alt={category.title || "Category"}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            className="object-contain p-1"
            onError={() => {
              if (imgSrc !== FALLBACK_IMAGE) {
                setImgSrc(FALLBACK_IMAGE);
              }
            }}
          />
        </div>

        <h3 className="font-bold text-slate-800 line-clamp-2 capitalize text-sm tracking-tight px-1 group-hover:text-blue-600 transition-colors w-full">
          {category.title ? category.title.toLowerCase() : ""}
        </h3>
      </CardContent>
    </Card>
  );
}

// ─── MAIN COMPONENT: AUTOMATIC INFINITE SLIDER ─────────────────────────────────
export default function FeaturedCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/feature-categories`, {
        headers: { "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY },
      })
      .then((res) => {
        if (res.data && res.data.success) {
          const payload = res.data.data;
          const itemsArray = Array.isArray(payload) ? payload : payload.data;

          setCategories(itemsArray || []);
        }
      })
      .catch((err) =>
        console.error("Error pulling database featured categories:", err),
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="border border-slate-100 rounded-2xl p-6 text-center space-y-4 bg-white"
          >
            <div className="rounded-full bg-slate-200 w-24 h-24 mx-auto" />
            <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (categories.length === 0) return null;

  // 💡 Duplicate array tracking to create a seamless looping seamless layout matrix
  const duplicatedCategories = [...categories, ...categories, ...categories];

  return (
    <div className="w-full overflow-hidden relative py-4 mask-gradient">
      {/* Inject custom infinite scroll CSS values right into Tailwind container space */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.3333%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 25s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused; /* Halts scrolling animation cleanly on mouse hover */
          }
          .mask-gradient {
            /* Smoothly fades out slider left and right edges */
            mask-image: linear-gradient(to right, transparent, white 10%, white 90%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, white 10%, white 90%, transparent);
          }
        `}
      </style>

      <div className="animate-marquee">
        {duplicatedCategories.map((category, index) => (
          <CategoryCard
            key={`${category.id}-${index}`}
            category={category}
            onClick={() => router.push(`/products?categories=${category.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
