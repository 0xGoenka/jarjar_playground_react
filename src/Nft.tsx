import Autoplay from "embla-carousel-autoplay";

import "./app.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button, Flex, Heading } from "@radix-ui/themes";
import {
  useCurrentWallet,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useEffect, useState } from "react";
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

const arrNft = [
  {
    explorer:
      "https://testnet.suivision.xyz/object/0x127b6ee242289e85e7ab083e5d933e1206cbdbfa351daa33f36c2879abf06765",
    url: "https://jarjar-mainnet.s3.eu-north-1.amazonaws.com/c4c721d4-db7d-4111-aa37-0494d420e1e0",
  },
  {
    explorer:
      "https://testnet.suivision.xyz/object/0x62e8ce3f9bfb204073a4831105525a2dcc2c4b0cb2373431ab4a64cd66605401",
    url: "https://jarjar-mainnet.s3.eu-north-1.amazonaws.com/90278ac9-058b-497e-89d1-989bb0b4d7de",
  },
  {
    explorer:
      "https://testnet.suivision.xyz/object/0x72128c756a4b0ad92b5f4f18e25498f32efc1e63100a65a1daab6fd8c2b4bfbc",
    url: "https://jarjar-mainnet.s3.eu-north-1.amazonaws.com/b41ae289-62ca-4ab9-a0f2-94cc731eb942",
  },
  {
    explorer:
      "https://testnet.suivision.xyz/object/0x7704b6cd95d3323256867149411a08018c1fc657694549a232e82411cc76b144",
    url: "https://jarjar-mainnet.s3.eu-north-1.amazonaws.com/9f432958-8b4b-4cf6-9130-1ce44b36005d",
  },
];

export const Nft = () => {
  const { currentWallet } = useCurrentWallet();
  const [code, setCode] = useState("");
  const [open, setOpen] = useState(false);
  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  // console.log(useWallet);

  useEffect(() => {
    if (code === "Sui First Ai oracle = JarJar.xyz") {
      setOpen(false);
      toast.success("Code is correct you can now mint your NFT");
      ReactGA.event({
        category: "Mint_Code",
        action: "Code is correct",
      });
    }
  }, [code]);

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Toaster />
      <Heading className="text-center mt-32">
        Mint your own AI Mysticeti
      </Heading>
      <Heading className="text-center text-gray-500 mt-4 text-[20px]">
        Be cooler than a whale, be a Mysticeti
      </Heading>
      <div className="flex flex-col items-center justify-center">
        <CarrousselNft />
      </div>
      <Flex className="mt-32 justify-center">
        <Button
          className="cursor-pointer"
          color="gray"
          variant="solid"
          highContrast
          size="4"
          onClick={mintNft}
        >
          Mint
        </Button>
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
                          action: "Clicked",
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
                      action: "Clicked",
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
                        action: "Clicked",
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
    <Carousel
      className="w-full sm:max-w-screen-lg max-w-[300px] mt-32"
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
