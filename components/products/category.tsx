"use client"
import { useEffect, useState } from "react"
import axios from "@/utils/axios"
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useRouter, useSearchParams } from "next/navigation";

type CategoryType = {
    id: number;
    title: string;
};
type BrandType = {
    id: number;
    title: string;
}

const FilterSidebar = () => {
    const [isOpen, setIsOpen] = useState({
        categories: true,
        brands: false,
        priceRange: false,
    });

    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [brands, setBrands] = useState<BrandType[]>([]);
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [price, setPrice] = useState([0, 100]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<number[]>([]);

    const router = useRouter();
    const searchParams = useSearchParams();

    const toggleSection = (section: keyof typeof isOpen) => {
        setIsOpen((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    // ✅ FIX 1: Correctly parse comma-separated arrays on mount / search change
    useEffect(() => {
        const catParam = searchParams.get("categories");
        const brandParam = searchParams.get("brands");
        const minPrice = searchParams.get("min_price");
        const maxPrice = searchParams.get("max_price");

        if (catParam) {
            setSelectedCategories(catParam.split(",").map(Number).filter(Boolean));
        } else {
            setSelectedCategories([]);
        }

        if (brandParam) {
            setSelectedBrands(brandParam.split(",").map(Number).filter(Boolean));
        } else {
            setSelectedBrands([]);
        }

        if (minPrice && maxPrice) {
            setPrice([Number(minPrice), Number(maxPrice)]);
        }
    }, [searchParams]);

    const handleCategoryChange = (id: number) => {
        setSelectedCategories((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleBrandChange = (id: number) => {
        setSelectedBrands((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    // ✅ FIX 2: Build the URL params with comma-separated values (, notation)
    const applyFilters = () => {
        const params = new URLSearchParams();

        // Preserve keyword searches if a search box exists in your header layout
        const activeSearch = searchParams.get("search");
        if (activeSearch) params.set("search", activeSearch);

        if (selectedCategories.length > 0) {
            params.set("categories", selectedCategories.join(","));
        }

        if (selectedBrands.length > 0) {
            params.set("brands", selectedBrands.join(","));
        }

        if (price.length === 2) {
            params.set("min_price", price[0].toString());
            params.set("max_price", price[1].toString());
        }

        params.set("page", "1");
        
        router.push(`/products?${params.toString()}`);
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setPrice(priceRange);
        
        // Retain text query parameters during full dashboard resets
        const params = new URLSearchParams();
        const activeSearch = searchParams.get("search");
        if (activeSearch) params.set("search", activeSearch);
        params.set("page", "1");

        router.push(`/products?${params.toString()}`);
    };

    // Initial fetch metrics logic execution
    useEffect(() => {
        const headers = { 'X-API-KEY': process.env.NEXT_PUBLIC_X_API_KEY };
        Promise.all([
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`, { headers }),
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/brands`, { headers }),
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pricing-products`, { headers }),
        ])
            .then(([categoriesRes, brandsRes, pricingRes]) => {
                setCategories(categoriesRes.data.data || []);
                setBrands(brandsRes.data.data || []);
                
                const { min_price, max_price } = pricingRes.data.data || {};
                const min = Math.floor(min_price ?? 0);
                const max = Math.ceil(max_price ?? 100);
                setPriceRange([min, max]);
                
                if (!searchParams.get("min_price") && !searchParams.get("max_price")) {
                    setPrice([min, max]);
                }
            })
            .catch((err) => console.error("Sidebar data initialization breakdown:", err));
    }, []);

    return (
        <div className="w-full space-y-4">

            {/* Categories Section */}
            <div className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-xs">
                <button
                    type="button"
                    onClick={() => toggleSection('categories')}
                    className="w-full text-left p-3 bg-slate-50 text-slate-700 font-semibold text-sm flex justify-between items-center hover:bg-slate-100/70 transition-colors"
                >
                    <span>Categories</span>
                    <svg className={`w-4 h-4 transform transition-transform duration-200 text-slate-400 ${isOpen.categories ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isOpen.categories && (
                    <div className="p-3 space-y-2.5 max-h-48 overflow-y-auto custom-scrollbar">
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <div key={category.id} className="flex items-center gap-2.5">
                                    <input
                                        type="checkbox"
                                        id={`cat-${category.id}`}
                                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer accent-blue-600"
                                        checked={selectedCategories.includes(category.id)}
                                        onChange={() => handleCategoryChange(category.id)}
                                    />
                                    <label htmlFor={`cat-${category.id}`} className="text-xs font-medium text-slate-600 cursor-pointer select-none">
                                        {category.title}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-slate-400 italic">Loading categories...</p>
                        )}
                    </div>
                )}
            </div>

            {/* Brands Section */}
            <div className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-xs">
                <button
                    type="button"
                    onClick={() => toggleSection('brands')}
                    className="w-full text-left p-3 bg-slate-50 text-slate-700 font-semibold text-sm flex justify-between items-center hover:bg-slate-100/70 transition-colors"
                >
                    <span>Brands</span>
                    <svg className={`w-4 h-4 transform transition-transform duration-200 text-slate-400 ${isOpen.brands ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isOpen.brands && (
                    <div className="p-3 space-y-2.5 max-h-48 overflow-y-auto custom-scrollbar">
                        {brands.length > 0 ? (
                            brands.map((brand) => (
                                <div key={brand.id} className="flex items-center gap-2.5">
                                    <input
                                        type="checkbox"
                                        id={`brand-${brand.id}`}
                                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer accent-blue-600"
                                        checked={selectedBrands.includes(brand.id)}
                                        onChange={() => handleBrandChange(brand.id)}
                                    />
                                    <label htmlFor={`brand-${brand.id}`} className="text-xs font-medium text-slate-600 cursor-pointer select-none">
                                        {brand.title}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-slate-400 italic">Loading brands...</p>
                        )}
                    </div>
                )}
            </div>

            {/* Price Range Section */}
            <div className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-xs">
                <button
                    type="button"
                    onClick={() => toggleSection('priceRange')}
                    className="w-full text-left p-3 bg-slate-50 text-slate-700 font-semibold text-sm flex justify-between items-center hover:bg-slate-100/70 transition-colors"
                >
                    <span>Price Range</span>
                    <svg className={`w-4 h-4 transform transition-transform duration-200 text-slate-400 ${isOpen.priceRange ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isOpen.priceRange && (
                    <div className="p-4 bg-white">
                        <RangeSlider
                            min={priceRange[0]}
                            max={priceRange[1]}
                            value={price}
                            onInput={(values: number[]) => setPrice(values)}
                            className="w-full unique-range-slider"
                        />
                        <div className="flex justify-between mt-3 text-xs font-mono text-slate-500 bg-slate-50 p-1.5 rounded-md border border-slate-100">
                            <span>Min: PKR {price[0].toLocaleString()}</span>
                            <span>Max: PKR {price[1].toLocaleString()}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Action Matrix Buttons */}
            <div className="pt-2 space-y-2">
                <button
                    type="button"
                    onClick={applyFilters}
                    className="w-full text-center py-2 px-4 bg-blue-600 text-white font-medium text-xs rounded-xl shadow-xs hover:bg-blue-700 transition-colors duration-150"
                >
                    Apply Filters
                </button>
                <button
                    type="button"
                    onClick={clearFilters}
                    className="w-full text-center py-2 px-4 bg-slate-200 text-slate-600 font-medium text-xs rounded-xl hover:bg-slate-300 transition-colors duration-150"
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
};

export default FilterSidebar;