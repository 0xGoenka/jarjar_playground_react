import { useServices } from "@/domain/core/services";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { useObservable } from "micro-observables";
import { useState } from "react";
import toast from "react-hot-toast";

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
      label: `${price.name}: ${priceToCoin(price.value).toFixed(3)} SUI`,
      value: price.name,
    };
  });
}

export const Form = () => {
  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const { rpcService, moveTxService } = useServices();
  const currentAccount = useCurrentAccount();

  const [model, setModel] = useState("flux1_schnell");
  const [prompt, setPrompt] = useState(
    "8bit, retro, twitter profile picture alien republic army neuromorphic, artificial intelligence vibe",
  );

  const price = useObservable(rpcService.price);
  console.log({ price });

  const formatedPrice = formatPrice(price);
  return (
    <div>
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
        onClick={() => {
          if (!currentAccount?.address) {
            toast.error("Please connect your wallet");
            return;
          }
          moveTxService.callOracleSmartContract(
            signAndExecute,
            suiClient,
            model,
            price,
            prompt,
          );
        }}
      >
        Generate Image
      </button>
    </div>
  );
};
