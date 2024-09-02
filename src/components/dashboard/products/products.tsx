"use client";
import { Fragment, useEffect, useState } from "react";
import Product, { AddNewProduct } from "./product/product";
import Navbar from "../../navbar/Navbar";
import Loading from "@/components/Loading";
import { useGetSellerProducts } from "@/hooks/useGetUser";

export interface ProductsType {
  id: string;
  name: string;
  title: string;
  description: string;
  label: string;
  imageUrl: string;
  price: string;
  stock: string;
  sellerId: string;
}

export type SetProductsType = React.Dispatch<
  React.SetStateAction<ProductsType[]>
>;

export default function Products({ address }: { address: string }) {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const { data, isLoading } = useGetSellerProducts(address);

  useEffect(() => {
    console.log(address);
    if (data && !data.err && data.data) {
      setProducts(data.data);
    }
  }, [data, data?.data]);

  if (isLoading) {
    return <Loading />;
  }

  console.log(products);
  return (
    <Fragment>
      <Navbar />
      <>
        <div className="grid grid-cols-3 justify-center m-5">
          <div> </div>
          <h1 className="text-4xl text-center subpixel-antialiased font-bold">
            Your Products
          </h1>
          <div className="justify-self-end"></div>
        </div>
        <div className="flex justify-center m-4">
          <ProductsDataRender products={products} setProducts={setProducts} />
        </div>
      </>
      )
    </Fragment>
  );
}

function ProductsDataRender({
  products,
  setProducts,
}: {
  products: ProductsType[];
  setProducts: SetProductsType;
}) {
  return (
    <>
      <div className="grid gap-4 justify-center md:justify-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products ? (
          products.map((product: any) => (
            <Product
              key={product.id}
              title={product.title}
              description={product.description}
              imageUrl={product.imageUrl}
              price={product.price}
              stock={product.stock}
              name={product.name}
              id={product.id}
              label={product.label}
              setProducts={setProducts}
            />
          ))
        ) : (
          <div className="text-2xl text-center">No Products Found</div>
        )}
        <AddNewProduct setProducts={setProducts} />
      </div>
    </>
  );
}
