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
    const url = `/executed-txs/user/`;
    const response: any = await this.apiService.post(url, {
      sender: this.userAddress,
      packageId: import.meta.env.VITE_MINT_PACKAGE_ID,
    });
    const userNftsCount = this.userNfts.get()?.length ?? 0;
    const newUserNftsCount = response.data?.length ?? 0;
    if (!init && userNftsCount !== newUserNftsCount) {
      toast.success("New NFTs minted, scroll down to see them", {
        duration: 5000,
      });
      this.loading.set(false);
    }
    this.userNfts.set((response.data as any[]) ?? []);
  }

  async getLatestNfts() {
    const url = `/executed-txs/latest`;
    const response = await this.apiService.get(
      `${url}/${import.meta.env.VITE_MINT_PACKAGE_ID}`,
    );
    this.latestNfts.set((response.data as any[]) ?? arrNft);
  }
}
