import { useCurrentAccount } from "@mysten/dapp-kit";

type Props = {
  setOpen: any;
};

function truncateAddress(address: string, numChars: number = 4): string {
  if (address.length <= 2 * numChars) {
    return address;
  }
  return `${address.slice(0, numChars)}...${address.slice(-numChars)}`;
}

export const Header = ({ setOpen }: Props) => {
  const currentAccount = useCurrentAccount();
  return (
    <div className="w-full align-center justify-center flex">
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
    </div>
  );
};
