
"use client";
import { useState } from "react";
import Header from "@/components/layout/header";
import ProductsGrid from "@/components/products/products-grid";
import Category from "@/components/products/category";
import { Button } from "@/components/ui/button";
import { Grid3X3, List, SlidersHorizontal, X } from "lucide-react";

export default function ProductPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Row Bar Layout */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">Product Portfolio</h1>
              <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">Enterprise Hardware Catalog</p>
            </div>

            {/* Toolbar Buttons Controls Matrix */}
            <div className="flex items-center justify-between sm:justify-end gap-3">
              {/* Mobile Sidebar Hamburger Filter Button Trigger */}
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden flex items-center gap-2 text-slate-600 bg-white"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </Button>

              {/* Grid / List View Toggle Switch */}
              <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-100/80">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`h-8 w-9 p-0 rounded-md transition-all ${viewMode === "grid" ? "bg-white shadow-sm font-semibold text-slate-900" : "text-slate-500"}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`h-8 w-9 p-0 rounded-md transition-all ${viewMode === "list" ? "bg-white shadow-sm font-semibold text-slate-900" : "text-slate-500"}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Layout Columns Configuration */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Desktop Left Component Sidebar Wrapper (25% Column Hidden on Viewports lower than 1024px Layout Widths) */}
            <aside className="hidden lg:block w-full lg:w-1/4 sticky top-24 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <Category />
            </aside>

            {/* Mobile Responsive Slider Panel Overlay Backdrop Canvas Drawer */}
            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-50 lg:hidden flex">
                <div 
                  className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
                  onClick={() => setMobileFiltersOpen(false)}
                />
                <div className="relative w-full max-w-xs bg-white h-full p-6 flex flex-col overflow-y-auto animate-in slide-in-from-left duration-200 shadow-2xl z-10">
                  <div className="flex items-center justify-between mb-6 pb-2 border-b">
                    <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4 text-slate-500" /> Filter Criteria
                    </h2>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setMobileFiltersOpen(false)}>
                      <X className="h-4 w-4 text-slate-500" />
                    </Button>
                  </div>
                  <Category />
                </div>
              </div>
            )}

            {/* Right Side Main Interactive Catalog Display Area (75% Responsive Content Window Container) */}
            <main className="w-full lg:w-3/4">
              <ProductsGrid viewMode={viewMode} />
            </main>
          </div>

        </div>
      </div>
    </>
  );
}

