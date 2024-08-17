import Autoplay from "embla-carousel-autoplay";

import "./app.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import {
  useCurrentWallet,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { Button as ShdcnButton } from "@/components/ui/button";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { generateAiInference } from "./generateAiInference";
import ReactGA from "react-ga4";
import axios from "axios";

const arrNft = [
  {
    explorer:
      "https://suiscan.xyz/testnet/object/0x3ab123d085a9365c6f18a81c5c3090e5f4c8888f9aea1512f9d806cdb5ab15c3",
    url: "https://jarjar-mainnet.s3.amazonaws.com/5d41443c-c9b3-4e19-afa7-bcf628126af5",
  },
  {
    explorer:
      "https://suiscan.xyz/testnet/object/0x43b638fa323fd3ab24b284f8c11ccc7936785b3dcb02de6cf75091a22a553496",
    url: "https://jarjar-mainnet.s3.amazonaws.com/9c1729f3-a2f6-4bf0-b780-811e82935238",
  },
  {
    explorer:
      "https://suiscan.xyz/testnet/object/0xffe743c79bca8c0892a0daede9dd8b5603c78c7f90c3755fc5f37cf7c2f4943b",
    url: "https://jarjar-mainnet.s3.amazonaws.com/d4ba2167-1e15-47c7-8808-281391f5b9fb",
  },
  {
    explorer:
      "https://suiscan.xyz/testnet/object/0x61a5009fc2a23773c2490652ea30417751283e9335b2eae6df56123bdd36850f",
    url: "https://jarjar-mainnet.s3.amazonaws.com/10da6af9-29e1-4b8d-af92-9a39011303f1",
  },
];

export const Nft = () => {
  const { currentWallet } = useCurrentWallet();
  const [code, setCode] = useState("");
  const [open, setOpen] = useState(false);
  const suiClient = useSuiClient();
  const [queueSize, setQueueSize] = useState(0);
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  // console.log(useWallet);

  useEffect(() => {
    if (code === "Sui First Ai oracle = JarJar.xyz") {
      setOpen(false);
      toast.success("Code is correct you can now mint your NFT");
      ReactGA.event({
        category: "Mint_Code",
        action: "Mint_Code Code is correct",
      });
    }
  }, [code]);

  const updateQueueSize = () => {
    axios
      .get(`${import.meta.env.VITE_JARJAR_RPC_URL}/gen-txs/queue-size`)
      .then((res) => {
        setQueueSize(res.data.queueSize);
      });
  };

  useEffect(() => {
    updateQueueSize();
    const interval = setInterval(updateQueueSize, 20000);
    return () => clearInterval(interval);
  }, []);

  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown === 0) {
      return;
    }
    const interval = setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  const mintNft = async () => {
    if (!currentWallet) {
      toast.error("Please connect your wallet");
      return;
    }

    if (code !== "Sui First Ai oracle = JarJar.xyz") {
      setOpen(true);
      return;
    }
    try {
      await generateAiInference(signAndExecute, suiClient);
      setCountdown(60);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Toaster />
      <Heading className="text-center mt-32">
        Mint your own AI gen Jar Jar Binks Eggs on Testnet
      </Heading>
      <Heading className="text-center text-gray-500 mt-4 text-[20px]">
        Generated at the smart contract level
      </Heading>
      <div className="flex flex-col items-center justify-center">
        <CarrousselNft />
      </div>
      <Flex className="mt-32 justify-center flex-col">
        <Button
          className="cursor-pointer"
          color="gray"
          variant="solid"
          highContrast
          size="4"
          disabled={countdown !== 0}
          onClick={mintNft}
        >
          {countdown === 0 ? "Mint" : "Mint again in " + countdown + " seconds"}
        </Button>
        <div className="text-center mt-4 text-gray-400">
          Queue size: {queueSize}
        </div>
      </Flex>

      <div className="shadow-slate-800 bg-black">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="bg-black">
            <div className="mx-auto w-full max-w-sm bg-black ">
              <DrawerHeader>
                <DrawerTitle>Enter the code</DrawerTitle>
                <DrawerDescription>
                  Find the code on discord and paste it here to proceed.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div className="flex items-center justify-center space-x-2">
                  <div className="flex-1 text-center">
                    <Input
                      placeholder="Code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-3 h-[120px] text-center flex flex-row justify-center">
                  <span className="flex flex-row justify-center">
                    <a
                      href="https://discord.gg/ysBe8XGFtd"
                      target="_blank"
                      className="text-center text-md mt-2 w-full underline"
                      onClick={() => {
                        ReactGA.event({
                          category: "Mint_Discord",
                          action: "Clicked Mint_Discord",
                        });
                      }}
                    >
                      <div className="flex flex-row justify-center">
                        <span className="ml-1">Discord link</span>
                        <ExternalLinkIcon className="h-4 w-4 mt-1 ml-1" />
                      </div>
                    </a>
                  </span>
                </div>
              </div>
              <DrawerFooter>
                <ShdcnButton
                  className="bg-white text-black rounded-[8px] text-lg"
                  variant={"outline"}
                  onClick={() => {
                    ReactGA.event({
                      category: "Mint_Submit",
                      action: "Clicked Mint_Submit",
                    });
                  }}
                >
                  Submit
                </ShdcnButton>
                <DrawerClose asChild>
                  <ShdcnButton
                    className="rounded-[8px] text-lg"
                    variant="outline"
                    onClick={() => {
                      ReactGA.event({
                        category: "Mint_Cancel",
                        action: "Clicked Mint_Cancel",
                      });
                    }}
                  >
                    Cancel
                  </ShdcnButton>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export const CarrousselNft = () => {
  return (
    <div>
      <Flex className="mt-32 justify-center">
        <Box>
          <Heading>Latest minted NFTs</Heading>
        </Box>
      </Flex>
      <Carousel
        className="w-full sm:max-w-screen-lg max-w-[300px] mt-8"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent className="-ml-1">
          {arrNft.map((nft, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3 sm:basis-1/1"
            >
              <div className="p-1">
                <NftImage nfturl={nft.url} />
                <div className="text-center">
                  <a
                    href={nft.explorer}
                    target="_blank"
                    className="text-center text-sm mt-2 w-full hover:underline"
                  >
                    View on Explorer
                  </a>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export const NftImage = ({ nfturl }: { nfturl: string }) => {
  return (
    <div className="h-[300px] overflow-hidden rounded-[12px]">
      <img
        className="w-full h-full object-cover rounded-lg"
        alt="nft"
        src={nfturl}
      />
    </div>
  );
};
