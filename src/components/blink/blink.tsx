import React from "react";
import { CreateBlinkComp } from "./blinkpage";
import { useGetSellerDetails } from "@/hooks/useGetUser";
import Loading from "../Loading";
import EditBlink from "./editBlink";

export default function BlinkRender({ address }: { address: string }) {
  const { data, isLoading } = useGetSellerDetails(address);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {data && data.data && data.data.blinkCreated ? (
        <>
          <EditBlink address={address} />
        </>
      ) : (
        <>
          <CreateBlinkComp address={address} />
        </>
      )}
    </>
  );
}
