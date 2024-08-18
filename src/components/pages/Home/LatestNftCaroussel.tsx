import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useServices } from "@/domain/core/services";
import Autoplay from "embla-carousel-autoplay";
import { useObservable } from "micro-observables";

export const LatestNftCaroussel = () => {
  const { rpcService } = useServices();
  const latestNfts = useObservable(rpcService.latestNfts);

  console.log({ latestNfts });
  return (
    <div>
      <h2 className="nft-section-title mt-12 ">Latest minted Eggs</h2>
      <Carousel
        className="w-full sm:max-w-screen-lg max-w-[300px] nft-grid overflow-visible"
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
        <CarouselContent className="p-4">
          {latestNfts.map((nft, key) => (
            <CarouselItem
              className="first-child:pl-0 p-2 md:basis-1/2 lg:basis-1/3 sm:basis-1/1"
              key={key}
            >
              <div className="nft-item">
                <img src={nft.gen_result} alt="JarJar NFT 1" />
                <div className="nft-info">
                  <h3>EGGS #000{key + 1}</h3>
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
