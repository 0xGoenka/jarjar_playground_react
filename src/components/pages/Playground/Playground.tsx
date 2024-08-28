import { useEffect, useState } from "react";
import "./playground.css";
import { ConnectModal, useCurrentAccount } from "@mysten/dapp-kit";
import { useObservable } from "micro-observables";
import { useServices } from "@/domain/core/services";
import { Toaster } from "react-hot-toast";
import { Library } from "./Library";
import { ImageContainer } from "./ImageContainer";
import { Header } from "./Header";
import { Form } from "./Form";

export const Playground = () => {
  const [open, setOpen] = useState(false);
  const { rpcService, wsService } = useServices();
  const userNfts = useObservable(rpcService.userNfts);
  let reversedNfts = userNfts?.slice().reverse();
  const currentAccount = useCurrentAccount();
  const loading = useObservable(rpcService.loading);

  useEffect(() => {
    if (currentAccount) {
      rpcService.setUserAddress(currentAccount.address);
      wsService.connect();
      wsService.handleAuthenticate(currentAccount.address);
    }

    return () => wsService.disconnect();
  }, [currentAccount]);

  return (
    <div className="body">
      <Header setOpen={setOpen}></Header>
      <div className="container">
        <ImageContainer loading={loading} userNfts={userNfts} />
        <Form />
      </div>
      <ConnectModal
        trigger
        open={open}
        onOpenChange={(open) => setOpen(open)}
      />
      <Toaster />
      <Library userNfts={reversedNfts}></Library>
    </div>
  );
};
