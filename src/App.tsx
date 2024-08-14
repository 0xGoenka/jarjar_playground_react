import {
  ConnectButton,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import { Box, Flex, Heading } from "@radix-ui/themes";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createNetworkConfig } from "@mysten/dapp-kit";
import { Nft } from "./Nft";
import "./app.css";
import ReactGA from "react-ga4";

ReactGA.initialize("G-RPNVRXK9JB");
ReactGA.send({
  hitType: "pageview mint.jarjar.xyz/",
  page: "/",
  title: "mint.jarjar.xyz/",
});

const queryClient = new QueryClient();

const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl("localnet") },
  devnet: { url: getFullnodeUrl("devnet") },
  testnet: { url: getFullnodeUrl("testnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider
        networks={networkConfig}
        defaultNetwork={import.meta.env.VITE_SUI_NETWORK}
      >
        <div className="max-w-screen-lg mx-auto">
          <WalletProvider autoConnect>
            <Flex
              position="sticky"
              px="4"
              py="2"
              justify="between"
              style={{
                borderBottom: "1px solid var(--gray-a2)",
              }}
            >
              <Box>
                <Heading>
                  JARJAR 1# Collection on{" "}
                  <span className="text-blue-400">$SUI</span>
                </Heading>
                <Heading className="text-sm text-gray-400 mt-2">
                  Generated by the first AI oracle on the $SUI blockchain
                </Heading>
              </Box>
              <Box>
                <ConnectButton />
              </Box>
            </Flex>
            <Nft />
            <div className="mt-32">
              By generating this NFT, you make yourself eligible for the $JARJAR
              airdrop. The airdrop will be distributed to all holders of the
              JARJAR 1# collection on the Sui blockchain.
              <br />
              <br />
              The $JARJAR airdrop is a unique opportunity for holders of the
              JARJAR 1# collection to participate in the $JARJAR ecosystem and
              receive a portion of the airdrop rewards.
              <br />
              <br />
              Airdrop rewards will be distributed in the form of $JARJAR tokens,
              which can be used to interact with the JARJAR ecosystem, including
              participating in the JARJAR DAO, contributing to the JARJAR
              community, and receiving rev share rewards from oracles fees.
            </div>
          </WalletProvider>
        </div>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

export default App;
