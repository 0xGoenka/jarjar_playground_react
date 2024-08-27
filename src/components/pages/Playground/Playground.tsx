import { useEffect, useState } from "react";
import "./playground.css";
import {
  ConnectModal,
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { useObservable } from "micro-observables";
import { useServices } from "@/domain/core/services";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "@/components/ui/Loader";
import { Library } from "./Library";

function truncateAddress(address: string, numChars: number = 4): string {
  if (address.length <= 2 * numChars) {
    return address;
  }
  return `${address.slice(0, numChars)}...${address.slice(-numChars)}`;
}

function priceToCoin(price: number) {
  return price / 1000000000;
}

function formatPrice(price: any[]) {
  if (!price) {
    toast.error("Error fetching price");
    return [];
  }
  return price.map((price) => {
    return {
      label: `${price.name}: ${priceToCoin(price.value).toFixed(2)} SUI`,
      value: price.name,
    };
  });
}

export const Playground = () => {
  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const [open, setOpen] = useState(false);
  const { rpcService, moveTxService, wsService } = useServices();
  const userNfts = useObservable(rpcService.userNfts);
  let reversedNfts = userNfts?.slice().reverse();
  const currentAccount = useCurrentAccount();
  const [model, setModel] = useState("flux1_schnell");
  const loading = useObservable(rpcService.loading);
  const [prompt, setPrompt] = useState(
    "8bit, retro, twitter profile picture alien republic army neuromorphic, artificial intelligence vibe",
  );
  const price = useObservable(rpcService.price);

  const formatedPrice = formatPrice(price);

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
      <div className="header">
        <div className="title">JarJar Playground</div>
        <button
          className="connect-wallet"
          onClick={() => !currentAccount && setOpen(true)}
        >
          {currentAccount
            ? truncateAddress(currentAccount.address)
            : "Connect Wallet"}
        </button>
      </div>
      <div className="container">
        <div className="result">
          {loading ? (
            <Loader />
          ) : (
            <img
              className="result-image-img"
              src={userNfts?.[userNfts.length - 1]?.gen_result}
              alt="Result Image"
            />
          )}
        </div>
        <div className="input-group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            id="prompt"
            placeholder="Enter your prompt here..."
          ></textarea>
        </div>
        <div className="input-group">
          <select
            id="model"
            className="text-black"
            onChange={(e) => setModel(e.target.value)}
            value={model}
          >
            {formatedPrice.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button
          id="generate"
          onClick={() =>
            moveTxService.callOracleSmartContract(
              signAndExecute,
              suiClient,
              model,
              price,
              prompt +
                ', spelling out "jarjar.xyz" once on the bottom of the image',
            )
          }
        >
          Generate Image
        </button>
      </div>
      <ConnectModal
        trigger
        open={open}
        onOpenChange={(open) => setOpen(open)}
      />
      <Toaster />
      <div>
        {(userNfts?.length ?? 0) > 0 && (
          <div className="text-center text-black mt-2">
            You have {userNfts?.length} NFTs
          </div>
        )}
        <Library userNfts={reversedNfts}></Library>
      </div>
    </div>
  );
};
