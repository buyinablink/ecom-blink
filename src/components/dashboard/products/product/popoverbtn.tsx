"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { editProduct } from "@/lib/action";
import { ProductInput } from "@/lib/validation";
import { useEdgeStore } from "@/providers/edgestore";
import { UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PopoverButton({
  productData,
  updateProductData,
}: {
  productData: ProductInput & { id: string };
  updateProductData: (newData: Partial<ProductInput>) => void;
}) {
  const [image, setImage] = useState<string>(productData.imageUrl);
  const [isOpen, setIsOpen] = useState(false);
  const { edgestore } = useEdgeStore();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const res = await edgestore.imageUrlsBlinks.upload({
          file,
        });
        setImage(res.url);
        updateProductData({ imageUrl: res.url });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: keyof ProductInput, value: string) => {
    updateProductData({ [field]: value });
  };

  const saveChanges = async () => {
    const res = await editProduct(productData.id, productData);
    setIsOpen(!isOpen);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button>Edit Details</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Change product details</h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="uploadbtn">Image</Label>
              <Button
                id="uploadbtn"
                variant="outline"
                size="sm"
                className="col-span-2 h-8"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                <UploadIcon className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Title</Label>
              <Input
                id="maxWidth"
                value={productData.title}
                className="col-span-2 h-8"
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={productData.name}
                className="col-span-2 h-8"
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={productData.label}
                className="col-span-2 h-8"
                onChange={(e) => handleInputChange("label", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Description</Label>
              <Textarea
                id="width"
                value={productData.description}
                className="col-span-2 h-8"
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Price</Label>
              <Input
                type="number"
                step="any"
                id="height"
                value={productData.price}
                className="col-span-2 h-8"
                onChange={(e) => handleInputChange("price", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Stock</Label>
              <Input
                id="maxHeight"
                value={productData.stock}
                className="col-span-2 h-8"
                onChange={(e) => handleInputChange("stock", e.target.value)}
              />
            </div>
          </div>
          <Button variant="destructive" onClick={saveChanges}>
            Save Changes
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
