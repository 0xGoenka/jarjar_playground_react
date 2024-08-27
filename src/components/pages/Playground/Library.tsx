import "./library.css";

export const Library = ({ userNfts }) => {
  return (
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
  );
};
