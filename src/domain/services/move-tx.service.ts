// @ts-nocheck
import { SuiClient, SuiObjectResponseQuery } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import ReactGA from "react-ga4";
import { toast } from "react-hot-toast";
import { RpcService } from "./rpc.service";

export class MoveTxService {
  suiClient: SuiClient | null = null;
  freemintTicket: string | null = null;

  constructor(private rpcService: RpcService) {
    this.rpcService = rpcService;
  }

  callOracleSmartContract = async (
    signAndExecute: any,
    suiClient: SuiClient,
    modelName: string,
    prices: any[],
    prompt: string,
    size?: string,
  ) => {
    this.rpcService.loading.set(true);
    this.suiClient = suiClient;
    const tx = await this.buildTx(modelName, prices, prompt, size);

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

  async buildTx(
    modelName: string,
    prices: any[],
    prompt: string,
    size?: string,
  ) {
    const priceModel = prices.find((price) => price.name === modelName);
    console.log({ modelName, price: priceModel.value, prompt, size });
    if (!priceModel) {
      throw new Error(`Price model ${modelName} not found`);
    }
    const tx = new Transaction();
    const prompt_data = tx.pure.string(
      JSON.stringify({
        prompt,
        size,
      }),
    );

    const callback_data = tx.pure.string(JSON.stringify(["Description", "1"]));
    const model_name = tx.pure.string(modelName);
    const price = priceModel.value; // @TODO Fetch price dynamically from rpc
    const [coin] = tx.splitCoins(tx.gas, [price]);
    const price_model = tx.object(import.meta.env.VITE_ORACLE_PRICE_MODEL_ID);
    const ownercap = tx.object(import.meta.env.VITE_ORACLE_OWNERCAP_ID);
    const gen_quantity = tx.pure.u8(1);

    tx.moveCall({
      arguments: [
        prompt_data, // prompt_data: String,
        callback_data, // callback_data: String,
        model_name, // model_name: String,
        coin, // mut payment: Coin<SUI>,
        price_model, // price_model: &mut PriceModel,
        ownercap, // ownerCap: &mut jarjar_ai_oracle::OwnerCap,
        gen_quantity, // gen_quantity: u64,
      ],
      target: `${import.meta.env.VITE_MINT_PACKAGE_ID}::${import.meta.env.VITE_MODULE_NAME}::${import.meta.env.VITE_MODULE_FUNCTION}`,
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
    ReactGA.event({
      category: "Mint",
      action: "Mint_Success",
    });
  };

  onError = (error: any) => {
    console.error("Error signing and executing transaction", error);
    toast.error("Error signing and executing transaction");
    ReactGA.event({
      category: "Mint",
      action: "Mint_Error",
    });
    this.rpcService.loading.set(false);
  };
}
