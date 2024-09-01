"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { SingleImageDropzone } from "@/components/ui/ImageUpload";
import { useEdgeStore } from "@/providers/edgestore";
import { Progress } from "@/components/ui/progress";
import { createSellerProduct } from "@/lib/action";
import { ProductInput } from "@/lib/validation";
import { useWallet } from "@solana/wallet-adapter-react";
export default function ProductForm({ closeModal }: any) {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();
  const [url, setUrl] = useState("");
  const { publicKey } = useWallet();
  const [doNothing, setDoNothing] = useState(false);

  async function addProduct(e: any) {
    e.preventDefault();
    if (!publicKey) return;
    console.log("submitted");
    closeModal(false);
    const productData: ProductInput = {
      title,
      name,
      description,
      label,
      imageUrl: url,
      price: price.toString(),
      stock: stock.toString(),
    };
    const res = await createSellerProduct(publicKey.toString(), productData);
    console.log(res);
    setDoNothing(!doNothing);
  }
  return (
    <div className="p-3">
      <form
        className=" p-4 flex flex-col gap-2"
        onSubmit={(e) => addProduct(e)}
      >
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            required
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Label>Image</Label>
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
            onChange={(file: any) => {
              setFile(file);
              setProgress(0);
              setUrl("");
            }}
          />

          <Progress
            className="max-w-[300px]  transition-all duration-150"
            value={progress}
          />
          {(!url || url.trim() === "") && (
            <Button
              type="button"
              className="w-fit mb-2"
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
                  toast.info("upload successfull");
                  setUrl(res.url);
                }
              }}
            >
              Upload
            </Button>
          )}
        </div>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input required id="name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            required
            id="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="label">Label</Label>
          <Input
            required
            id="label"
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            required
            type="number"
            id="price"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input
            required
            id="stock"
            type="number"
            onChange={(e) => setStock(Number(e.target.value))}
          />
        </div>
        <Button className="mt-2" type="submit">
          Add Product
        </Button>
      </form>
    </div>
  );
}
