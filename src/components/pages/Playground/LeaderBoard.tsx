import { useObservable } from "micro-observables";
import "./library.css";
import { useServices } from "@/domain/core/services";
import { ThumbsUp } from "lucide-react";
import { ArtWork } from "@/domain/services/types";

export const Leaderboard = () => {
  const { voteService } = useServices();
  const collections = useObservable(voteService.collections);
  console.log({ collections });

  collections?.sort((a, b) => b.voteCount - a.voteCount);

  return (
    <>
      <div>
        <h1 className="text-center text-black mb-8 text-3xl">Leaderboard</h1>
        {collections?.map((collection) => (
          <div
            className="text-black nft-box"
            key={collection.id}
            id={collection.id.toString()}
          >
            <div className="flex justify-between mb-2">
              <span className="mt-2">
                <span className="font-bold mr-3">Model: </span>{" "}
                {collection.model_name}
                <span className="font-bold ml-3 mr-3">
                  Collection id:{" "}
                </span>{" "}
                {collection.id}
              </span>
              <button
                className="connect-wallet flex-row flex justify-center items-center"
                onClick={async () => {
                  await voteService.submitVote(collection.id);
                  await voteService.getCollectionsWithUserVote();
                }}
              >
                <ThumbsUp fill={collection.userVoted ? "#4a5568" : "#e0e5ec"} />{" "}
                <span className="ml-2 text-bold text-xl">
                  {collection.voteCount}
                </span>
              </button>
            </div>
            <div>
              <span className="font-bold">Prompt: </span>
              {collection.prompt}
            </div>
            <NftsByPromptAndModel collection={collection} />
          </div>
        ))}
      </div>
    </>
  );
};

const NftsByPromptAndModel = ({ collection }: { collection: ArtWork }) => {
  return (
    <div className="photo-library">
      {collection.images?.map((image) => (
        <a key={image} className="photo-item">
          <img src={image} alt="Square Photo 1" />
        </a>
      ))}
    </div>
  );
};
