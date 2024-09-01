"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import PopoverButton from "./popoverbtn";

export default function Product(props: {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  stock: string;
  id: string;
  label: string;
}) {
  const [productData, setProductData] = useState(props);

  const updateProductData = (newData: Partial<typeof props>) => {
    setProductData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <Card className="w-[250px] h-fit">
      <CardHeader>
        <CardTitle>{productData.title}</CardTitle>
        <CardDescription>{productData.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={productData.imageUrl} alt={productData.name} />
        <CardDescription>{productData.label}</CardDescription>
        <CardDescription>{productData.description}</CardDescription>
        <p>Price: {productData.price}</p>
        <p>In Stock: {productData.stock}</p>
        <PopoverButton
          productData={productData}
          updateProductData={updateProductData}
        />
      </CardContent>
    </Card>
  );
}
