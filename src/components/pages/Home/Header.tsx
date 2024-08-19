import { useServices } from "@/domain/core/services";
import {
  ConnectModal,
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { useObservable } from "micro-observables";
import { useEffect, useState } from "react";

export const Header = () => {
  const currentAccount = useCurrentAccount();
  const [open, setOpen] = useState(false);
  const { moveTxService, rpcService } = useServices();
  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const loading = useObservable(rpcService.loading);

  useEffect(() => {
    currentAccount && rpcService.setUserAddress(currentAccount.address);
    moveTxService.checkFreemintCapability(suiClient);
    console.log("addre", currentAccount?.address);
  }, [currentAccount]);

  return (
    <div className="flex flex-row justify-between">
      <div>
        <h1 className="mb-0">Eggs Collection</h1>
        <p className="text-gray-400">
          AI-generated art inspired by a galaxy far, far away.
        </p>
      </div>
      <div>
        {currentAccount && (
          <button
            disabled={loading}
            onClick={() => {
              moveTxService.callOracleSmartContract(signAndExecute, suiClient);
            }}
            className="btn mt-4 mr-4"
          >
            {loading ? "Minting..." : "Mint"}
          </button>
        )}
        {!currentAccount && (
          <button className="btn mt-4" onClick={() => setOpen(true)}>
            Connect Wallet
          </button>
        )}
      </div>
      <ConnectModal
        trigger
        open={open}
        onOpenChange={(open) => setOpen(open)}
      />
    </div>
  );
};
