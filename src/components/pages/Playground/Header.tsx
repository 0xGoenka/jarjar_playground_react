import { useServices } from "@/domain/core/services";
import { ConnectModal, useCurrentAccount } from "@mysten/dapp-kit";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Banner } from "./Banner";

function truncateAddress(address: string, numChars: number = 4): string {
  if (address.length <= 2 * numChars) {
    return address;
  }
  return `${address.slice(0, numChars)}...${address.slice(-numChars)}`;
}

export const Header = () => {
  const currentAccount = useCurrentAccount();
  const [open, setOpen] = useState(false);
  const { rpcService, wsService, voteService } = useServices();

  useEffect(() => {
    if (currentAccount) {
      voteService.setUserAddress(currentAccount.address);
      voteService.getCollectionsWithUserVote();
      rpcService.setUserAddress(currentAccount.address);
      wsService.connect();
      wsService.handleAuthenticate(currentAccount.address);
    }
    return () => wsService.disconnect();
  }, [currentAccount]);
  return (
    <>
      <Banner />
      <div className="w-full align-center justify-center flex mt-8">
        <div className="header">
          <div className="md:flex flex-row">
            <Link to="/">
              <button className="connect-wallet mr-4 sm:mb-0 mb-4">
                Playground
              </button>
            </Link>
            {currentAccount?.address ? (
              <>
                <Link to="/collection">
                  <button className="connect-wallet mr-4 sm:mb-0 mb-4">
                    My collection
                  </button>
                </Link>

                <Link to="/leaderboard">
                  <button className="connect-wallet mr-4">Leaderboard</button>
                </Link>
              </>
            ) : null}
            {/* <div className="title">JarJar Playground</div> */}
          </div>
          <button
            className="connect-wallet"
            onClick={() => !currentAccount && setOpen(true)}
          >
            {currentAccount
              ? truncateAddress(currentAccount.address)
              : "Connect Wallet"}
          </button>
        </div>
        <ConnectModal
          trigger
          open={open}
          onOpenChange={(open) => setOpen(open)}
        />
        <Toaster />
      </div>
    </>
  );
};
