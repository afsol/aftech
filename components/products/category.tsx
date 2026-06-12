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

    // ✅ FIX 1: Sync sidebar checkboxes from URL params on mount
    useEffect(() => {
        const catParam = searchParams.get("categories");
        const brandParam = searchParams.get("brands");
        const minPrice = searchParams.get("min_price");
        const maxPrice = searchParams.get("max_price");

        if (catParam) setSelectedCategories(catParam.split(",").map(Number));
        if (brandParam) setSelectedBrands(brandParam.split(",").map(Number));
        if (minPrice && maxPrice) setPrice([Number(minPrice), Number(maxPrice)]);
    }, []);

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

    const applyFilters = () => {
    const params = new URLSearchParams();

    // ✅ Fix: Use the [] notation for multiple values
    if (selectedCategories.length > 0) {
        selectedCategories.forEach(id => params.append("categories[]", id.toString()));
    }

    if (selectedBrands.length > 0) {
        selectedBrands.forEach(id => params.append("brands[]", id.toString()));
    }

    if (price.length === 2) {
        params.set("min_price", price[0].toString());
        params.set("max_price", price[1].toString());
    }

    params.set("page", "1");
    
    router.push(`/products?${params.toString()}`);
};

    // const applyFilters = () => {
    //     const params = new URLSearchParams();
    //     if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","));
    //     if (selectedBrands.length > 0) params.set("brands", selectedBrands.join(","));
    //     if (price.length === 2) {
    //         params.set("min_price", price[0].toString());
    //         params.set("max_price", price[1].toString());
    //     }
    //     params.set("page", "1");
    //     router.push(`/products?${params.toString()}`);
    // };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setPrice(priceRange);
        router.push("/products?page=1");
    };

    useEffect(() => {
        const headers = { 'X-API-KEY': process.env.NEXT_PUBLIC_X_API_KEY };
        Promise.all([
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`, { headers }),
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/brands`, { headers }),
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pricing-products`, { headers }),
        ])
            .then(([categoriesRes, brandsRes, pricingRes]) => {
                setCategories(categoriesRes.data.data);
                setBrands(brandsRes.data.data);
                const { min_price, max_price } = pricingRes.data.data;
                const min = Math.floor(min_price ?? 0);
                const max = Math.ceil(max_price ?? 100);
                setPriceRange([min, max]);
                // Only reset price if not already set from URL params
                if (!searchParams.get("min_price") && !searchParams.get("max_price")) {
                    setPrice([min, max]);
                }
            })
            .catch((err) => console.error("Data fetch error:", err));
    }, []);

    return (
        <div className="w-64 p-4 bg-gray-100 border-r border-gray-200">

            {/* Categories Section */}
            <div className="mb-4">
                <button
                    onClick={() => toggleSection('categories')}
                    className="w-full text-left p-2 bg-blue-100 text-blue-800 rounded-t-md flex justify-between items-center"
                >
                    Categories
                    <svg className={`w-4 h-4 transform transition-transform duration-200 ${isOpen.categories ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isOpen.categories && (
                    <div className="pl-4 pt-2 space-y-2">
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <div key={category.id} className="flex items-center gap-2">
                                    {/* ✅ FIX 2: Was 2 checkboxes (one uncontrolled dummy + one hidden). Now single controlled checkbox */}
                                    <input
                                        type="checkbox"
                                        id={`cat-${category.id}`}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                        checked={selectedCategories.includes(category.id)}
                                        onChange={() => handleCategoryChange(category.id)}
                                    />
                                    <label htmlFor={`cat-${category.id}`} className="text-sm font-medium text-gray-800 cursor-pointer">
                                        {category.title}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">Loading categories...</p>
                        )}
                    </div>
                )}
            </div>

            {/* Brands Section */}
            <div className="mb-4">
                <button
                    onClick={() => toggleSection('brands')}
                    className="w-full text-left p-2 bg-gray-200 text-gray-800 rounded-t-md flex justify-between items-center"
                >
                    Brands
                    <svg className={`w-4 h-4 transform transition-transform duration-200 ${isOpen.brands ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isOpen.brands && (
                    <div className="pl-4 pt-2 space-y-2">
                        {brands.length > 0 ? (
                            brands.map((brand) => (
                                <div key={brand.id} className="flex items-center gap-2">
                                    {/* ✅ FIX 3: Brand checkboxes had NO checked/onChange — completely broken */}
                                    <input
                                        type="checkbox"
                                        id={`brand-${brand.id}`}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                        checked={selectedBrands.includes(brand.id)}
                                        onChange={() => handleBrandChange(brand.id)}
                                    />
                                    <label htmlFor={`brand-${brand.id}`} className="text-sm font-medium text-gray-800 cursor-pointer">
                                        {brand.title}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">Loading brands...</p>
                        )}
                    </div>
                )}
            </div>

            {/* Price Range Section */}
            <div className="mb-4">
                <button
                    onClick={() => toggleSection('priceRange')}
                    className="w-full text-left p-2 bg-gray-200 text-gray-800 rounded-t-md flex justify-between items-center"
                >
                    Price Range
                    <svg className={`w-4 h-4 transform transition-transform duration-200 ${isOpen.priceRange ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isOpen.priceRange && (
                    <div className="pl-4 pt-4">
                        <RangeSlider
                            min={priceRange[0]}
                            max={priceRange[1]}
                            value={price}
                            onInput={(values: number[]) => setPrice(values)}
                            className="w-full"
                        />
                        <div className="flex justify-between mt-2 text-sm text-gray-600">
                            <span>${price[0]}</span>
                            <span>${price[1]}</span>
                        </div>
                    </div>
                )}
            </div>

            <button
                onClick={applyFilters}
                className="w-full text-center p-2 bg-blue-500 text-white rounded-md mb-2 hover:bg-blue-600 transition-colors"
            >
                Apply Filters
            </button>
            <button
                onClick={clearFilters}
                className="w-full text-center p-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
                Clear Filters
            </button>
        </div>
    );
};

export default FilterSidebar;
