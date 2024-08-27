import "./library.css";

type Props = {
  userNfts: any[] | undefined;
};

export const Library = ({ userNfts }: Props) => {
  if (!userNfts) return null;

  return (
    <div>
      {(userNfts?.length ?? 0) > 0 && (
        <div className="text-center text-black mt-8">
          You have {userNfts?.length} NFTs
        </div>
      )}
      <div className="photo-library">
        {userNfts?.map((nft) => (
          <a
            href={`https://suiscan.xyz/mainnet/tx/${nft.gen_transaction_digest}`}
            className="photo-item"
          >
            <img src={nft.gen_result} alt="Square Photo 1" />
          </a>
        ))}
      </div>
    </div>
  );
};
