"use client";
import { useGetSellerHook } from "@/hooks/useGetUser";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Loading from "../Loading";
import { Switch } from "../ui/switch";
import { getSellerBlink, updateSellerBlink } from "@/lib/action";

function EditBlink({ address }: { address: string }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("");
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");

  const [editing, setIsEditing] = useState(false);

  const { data } = useGetSellerHook(address);

  useEffect(() => {
    const fetchData = async () => {
      if (data && data.blink) {
        const { title, description, icon, label } = data.blink;
        setTitle(title);
        setDescription(description);
        setUrl(icon);
        setLabel(label);
      }
    };

    fetchData();
  }, [data, address]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      title,
      description,
      icon: url,
      label,
    };
    const data = await updateSellerBlink(formData, address);
    console.log(data);
    if (data.err) {
      toast.warning(data.msg);
      return;
    }
    setIsEditing(!editing);
    toast.success(data.msg);
  };

  return (
    <div className="flex flex-col md:flex-row p-3 gap-4">
      <div className="flex-1  md:border-r p-3">
        <div className="flex  justify-center items-center max-w-[700px] md:w-full mx-auto p-5 ">
          <Card className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="flex">
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                Edit your Blink
              </CardTitle>

              <Switch
                id="edit-mode"
                checked={editing}
                onCheckedChange={() => {
                  setIsEditing(!editing);
                }}
              />
              <Label htmlFor="edit-mode">Edit Mode</Label>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <SingleImageDropzone
                      width={200}
                      height={200}
                      value={file}
                      disabled={!editing}
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
                        disabled={!editing}
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
                    disabled={!editing}
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
                    disabled={!editing}
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
                    disabled={!editing}
                  />
                </div>
              </CardContent>
              <CardFooter>
                {editing && (
                  <>
                    <Button
                      className="w-full font-bold uppercase text-md "
                      type="submit"
                      disabled={!editing}
                    >
                      save
                    </Button>
                  </>
                )}
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
        />
      </div>
    </div>
  );
}

export default EditBlink;
