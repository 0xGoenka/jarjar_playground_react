import { useObservable } from "micro-observables";
import "./library.css";
import { useServices } from "@/domain/core/services";

function splitArray<T extends { model_name: string; prompt_data: string }>(
  array: T[],
): T[][] {
  const groupedMap = new Map<string, T[]>();

  for (const item of array) {
    const key = `${item.model_name}-${item.prompt_data}`;
    if (!groupedMap.has(key)) {
      groupedMap.set(key, []);
    }
    groupedMap.get(key)!.push(item);
  }

  return Array.from(groupedMap.values());
}

export const Collection = () => {
  const { rpcService, voteService } = useServices();
  const userNfts = useObservable(rpcService.userNfts);
  if (!userNfts) return null;
  let reversedNfts = userNfts?.slice().reverse();

  const nftSplittedByPromptAndModel = splitArray(reversedNfts);
  console.log({ nftSplittedByPromptAndModel });

  return (
    <div>
      <h1 className="text-center text-black mb-8 text-3xl">My collection</h1>
      {nftSplittedByPromptAndModel?.map((nfts) => (
        <div className="text-black nft-box">
          <div className="flex justify-between mb-2">
            <span className="mt-2">
              <span className="font-bold mr-3">Model: </span>{" "}
              {nfts[0].model_name}
            </span>
            <button
              className="connect-wallet"
              onClick={() => voteService.submitCollection(nfts)}
            >
              Submit to vote
            </button>
          </div>
          <div>
            <span className="font-bold">Prompt: </span>
            {JSON.parse(nfts[0].prompt_data).prompt}
          </div>
          <NftsByPromptAndModel nfts={nfts} />
        </div>
      ))}
    </div>
  );
};

const NftsByPromptAndModel = ({ nfts }: { nfts: any[] }) => {
  return (
    <div className="photo-library">
      {nfts?.map((nft) => (
        <a
          key={nft.gen_result}
          href={`https://suiscan.xyz/mainnet/tx/${nft.gen_transaction_digest}`}
          className="photo-item"
        >
          <img src={nft.gen_result} alt="Square Photo 1" />
        </a>
      ))}
    </div>
  );
};
