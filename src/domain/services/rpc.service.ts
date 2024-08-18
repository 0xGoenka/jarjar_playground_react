import { arrNft } from "@/constants/defaultNftArr";
import { ApiService } from "./../core/api.service";
import { observable, WritableObservable } from "micro-observables";
import { toast } from "react-hot-toast";

export class RpcService {
  apiService: ApiService;
  latestNfts: WritableObservable<any[]> = observable(arrNft);
  userNfts: WritableObservable<any[] | undefined> = observable(undefined);
  userAddress: string | undefined;
  loading: WritableObservable<boolean> = observable(false);

  constructor(apiService: ApiService) {
    this.apiService = apiService;
    this.getLatestNfts();
    setInterval(() => {
      this.getLatestNfts();
      this.getUserNfts();
      console.log("Refreshing");
    }, 5000);
  }

  async setUserAddress(address: string) {
    this.userAddress = address;
    this.getUserNfts(true);
  }

  async getUserNfts(init = false) {
    if (!this.userAddress) return;
    const url = `/executed-txs/sender/${this.userAddress}`;
    const response: any = await this.apiService.get(url);
    const userNftsCount = this.userNfts.get()?.length ?? 0;
    const newUserNftsCount = response.data?.length ?? 0;
    if (!init && userNftsCount !== newUserNftsCount) {
      toast.success("New NFTs minted, scroll down to see them");
      this.loading.set(false);
    }
    this.userNfts.set((response.data as any[]) ?? []);
  }

  async getLatestNfts() {
    const url = `/executed-txs/`;
    const response = await this.apiService.get(url);
    this.latestNfts.set((response.data as any[]) ?? arrNft);
  }
}
