import { LatestNftCaroussel } from "./LatestNftCaroussel";
import { UsersNftCaroussel } from "./UsersNftCaroussel";

export const Content = () => {
  return (
    <div className="main">
      <LatestNftCaroussel />
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

      <UsersNftCaroussel />
    </div>
  );
};
