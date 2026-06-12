"use client";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import * as LucideIcons from "lucide-react"; // Dynamically imports your exact icons like PhoneOutgoing, EthernetPort, etc.

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
          // Destructure safely through Laravel's pagination layer wrapper (.data.data)
          const payload = res.data.data;
          const itemsArray = Array.isArray(payload) ? payload : payload.data;
          
          setCategories(itemsArray || []);
        }
      })
      .catch((err) => console.error("Error pulling database featured categories:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="border border-slate-100 rounded-2xl p-6 text-center space-y-4 bg-white">
            <div className="rounded-full bg-slate-200 w-16 h-16 mx-auto" />
            <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (categories.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {categories.map((category) => {
        // ─── DYNAMIC ICON COMPILER ───
        // Safely resolves database values like "PhoneOutgoing", "EthernetPort", "Fingerprint"
        const rawIcon = category.icon_name || "Layers";
        const iconName = rawIcon.charAt(0).toUpperCase() + rawIcon.slice(1);
        const IconComponent = LucideIcons[iconName] || LucideIcons.Layers;

        // ─── DYNAMIC COLOR RESOLVER ───
        // Validates if color is a standard color string or a custom hex code
        const rawColor = category.color_code || "#3b82f6";
        const isHex = rawColor.startsWith("#");
        
        // Inline style configuration for custom Hex values; falls back to raw class string otherwise
        const inlineStyle = isHex ? { backgroundColor: rawColor } : {};
        const bgClassName = !isHex ? `bg-${rawColor}-500` : "";

        return (
          <Card 
            key={category.id} 
            onClick={() => router.push(`/products?category_id=${category.id}`)}
            className="text-center hover:shadow-lg hover:border-slate-200 transition-all duration-300 cursor-pointer group rounded-2xl border border-slate-100/80 bg-white"
          >
            <CardContent className="p-6">
              <div
                style={inlineStyle}
                className={`${bgClassName} p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}
              >
                <IconComponent className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-slate-800 line-clamp-2 capitalize text-sm tracking-tight px-1">
                {category.title ? category.title.toLowerCase() : ""}
              </h3>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}