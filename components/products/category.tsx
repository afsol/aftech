"use client";
import { useEffect, useState, useRef } from "react";
import axios from "@/utils/axios";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useRouter, useSearchParams } from "next/navigation";

type CategoryType = {
  id: number;
  title: string;
};
type BrandType = {
  id: number;
  title: string;
};

const FilterSidebar = () => {
  const [isOpen, setIsOpen] = useState({
    categories: true,
    brands: true,
    priceRange: true,
  });

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [brands, setBrands] = useState<BrandType[]>([]);

  // Dynamic sliding absolute min/max limits based on structural filters
  const [priceRange, setPriceRange] = useState([0, 100000]);
  // The active sliding state chosen by the user
  const [price, setPrice] = useState([0, 100000]);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleSection = (section: keyof typeof isOpen) => {
    setIsOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // 1. Sync React States with URL state transitions on Initial Load or Browser Navigation
  useEffect(() => {
    const catParam = searchParams.get("categories");
    const brandParam = searchParams.get("brands");
    // const minPrice = searchParams.get("min_price");
    // const maxPrice = searchParams.get("max_price");

    const parsedCats = catParam
      ? catParam.split(",").map(Number).filter(Boolean)
      : [];
    const parsedBrands = brandParam
      ? brandParam.split(",").map(Number).filter(Boolean)
      : [];

    setSelectedCategories(parsedCats);
    setSelectedBrands(parsedBrands);

    // if (minPrice && maxPrice) {
    //   setPrice([Number(minPrice), Number(maxPrice)]);
    // }
  }, [searchParams]);

  // 2. FETCH ENGINE: Dynamically adjust tracks based on local selection matrix before submission
//   useEffect(() => {
//     const headers = { 'X-API-KEY': process.env.NEXT_PUBLIC_X_API_KEY };
    
//     const queryParams = new URLSearchParams();
//     // Use local array states here so track limits respond instantly to local clicks
//     if (selectedCategories.length > 0) queryParams.set("categories", selectedCategories.join(","));
//     if (selectedBrands.length > 0) queryParams.set("brands", selectedBrands.join(","));

//     axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pricing-products?${queryParams.toString()}`, { headers })
//         .then((pricingRes) => {
//             const { min_price, max_price } = pricingRes.data.data || {};
            
//             const dynamicMin = 0; 
//             const dynamicMax = max_price && Number(max_price) > 0 ? Math.ceil(Number(max_price)) : 100000;

//             // Lock the layout structure 
//             setPriceRange([dynamicMin, dynamicMax]);

//             const urlMin = searchParams.get("min_price");
//             const urlMax = searchParams.get("max_price");

//             // Only snap handle states if a direct filter configuration isn't currently requested inside the URL bar
//             if (urlMin && urlMax) {
//                 setPrice([Number(urlMin), Number(urlMax)]);
//             } else {
//                 setPrice([0, dynamicMax]);
//             }
//         })
//         .catch((err) => console.error("Error retrieving responsive boundaries:", err));

//   }, [selectedCategories, selectedBrands]); // Removed searchParams to isolate local choice generation

  // 3. Initial Static Metadata Structural Mount
  useEffect(() => {
    const headers = { "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY };
    Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`, { headers }),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/brands`, { headers }),
    ])
      .then(([categoriesRes, brandsRes]) => {
        setCategories(categoriesRes.data.data || []);
        setBrands(brandsRes.data.data || []);
      })
      .catch((err) => console.error("Sidebar structure failure:", err));
  }, []);

  const handleCategoryChange = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // FIXED: Removed router.push() auto-redirect from here. Local checkbox changes state only.
  const handleBrandChange = (id: number) => {
    setSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // FIXED: Now aggregates ALL values (categories, brands, prices) and applies them together here
  const applyFilters = () => {
    const params = new URLSearchParams();
    const activeSearch = searchParams.get("search");

    if (activeSearch) params.set("search", activeSearch);
    if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","));
    if (selectedBrands.length > 0) params.set("brands", selectedBrands.join(","));

    // Appends active tracking slider boundaries directly to execution parameters
    // if (price.length === 2) {
    //   params.set("min_price", price[0].toString());
    //   params.set("max_price", price[1].toString());
    // }

    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPrice([0, 100000]);

    const params = new URLSearchParams();
    const activeSearch = searchParams.get("search");
    if (activeSearch) params.set("search", activeSearch);
    params.set("page", "1");

    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="w-full space-y-4">
      {/* Categories Section */}
      <div className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm">
        <button
          type="button"
          onClick={() => toggleSection("categories")}
          className="w-full text-left p-3 bg-slate-50 text-slate-700 font-semibold text-sm flex justify-between items-center hover:bg-slate-100/70 transition-colors"
        >
          <span>Categories</span>
          <svg
            className={`w-4 h-4 transform transition-transform duration-200 text-slate-400 ${isOpen.categories ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen.categories && (
          <div className="p-3 space-y-2.5 max-h-48 overflow-y-auto custom-scrollbar">
            {categories.map((category) => (
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
            ))}
          </div>
        )}
      </div>

      {/* Brands Section */}
      <div className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm">
        <button
          type="button"
          onClick={() => toggleSection("brands")}
          className="w-full text-left p-3 bg-slate-50 text-slate-700 font-semibold text-sm flex justify-between items-center hover:bg-slate-100/70 transition-colors"
        >
          <span>Brands</span>
          <svg
            className={`w-4 h-4 transform transition-transform duration-200 text-slate-400 ${isOpen.brands ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen.brands && (
          <div className="p-3 space-y-2.5 max-h-48 overflow-y-auto custom-scrollbar">
            {brands.map((brand) => (
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
            ))}
          </div>
        )}
      </div>

      {/* UNCOMMENTED: Price Range Slider Interface Section */}
      {/* <div className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm">
        <button
          type="button"
          onClick={() => toggleSection("priceRange")}
          className="w-full text-left p-3 bg-slate-50 text-slate-700 font-semibold text-sm flex justify-between items-center hover:bg-slate-100/70 transition-colors"
        >
          <span>Price Range</span>
          <svg
            className={`w-4 h-4 transform transition-transform duration-200 text-slate-400 ${isOpen.priceRange ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
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
      </div> */}

      {/* Action Matrix Buttons */}
      <div className="pt-2 space-y-2">
        <button
          type="button"
          onClick={applyFilters}
          className="w-full text-center py-2 px-4 bg-blue-600 text-white font-medium text-xs rounded-xl shadow-sm hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={clearFilters}
          className="w-full text-center py-2 px-4 bg-slate-200 text-slate-600 font-medium text-xs rounded-xl hover:bg-slate-300 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;





















// "use client";
// import { useEffect, useState, useRef } from "react";
// import axios from "@/utils/axios";
// import RangeSlider from "react-range-slider-input";
// import "react-range-slider-input/dist/style.css";
// import { useRouter, useSearchParams } from "next/navigation";

// type CategoryType = {
//   id: number;
//   title: string;
// };
// type BrandType = {
//   id: number;
//   title: string;
// };

// const FilterSidebar = () => {
//   const [isOpen, setIsOpen] = useState({
//     categories: true,
//     brands: true,
//     priceRange: true,
//   });

//   const [categories, setCategories] = useState<CategoryType[]>([]);
//   const [brands, setBrands] = useState<BrandType[]>([]);

//   // Dynamic sliding absolute min/max limits based on structural filters
//   const [priceRange, setPriceRange] = useState([0, 100000]);
//   // The active sliding state chosen by the user
//   const [price, setPrice] = useState([0, 100000]);

//   const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
//   const [selectedBrands, setSelectedBrands] = useState<number[]>([]);

//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Use a ref to block fetching dynamic pricing during initialization resets
//   const isInitialMount = useRef(true);

//   const toggleSection = (section: keyof typeof isOpen) => {
//     setIsOpen((prev) => ({ ...prev, [section]: !prev[section] }));
//   };

//   // 1. Sync React States with URL state transitions
//   useEffect(() => {
//     const catParam = searchParams.get("categories");
//     const brandParam = searchParams.get("brands");
//     const minPrice = searchParams.get("min_price");
//     const maxPrice = searchParams.get("max_price");

//     const parsedCats = catParam
//       ? catParam.split(",").map(Number).filter(Boolean)
//       : [];
//     const parsedBrands = brandParam
//       ? brandParam.split(",").map(Number).filter(Boolean)
//       : [];

//     setSelectedCategories(parsedCats);
//     setSelectedBrands(parsedBrands);

//     if (minPrice && maxPrice) {
//       setPrice([Number(minPrice), Number(maxPrice)]);
//     }
//   }, [searchParams]);

//   // 2. FETCH ENGINE: Dynamically adjust min/max sliders when parameters change
//   useEffect(() => {
//     const headers = { 'X-API-KEY': process.env.NEXT_PUBLIC_X_API_KEY };
    
//     const queryParams = new URLSearchParams();
//     if (selectedCategories.length > 0) queryParams.set("categories", selectedCategories.join(","));
//     if (selectedBrands.length > 0) queryParams.set("brands", selectedBrands.join(","));

//     // axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pricing-products?${queryParams.toString()}`, { headers })
//     //     .then((pricingRes) => {
//     //         // const { min_price, max_price } = pricingRes.data.data || {};
            
//     //         // const dynamicMin = 0; 
//     //         // // Calculate a clean numeric upper bound ceiling based on database response
//     //         // const dynamicMax = max_price && Number(max_price) > 0 ? Math.ceil(Number(max_price)) : 100000;

//     //         // // 1. Lock the absolute physical tracks of the slider component
//     //         // setPriceRange([dynamicMin, dynamicMax]);

//     //         // const urlMin = searchParams.get("min_price");
//     //         // const urlMax = searchParams.get("max_price");

//     //         // // 2. Set user selection handles position strictly based on existing active constraints
//     //         // if (urlMin && urlMax) {
//     //         //     setPrice([Number(urlMin), Number(urlMax)]);
//     //         // } else {
//     //         //     // If the user has not manually set a price filter yet, default handles to maximum limits
//     //         //     setPrice([0, dynamicMax]);
//     //         // }
//     //     })
//     //     .catch((err) => console.error("Error retrieving responsive boundaries:", err));

// }, [selectedCategories, selectedBrands, searchParams]);
//   // useEffect(() => {
//   //     const headers = { 'X-API-KEY': process.env.NEXT_PUBLIC_X_API_KEY };

//   //     // Build conditions to look up contextual boundaries
//   //     const queryParams = new URLSearchParams();
//   //     if (selectedCategories.length > 0) queryParams.set("categories", selectedCategories.join(","));
//   //     if (selectedBrands.length > 0) queryParams.set("brands", selectedBrands.join(","));

//   //     axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pricing?${queryParams.toString()}`, { headers })
//   //         .then((pricingRes) => {
//   //             const { min_price, max_price } = pricingRes.data.data || {};
//   //             const dynamicMin = Math.floor(min_price ?? 0);
//   //             const dynamicMax = Math.ceil(max_price ?? 100000);

//   //             setPriceRange([dynamicMin, dynamicMax]);

//   //             const urlMin = searchParams.get("min_price");
//   //             const urlMax = searchParams.get("max_price");

//   //             // ONLY change the active slider handle positions if the user isn't currently filtering by price
//   //             if (urlMin && urlMax) {
//   //                 setPrice([Number(urlMin), Number(urlMax)]);
//   //             } else {
//   //                 setPrice([dynamicMin, dynamicMax]);
//   //             }
//   //         });

//   //     axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pricing-products?${queryParams.toString()}`, { headers })
//   //         .then((pricingRes) => {
//   //             const { min_price, max_price } = pricingRes.data.data || {};
//   //             const dynamicMin = Math.floor(min_price ?? 0);
//   //             const dynamicMax = Math.ceil(max_price ?? 100000);

//   //             // Update sliding tracks
//   //             setPriceRange([dynamicMin, dynamicMax]);

//   //             // Set user values contextually
//   //             const urlMin = searchParams.get("min_price");
//   //             const urlMax = searchParams.get("max_price");

//   //             if (urlMin && urlMax) {
//   //                 setPrice([Number(urlMin), Number(urlMax)]);
//   //             } else {
//   //                 // Fall back to widest options if no active target range is specified
//   //                 setPrice([dynamicMin, dynamicMax]);
//   //             }
//   //         })
//   //         .catch((err) => console.error("Error retrieving responsive boundaries:", err));

//   // }, [selectedCategories, selectedBrands, searchParams]);

//   // 3. Initial Static Metadata Structural Mount
//   useEffect(() => {
//     const headers = { "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY };
//     Promise.all([
//       axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`, { headers }),
//       axios.get(`${process.env.NEXT_PUBLIC_API_URL}/brands`, { headers }),
//     ])
//       .then(([categoriesRes, brandsRes]) => {
//         setCategories(categoriesRes.data.data || []);
//         setBrands(brandsRes.data.data || []);
//       })
//       .catch((err) => console.error("Sidebar structure failure:", err));
//   }, []);

//   const handleCategoryChange = (id: number) => {
//     setSelectedCategories((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
//     );
//   };

//   const handleBrandChange = (id: number) => {
//     const updatedBrands = selectedBrands.includes(id)
//       ? selectedBrands.filter((item) => item !== id)
//       : [...selectedBrands, id];

//     setSelectedBrands(updatedBrands);

//     // Auto-update URL params immediately
//     const params = new URLSearchParams(window.location.search);
//     if (updatedBrands.length > 0) {
//       params.set("brands", updatedBrands.join(","));
//     } else {
//       params.delete("brands");
//     }
//     params.set("page", "1");
//     router.push(`/products?${params.toString()}`);
//   };

//   const applyFilters = () => {
//     const params = new URLSearchParams();
//     const activeSearch = searchParams.get("search");

//     if (activeSearch) params.set("search", activeSearch);
//     if (selectedCategories.length > 0)
//       params.set("categories", selectedCategories.join(","));
//     if (selectedBrands.length > 0)
//       params.set("brands", selectedBrands.join(","));

//     // if (price.length === 2) {
//     //   params.set("min_price", price[0].toString());
//     //   params.set("max_price", price[1].toString());
//     // }

//     params.set("page", "1");
//     router.push(`/products?${params.toString()}`);
//   };

//   const clearFilters = () => {
//     setSelectedCategories([]);
//     setSelectedBrands([]);

//     const params = new URLSearchParams();
//     const activeSearch = searchParams.get("search");
//     if (activeSearch) params.set("search", activeSearch);
//     params.set("page", "1");

//     router.push(`/products?${params.toString()}`);
//   };

//   return (
//     <div className="w-full space-y-4">
//       {/* Categories Section */}
//       <div className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm">
//         <button
//           type="button"
//           onClick={() => toggleSection("categories")}
//           className="w-full text-left p-3 bg-slate-50 text-slate-700 font-semibold text-sm flex justify-between items-center hover:bg-slate-100/70 transition-colors"
//         >
//           <span>Categories</span>
//           <svg
//             className={`w-4 h-4 transform transition-transform duration-200 text-slate-400 ${isOpen.categories ? "rotate-180" : ""}`}
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M19 9l-7 7-7-7"
//             />
//           </svg>
//         </button>
//         {isOpen.categories && (
//           <div className="p-3 space-y-2.5 max-h-48 overflow-y-auto custom-scrollbar">
//             {categories.map((category) => (
//               <div key={category.id} className="flex items-center gap-2.5">
//                 <input
//                   type="checkbox"
//                   id={`cat-${category.id}`}
//                   className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer accent-blue-600"
//                   checked={selectedCategories.includes(category.id)}
//                   onChange={() => handleCategoryChange(category.id)}
//                 />
//                 <label
//                   htmlFor={`cat-${category.id}`}
//                   className="text-xs font-medium text-slate-600 cursor-pointer select-none"
//                 >
//                   {category.title}
//                 </label>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Brands Section */}
//       <div className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm">
//         <button
//           type="button"
//           onClick={() => toggleSection("brands")}
//           className="w-full text-left p-3 bg-slate-50 text-slate-700 font-semibold text-sm flex justify-between items-center hover:bg-slate-100/70 transition-colors"
//         >
//           <span>Brands</span>
//           <svg
//             className={`w-4 h-4 transform transition-transform duration-200 text-slate-400 ${isOpen.brands ? "rotate-180" : ""}`}
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M19 9l-7 7-7-7"
//             />
//           </svg>
//         </button>
//         {isOpen.brands && (
//           <div className="p-3 space-y-2.5 max-h-48 overflow-y-auto custom-scrollbar">
//             {brands.map((brand) => (
//               <div key={brand.id} className="flex items-center gap-2.5">
//                 <input
//                   type="checkbox"
//                   id={`brand-${brand.id}`}
//                   className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer accent-blue-600"
//                   checked={selectedBrands.includes(brand.id)}
//                   onChange={() => handleBrandChange(brand.id)}
//                 />
//                 <label
//                   htmlFor={`brand-${brand.id}`}
//                   className="text-xs font-medium text-slate-600 cursor-pointer select-none"
//                 >
//                   {brand.title}
//                 </label>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Price Range Section */}
//       {/* <div className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm">
//         <button
//           type="button"
//           onClick={() => toggleSection("priceRange")}
//           className="w-full text-left p-3 bg-slate-50 text-slate-700 font-semibold text-sm flex justify-between items-center hover:bg-slate-100/70 transition-colors"
//         >
//           <span>Price Range</span>
//           <svg
//             className={`w-4 h-4 transform transition-transform duration-200 text-slate-400 ${isOpen.priceRange ? "rotate-180" : ""}`}
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M19 9l-7 7-7-7"
//             />
//           </svg>
//         </button>
//         {isOpen.priceRange && (
//           <div className="p-4 bg-white">
//             <RangeSlider
//               min={priceRange[0]}
//               max={priceRange[1]}
//               value={price}
//               onInput={(values: number[]) => setPrice(values)}
//               className="w-full unique-range-slider"
//             />
//             <div className="flex justify-between mt-3 text-xs font-mono text-slate-500 bg-slate-50 p-1.5 rounded-md border border-slate-100">
//               <span>Min: PKR {price[0].toLocaleString()}</span>
//               <span>Max: PKR {price[1].toLocaleString()}</span>
//             </div>
//           </div>
//         )} 
//       </div>*/}

//       {/* Action Matrix Buttons */}
//       <div className="pt-2 space-y-2">
//         <button
//           type="button"
//           onClick={applyFilters}
//           className="w-full text-center py-2 px-4 bg-blue-600 text-white font-medium text-xs rounded-xl shadow-sm hover:bg-blue-700 transition-colors"
//         >
//           Apply Filters
//         </button>
//         <button
//           type="button"
//           onClick={clearFilters}
//           className="w-full text-center py-2 px-4 bg-slate-200 text-slate-600 font-medium text-xs rounded-xl hover:bg-slate-300 transition-colors"
//         >
//           Clear Filters
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;
