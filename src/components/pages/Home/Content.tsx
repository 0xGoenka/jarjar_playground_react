import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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

export const Content = () => {
  return (
    <div className="main">
      <div className="flex flex-row justify-between">
        <div>
          <h1>Eggs Collection</h1>
          <p>AI-generated art inspired by a galaxy far, far away.</p>
        </div>
        <div>
          <a href="#" className="btn mt-4">
            Connect Wallet
          </a>
        </div>
      </div>
      <Carousel
        className="w-full sm:max-w-screen-lg max-w-[300px] mt-8 nft-grid overflow-visible"
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
          {arrNft.map((nft, key) => (
            <CarouselItem
              className="first-child:pl-0 p-2 md:basis-1/2 lg:basis-1/3 sm:basis-1/1"
              key={key}
            >
              <div className="nft-item">
                <img src={nft.url} alt="JarJar NFT 1" />
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

      <section className="about-section">
        <h2>About the $JARJAR Airdrop</h2>
        <p>
          By generating this NFT, you make yourself eligible for the $JARJAR
          airdrop. The airdrop will be distributed to all holders of the JARJAR
          1# collection on the Sui blockchain.
        </p>
        <br />
        <p>
          The $JARJAR airdrop is a unique opportunity for holders of the JARJAR
          1# collection to participate in the $JARJAR ecosystem and receive a
          portion of the airdrop rewards.
        </p>
        <br />
        <p>
          Airdrop rewards will be distributed in the form of $JARJAR tokens,
          which can be used to interact with the JARJAR ecosystem, including
          participating in the JARJAR DAO, contributing to the JARJAR community,
          and receiving rev share rewards from oracles fees.
        </p>
      </section>
    </div>
  );
};
