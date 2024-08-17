import { useEffect, useState } from "react";
import axios from "axios";
import { useCurrentWallet } from "@mysten/dapp-kit";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./components/ui/carousel";
import { NftImage } from "./Nft";
import Autoplay from "embla-carousel-autoplay";
import { Box, Flex, Heading } from "@radix-ui/themes";

export const MintedNfts = () => {
  const { currentWallet } = useCurrentWallet();
  const [mintedNfts, setMintedNfts] = useState<any[]>([]);
  console.log(mintedNfts);

  const fetchMintedNfts = async () => {
    const { data } = await axios.get(`
        ${import.meta.env.VITE_JARJAR_RPC_URL}/executed-txs/sender/${currentWallet?.accounts[0].address}`);
    console.log(data);
    setMintedNfts(data.map((tx: any) => tx.gen_result));
  };

  useEffect(() => {
    if (!currentWallet) {
      return;
    }
    fetchMintedNfts();

    const interval = setInterval(() => {
      fetchMintedNfts();
    }, 20000);

    return () => clearInterval(interval);
  }, [currentWallet]);

  if (!currentWallet || !mintedNfts.length) {
    return null;
  }

  return (
    <div>
      <Flex className="mt-32 justify-center">
        <Box>
          <Heading>Your minted NFTs</Heading>
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
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent className="-ml-1">
          {mintedNfts.map((nft, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3 sm:basis-1/1"
            >
              <div className="p-1">
                <NftImage nfturl={nft} />
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
