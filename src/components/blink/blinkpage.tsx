"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEdgeStore } from "@/providers/edgestore";
import { SingleImageDropzone } from "../ui/ImageUpload";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import BlinkExample from "./BlinkRender";
import { SellerBlinkInput, SellerBlinkSchema } from "@/lib/validation";
import { createSellerBlink } from "@/lib/action";
import { useRouter } from "next/navigation";

export function CreateBlinkComp({ address }: { address: string }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("");
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!address) {
      toast.warning("connect your wallet");
      return;
    }
    if (!url) {
      toast.warning("upload Image");
      return;
    }
    if (!title || !description || !label) {
      toast.warning("fill up all the fields");
      return;
    }

    const formData: SellerBlinkInput = {
      title,
      description,
      icon: url,
      label,
      sellerWallet: address,
    };
    const data = await SellerBlinkSchema.parse(formData);

    const response = await createSellerBlink(data);

    console.log(response);
    if (response.err) {
      toast.warning(response.msg);
      return;
    }
    router.push("/dashboard/blink");
    toast.success("successfully created your blink");
  };

  return (
    <div className="flex flex-col md:flex-row p-3 gap-4">
      <div className="flex-1  md:border-r p-3">
        <div className="flex  justify-center items-center max-w-[700px] md:w-full mx-auto p-5 ">
          <Card className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                Create your Blink Store
              </CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="text-sm  font-bold text-gray-700 dark:text-gray-300"
                  >
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="label"
                    className="text-sm font-bold text-gray-700 dark:text-gray-300"
                  >
                    Label
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter label"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-bold text-gray-700 dark:text-gray-300"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    rows={4}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex flex-col justify-center items-center gap-2">
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
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full font-bold uppercase text-md "
                  type="submit"
                >
                  Create Blink
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <BlinkExample
          description={description}
          imageUrl={url}
          title={title}
          label={label}
          created={false}
          address={address}
        />
      </div>
    </div>
  );
}
