// @ts-nocheck

export const Announcement = () => {
  const text = "JARJAR.XYZ - ".repeat(1000);

  return (
    <div className="font-mono">
      <marquee behavior="scroll" direction="left" style={{ width: "100%" }}>
        <div className="flex justify-center mt-3">{text}</div>
      </marquee>
      <div className="bg-white text-black pt-4 pb-4">
        <div className="font-extrabold text-3xl align-center text-center">
          Announcement
        </div>

        <div className="flex flex-row justify-center align-center text-center text-[48px] mt-4">
          <div>
            FLUX{" "}
            <span className="font-extrabold text-[42px] ml-[-16px]">Dev</span>
          </div>
          <div className="mr-8 ml-8 font-extrabold text-[32px] mt-[12px]">
            X
          </div>
          <div>JARJAR</div>
        </div>
        <div className="flex justify-center mt-4">
          You can now use Flux dev in your smart contract on SUI
        </div>
      </div>
      <marquee behavior="scroll" direction="right" style={{ width: "100%" }}>
        <div className="mt-3 flex justify-left">{text}</div>
      </marquee>
    </div>
  );
};
