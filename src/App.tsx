import "./app.css";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createNetworkConfig } from "@mysten/dapp-kit";
import ReactGA from "react-ga4";
import { ServicesProvider } from "@/domain/core/services";
import { Playground } from "./components/pages/Playground/Playground";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Collection } from "./components/pages/Playground/Collection";
import { Leaderboard } from "./components/pages/Playground/LeaderBoard";
import { Header } from "./components/pages/Playground/Header";

import { Announcement } from "./components/pages/Visual/Announcement";
import { Contest } from "./components/pages/Visual/Contest";
import ScrollToElement from "./components/pages/Playground/ScrollTo";

ReactGA.initialize("G-RPNVRXK9JB");
ReactGA.send({
  hitType: "pageview playground.jarjar.xyz/",
  page: "/",
  title: "playground.jarjar.xyz",
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
        <ServicesProvider>
          <WalletProvider autoConnect>
            <>
              <Router>
                <Header></Header>
                <Switch>
                  <Route path="/leaderboard/:scrollTo">
                    <ScrollToElement>
                      <Leaderboard />
                    </ScrollToElement>
                  </Route>
                  <Route path="/contest">
                    <Contest />
                  </Route>
                  <Route path="/announcement">
                    <Announcement />
                  </Route>
                  <Route path="/collection">
                    <Collection />
                  </Route>
                  <Route path="/">
                    <Playground />
                  </Route>
                </Switch>
              </Router>
            </>
          </WalletProvider>
        </ServicesProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

export default App;
