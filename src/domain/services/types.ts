export interface ArtWork {
  id: number;
  sender: string;
  model_name: string;
  prompt: string;
  images: string[];
  voteCount: number;
  userVoted: boolean;
}
