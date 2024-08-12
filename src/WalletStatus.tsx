import {
  useAccounts,
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
  useSwitchAccount,
  useWallets,
} from "@mysten/dapp-kit";
import { Container, Flex, Heading, Text } from "@radix-ui/themes";
import { OwnedObjects } from "./OwnedObjects";
import { generateAiInference } from "./generateAiInference";

export function WalletStatus() {
  const account = useCurrentAccount();
  const suiClient = useSuiClient();
  const wallets = useWallets();

  console.log("wallets", wallets);
  console.log("import.meta.env.DEV", import.meta.env.DEV);

  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const { mutate: switchAccount } = useSwitchAccount();
  const accounts = useAccounts();

  return (
    <Container my="2">
      <Heading mb="2">Wallet Status</Heading>

      {account ? (
        <Flex direction="column">
          <Text>Wallet connected</Text>
          <Text>Address: {account.address}</Text>
          <button
            onClick={() => generateAiInference(signAndExecute, suiClient)}
          >
            Init AI smartContract
          </button>
        </Flex>
      ) : (
        <Text>Wallet not connected</Text>
      )}
      <OwnedObjects />
    </Container>
  );
}
