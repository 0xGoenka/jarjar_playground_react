import { SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import ReactGA from "react-ga4";
import { toast } from "react-hot-toast";

export class MoveTxService {
  suiClient: SuiClient | null = null;

  callOracleSmartContract = async (
    signAndExecute: any,
    suiClient: SuiClient,
  ) => {
    this.suiClient = suiClient;
    const tx = await this.buildTx();

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: this.onSuccess,
        onError: this.onError,
      },
    );
  };

  async buildTx() {
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
        tx.pure.string(
          JSON.stringify([
            import.meta.env.VITE_PROMPT_NAME,
            import.meta.env.VITE_PROMPT_DESCRIPTION,
          ]),
        ),
        tx.pure.string(import.meta.env.VITE_MODEL_NAME),
        coin,
        ownercap,
      ],
      target: `${import.meta.env.VITE_PACKAGE_ID}::${import.meta.env.VITE_MODULE_NAME}::${import.meta.env.VITE_MODULE_FUNCTION}`,
    });
    return tx;
  }

  onSuccess = async ({ digest }: any) => {
    const tx = await this.suiClient?.waitForTransaction({
      digest,
      options: {
        showEffects: true,
      },
    });
    console.log({ tx });
    toast.success(
      "Success minting your NFT, it should appear in your wallet in a few seconds (30s) depending on network congestion",
    );
    ReactGA.event({
      category: "Mint",
      action: "Mint_Success",
    });
  };

  onError = (error: any) => {
    console.error("Error signing and executing transaction", error);
    toast.error("Error signing and executing transaction", error);
    ReactGA.event({
      category: "Mint",
      action: "Mint_Error",
    });
  };
}
