import React, { useState, useEffect } from "react";
import { ReclaimProofRequest } from "@reclaimprotocol/js-sdk";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CopyIcon, CheckIcon } from "lucide-react";

export default function ReclaimComponent({
  currentOrderId,
  updateOrderStatus1,
}: {
  currentOrderId: string;
  updateOrderStatus1: any;
}) {
  const [reclaimProofRequest, setReclaimProofRequest] = useState<any>(null);
  const [requestUrl, setRequestUrl] = useState("");
  const [statusUrl, setStatusUrl] = useState("");
  const [proofs, setProofs] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    async function initializeReclaim() {
      const APP_ID = "0x4E29c6d73E12C125eEC043F025A9a9aeC913a2d4";
      const APP_SECRET =
        "0x237a03ce5050d6c13a79b55b7e4a47fd678298b0c16ceee5849699f31d2adc20";
      const PROVIDER_ID = "a50c3b9b-f5a2-420e-9797-6c3be26ff621";
      const proofRequest = await ReclaimProofRequest.init(
        APP_ID,
        APP_SECRET,
        PROVIDER_ID
      );
      setReclaimProofRequest(proofRequest);
    }
    initializeReclaim();
  }, []);

  async function handleCreateClaim() {
    if (!reclaimProofRequest) {
      console.error("Reclaim Proof Request not initialized");
      return;
    }

    const url = await reclaimProofRequest.getRequestUrl();
    setRequestUrl(url);

    const status = reclaimProofRequest.getStatusUrl();
    setStatusUrl(status);
    console.log("Status URL:", status);

    await reclaimProofRequest.startSession({
      onSuccess: (proofs: any) => {
        console.log("Verification success", proofs.claimData.context);
        let data = proofs.claimData.context;
        let jsonData = JSON.parse(data);
        const statusValue = jsonData.extractedParameters.Status;
        console.log(statusValue);
        setProofs(statusValue);
      },
      onFailure: (error: any) => {
        console.error("Verification failed", error);
      },
    });
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(requestUrl);
      setIsCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="border rounded-lg flex flex-col items-center gap-6 justify-center p-2 bg-background">
      <Button onClick={handleCreateClaim} className="w-full max-w-xs">
        Generate Proof
      </Button>
      {requestUrl && (
        <div className="flex flex-col items-center gap-4 ">
          <div className="flex items-center justify-between bg-muted  rounded-md">
            <h2 className="">{requestUrl}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="flex-shrink-0"
            >
              {isCopied ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <QRCode value={requestUrl} />
          </div>
        </div>
      )}
      {proofs && (
        <div className="w-full max-w-md flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-2">
            Verification Successful!
          </h2>
          <span className="text-green-800 font-bold">{proofs}</span>

          <Button
            onClick={() => {
              updateOrderStatus1(currentOrderId, "DELIVERED");
            }}
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}
