import { SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { toast } from "sonner";
import ReactGA from "react-ga4";

export const generateAiInference = (
  signAndExecute: any,
  suiClient: SuiClient,
) => {
  const tx = new Transaction();
  const ownercap = tx.object(import.meta.env.VITE_OWNERCAP_ID);
  const [coin] = tx.splitCoins(tx.gas, [50000000]);
  tx.moveCall({
    arguments: [
      tx.pure.string(
        JSON.stringify({
          prompt: import.meta.env.VITE_PROMPT,
          size: import.meta.env.VITE_PROMPT_SIZE,
        }),
      ),
      tx.pure.string(import.meta.env.VITE_MODEL_NAME),
      coin,
      ownercap,
    ],
    target: `${import.meta.env.VITE_PACKAGE_ID}::${import.meta.env.VITE_MODULE_NAME}::${import.meta.env.VITE_MODULE_FUNCTION}`,
  });

  signAndExecute(
    {
      transaction: tx,
    },
    {
      onSuccess: async ({ digest }: any) => {
        const tx = await suiClient.waitForTransaction({
          digest,
          options: {
            showEffects: true,
          },
        });
        console.log({ tx });
        toast.success(
          "Success minting your NFT, it should appear in your wallet in a few seconds (10s-20s)",
        );
        ReactGA.event({
          category: "Mint",
          action: "Mint_Success",
        });
      },
      onError: (error: any) => {
        console.error("Error signing and executing transaction", error);
        toast.error("Error signing and executing transaction", error);
        ReactGA.event({
          category: "Mint",
          action: "Mint_Error",
        });
      },
    },
  );
};
