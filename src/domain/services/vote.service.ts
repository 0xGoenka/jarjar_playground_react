import { observable } from "micro-observables";
import { ApiService } from "./../core/api.service";
import toast from "react-hot-toast";
import { ArtWork } from "./types";
export class VoteService {
  collections = observable<ArtWork[]>([]);
  userAddress: string | undefined;

  constructor(private readonly apiService: ApiService) {
    this.getCollections().then(({ data }) => this.collections.set(data as any));
  }

  setUserAddress(address: string) {
    this.userAddress = address;
  }

  async submitCollection(nfts: any[]) {
    if (nfts.length < 4) {
      toast.error("You need at least 4 images to submit a collection");
      return;
    }
    console.log({ nfts });
    try {
      const result = await this.apiService.post("art-work", {
        model_name: nfts[0].model_name,
        prompt_data: nfts[0].prompt_data,
        sender: nfts[0].sender,
      });
      toast.success("Submitted collection successfully");
      console.log({ result });
      this.getCollectionsWithUserVote();
    } catch (error) {
      toast.error("Collection already submitted");
    }
  }

  async getCollections() {
    const result = await this.apiService.get("art-work");
    console.log({ result });
    return result;
  }

  async getCollectionsWithUserVote() {
    const result = await this.apiService.post(
      "art-work/get-all-with-user-vote",
      {
        userAddress: this.userAddress,
      },
    );
    console.log({ result });
    this.collections.set(result.data as ArtWork[]);
  }

  async submitVote(artworkId: number) {
    try {
      const result = await this.apiService.post("vote", {
        userAddress: this.userAddress,
        artworkId,
      });
      console.log({ result });
      toast.success("Vote submitted successfully");
    } catch (error) {
      //@ts-ignore
      toast.error(error?.response?.data?.message);
    }
  }
}
