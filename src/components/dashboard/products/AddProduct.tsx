"use client";
import { useState } from "react";
import { Plus, UploadIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEdgeStore } from "@/providers/edgestore";
import { SingleImageDropzone } from "@/components/ui/ImageUpload";
import { Progress } from "@radix-ui/react-progress";
import { toast } from "sonner";
import { createSellerProduct } from "@/lib/action";
import { ProductInput } from "@/lib/validation";

export default function AddProduct({ address }: { address: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<string>("");
  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);

  // State variables for form inputs
  const [name, setName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");

    if (
      !name ||
      !title ||
      !description ||
      !label ||
      !price ||
      !stock ||
      !image
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    const productData: ProductInput = {
      name,
      title,
      description,
      label,
      imageUrl: image,
      price,
      stock,
    };

    const data = await createSellerProduct(address, productData);
    console.log(data);

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <div className="flex flex-col justify-center items-center gap-2">
                <SingleImageDropzone
                  width={200}
                  height={200}
                  value={file}
                  onChange={(file: any) => {
                    setFile(file);
                    setProgress(0);
                    setImage("");
                  }}
                />
                <Progress
                  className="w-[300px] h-1 transition-all duration-150"
                  value={progress}
                />
                {(!image || image.trim() === "") && (
                  <Button
                    type="button"
                    onClick={async () => {
                      if (file) {
                        toast.info("image uploading");
                        const res = await edgestore.imageUrlsBlinks.upload({
                          file,
                          onProgressChange: (progress) => {
                            setProgress(progress);
                            console.log(progress);
                          },
                        });
                        console.log(res.url);
                        toast.info("upload successful");
                        setImage(res.url);
                      }
                    }}
                  >
                    Upload
                  </Button>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                type="text"
                required
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
