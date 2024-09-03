// @ts-nocheck

export const Contest = () => {
  const text = "JARJAR.XYZ - ".repeat(1000);

  return (
    <div className="font-mono">
      <marquee behavior="scroll" direction="left" style={{ width: "100%" }}>
        <div className="flex justify-center mt-3">{text}</div>
      </marquee>
      <div className="bg-white text-black pt-4 pb-4">
        <div className="font-extrabold text-3xl align-center text-center">
          CONTEST
        </div>

        <div className="flex flex-row justify-center align-center text-center text-[48px] mt-4">
          <div className="mr-8 ml-8 font-extrabold text-[48px] mt-[12px]">
            200{" "}
            <img src="/sui.png" width={110} className="inline mt-[-8px]"></img>{" "}
            prize
          </div>
        </div>
        <div className="flex justify-center mt-4">
          Compete against other user to create the best looking pfp NFTs using
          jarjar Oracle
        </div>
        <div className="flex justify-center mt-4 text-3xl font-bold">
          RETWEET - LIKE - FOLLOW
        </div>
        <div className="flex justify-center ">to participate</div>
      </div>
      <marquee behavior="scroll" direction="right" style={{ width: "100%" }}>
        <div className="mt-3 flex justify-left">{text}</div>
      </marquee>
    </div>
  );
};
