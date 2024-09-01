"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { Fragment, useState } from "react";
import PopoverButton from "./popoverbtn";
import { Plus } from "lucide-react";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import ProductForm from "./product-form";

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
    <Card className="w-[250px] h-[530px]">
      <CardHeader className="h-[120px]">
        <CardTitle>{productData.title}</CardTitle>
        <CardDescription>{productData.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <img src={productData.imageUrl} alt={productData.name} width={250}/>
          <CardDescription>{productData.label}</CardDescription>
          <CardDescription>{productData.description}</CardDescription>
        </div>
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
export function AddNewProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const addNewProduct = () => {
    console.log("Add new product");
    openModal();
  };
  return (
    <Fragment>
      <Card onClick={openModal} className="flex justify-center content-center w-[250px] h-[100%] hover:bg-[#f8fafc] cursor-pointer">
            <Plus size={48} className="self-center"/>
      </Card>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h1>Add New Product</h1>
        <ProductForm closeModal={closeModal}/>
      </Modal>
    </Fragment>
  );
}