import { useEffect } from "react";
import "./playground.css";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useObservable } from "micro-observables";
import { useServices } from "@/domain/core/services";
import { ImageContainer } from "./ImageContainer";
import { Form } from "./Form";

export const Playground = () => {
  const { rpcService, wsService } = useServices();
  const userNfts = useObservable(rpcService.userNfts);
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
      <h1 className="text-center text-black mb-8 text-3xl">Playground</h1>
      <div className="container">
        <ImageContainer loading={loading} userNfts={userNfts} />
        <Form />
      </div>
    </div>
  );
};
