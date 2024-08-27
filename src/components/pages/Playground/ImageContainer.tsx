import { Loader } from "@/components/ui/Loader";

type Props = {
  loading: boolean;
  userNfts: any[] | undefined;
};

export const ImageContainer = ({ loading, userNfts }: Props) => {
  if (!userNfts || userNfts.length === 0)
    return (
      <div className="result text-black justify-center items-center flex-1">
        <div className="h-full w-full flex flex-col items-center justify-center">
          Your generated image will appear here
        </div>
      </div>
    );

  return (
    <div className="result">
      {loading ? (
        <Loader title="Oracle is thinking..." />
      ) : (
        <img
          className="result-image-img"
          src={userNfts?.[userNfts.length - 1]?.gen_result}
          alt="Result Image"
        />
      )}
    </div>
  );
};
