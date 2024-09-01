"use client";
import { Fragment, useEffect, useState } from "react";
import Product from "./product/product";
import Navbar from "../../navbar/Navbar";
import Loading from "@/components/Loading";
import { useGetSellerProducts } from "@/hooks/useGetUser";
import AddProduct from "./AddProduct";

export default function Products({ address }: { address: string }) {
  const [products, setProducts] = useState<any>(null);
  const { data, isLoading } = useGetSellerProducts(address);

  useEffect(() => {
    if (data && !data.err && data.data) {
      setProducts(data.data);
    }
  }, [data, data?.data]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Fragment>
      <Navbar />
      <>
        <div className="flex justify-between p-3">
          <h1 className="text-4xl text-center subpixel-antialiased font-bold">
            Your Products
          </h1>
          <div className="justify-self-end">
            <AddProduct address={address} />
          </div>
        </div>
        <div className="flex justify-start border p-3 ">
          <ProductsDataRender products={products} />
        </div>
      </>
    </Fragment>
  );
}

function ProductsDataRender({ products }: any) {
  return (
    <>
      <div className="grid gap-4 justify-center md:justify-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products &&
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
            />
          ))}
      </div>
    </>
  );
}
