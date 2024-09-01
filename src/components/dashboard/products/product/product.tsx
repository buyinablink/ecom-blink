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
import { LucideTrash2, Plus } from "lucide-react";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import ProductForm from "./product-form";
import { deleteProduct } from "@/lib/action";
import { set } from "@coral-xyz/anchor/dist/cjs/utils/features";
import { toast } from "sonner";
import Loading from "@/components/Loading";

interface ProductProps {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  stock: string;
  id: string;
  label: string;
  setDoNothing: any;
}
export default function Product(props: ProductProps) {
  const [productData, setProductData] = useState({
    name: props.name,
    title: props.title,
    description: props.description,
    imageUrl: props.imageUrl,
    price: props.price,
    stock: props.stock,
    id: props.id,
    label: props.label,
  });
  const [showTrashIcon, setShowTrashIcon] = useState(false);
  const [trashHovered, setTrashHovered] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false)

  const updateProductData = (newData: Partial<typeof props>) => {
    setProductData((prevData) => ({ ...prevData, ...newData }));
  };
  const showTrash = () => {
    setShowTrashIcon(true);
  };
  const hideTrash = () => {
    setShowTrashIcon(false);
  }
  const hoveredOnTrash = () => {
    setTrashHovered(prevState => !prevState);
  }
  const deleteProduct1 = async () => {
    console.log("delete product");
    setDeleteModal(true);
    console.log("something happened")
  }
  const deleteProduct2 = async () => {
    setLoading(true)
    console.log("delete confirmed")
    const res = await deleteProduct(productData.id)
    console.log(res)
    res.err ? toast.error(res.msg) : toast.success(res.msg)
    setLoading(false)
    props.setDoNothing(Math.random())
  }
  const confirmDeleteModal = () => setDeleteModal(prevState => !prevState);
  return (
    <Card className="w-[250px] h-[530px] hover:bg-[#f8fafc] relative" onMouseEnter={showTrash} onMouseLeave={hideTrash}>
      {
        loading && <Loading />
      }
      <CardHeader className="h-[120px]">
      {
        showTrashIcon && 
        <div onClick={deleteProduct1}>
          <LucideTrash2 
            size={24} 
            className="absolute top-2 z-20 right-2 cursor-pointer" 
            onMouseEnter={hoveredOnTrash} 
            onMouseLeave={hoveredOnTrash} 
            color={trashHovered ? "red" : "black"}/>
        </div>
      }
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
      <Modal isOpen={deleteModal} onClose={confirmDeleteModal}>
        <Button onClick={() => {
          confirmDeleteModal();
          deleteProduct2();
        }}>Yes</Button>
        <Button onClick={confirmDeleteModal}>No</Button>
      </Modal>
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