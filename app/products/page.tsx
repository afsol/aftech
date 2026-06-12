import Header from "@/components/layout/header";
import ProductsGrid from "@/components/products/products-grid";
import Category from "@/components/products/category";
export default function ProductPage() {
  
  return (
    <>
      <Header />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Product List</h1>
        <div className="flex justify-between ">

        <div className="w-[25%]">
          <Category />
        </div>
        <div className="w-[75%]">
          <ProductsGrid />         
        </div>
        </div>
      </div>
    </>
  );

}

