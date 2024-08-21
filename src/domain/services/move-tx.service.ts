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

  async checkFreemintCapability(client: SuiClient) {
    if (!this.rpcService.userAddress) return;
    const filter: SuiObjectResponseQuery = {
      owner: this.rpcService.userAddress,
      filter: {
        StructType: import.meta.env.VITE_FREEMINT_TYPE_ID,
      },
    };

    const options = {
      showType: true,
      showOwner: true,
      showPreviousTransaction: true,
      showDisplay: false,
      showContent: false,
      showBcs: false,
      showStorageRebate: false,
    };

    try {
      const objectResponse = await client.getOwnedObjects({
        ...filter,
        options: options,
      });

      console.log({ data: objectResponse.data });
      if (objectResponse.data.length !== 0) {
        toast.success(
          `${objectResponse.data.length} free mint capabilities found`,
        );
        this.freemintTicket = objectResponse.data[0].data?.objectId;
        console.log({ freemintTicket: this.freemintTicket });
      } else {
        this.freemintTicket = null;
      }
      return objectResponse;
    } catch (error) {
      console.error("Error fetching owned objects:", error);
      toast.error("Error fetching free mint capabilities");
      throw error; // or handle it as appropriate for your application
    }
  }

  callOracleSmartContract = async (
    signAndExecute: any,
    suiClient: SuiClient,
  ) => {
    this.rpcService.loading.set(true);
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
    const ownercap = tx.object(import.meta.env.VITE_ORACLE_OWNERCAP_ID);
    const mintCap = tx.object(import.meta.env.VITE_MINT_CAP_ID);

    const prompt_data = tx.pure.string(
      JSON.stringify({
        prompt: import.meta.env.VITE_PROMPT,
        size: import.meta.env.VITE_PROMPT_SIZE,
      }),
    );

    const callback_data = tx.pure.string(
      JSON.stringify([
        import.meta.env.VITE_PROMPT_NAME,
        import.meta.env.VITE_PROMPT_DESCRIPTION,
      ]),
    );

    const model_name = tx.pure.string(import.meta.env.VITE_MODEL_NAME);

    let freemint_ticket;

    if (this.freemintTicket) {
      console.log("freemintTicket2", this.freemintTicket);
      freemint_ticket = tx.moveCall({
        target: "0x1::option::some",
        typeArguments: [import.meta.env.VITE_FREEMINT_TYPE_ID],
        arguments: [tx.object(this.freemintTicket)],
      });
    } else {
      console.log("No Freemint ticket", this.freemintTicket);
      freemint_ticket = tx.moveCall({
        target: "0x1::option::none",
        typeArguments: [import.meta.env.VITE_FREEMINT_TYPE_ID],
      });
    }

    const price = this.freemintTicket ? 100000000 : 5000000000;

    const price_model = tx.object(import.meta.env.VITE_ORACLE_PRICE_MODEL_ID);

    const [coin] = tx.splitCoins(tx.gas, [price]);
    tx.moveCall({
      arguments: [
        prompt_data, // prompt_data: String,
        callback_data, // callback_data: String,
        model_name, // model_name: String,
        coin, // mut payment: Coin<SUI>,
        price_model, // price_model: &mut PriceModel,
        ownercap, // ownerCap: &mut jarjar_ai_oracle::OwnerCap,
        freemint_ticket, // freemint_ticket: option::Option<free_mint::JarJarFreemint>,
        mintCap, // cap: &mut MintCap,
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
    toast.error("Error signing and executing transaction");
    ReactGA.event({
      category: "Mint",
      action: "Mint_Error",
    });
    this.rpcService.loading.set(false);
  };
}
