import { RpcService } from "./rpc.service";
import toast from "react-hot-toast";
import io, { Socket } from "socket.io-client";

export class WsService {
  socket: Socket | null = null;

  constructor(private rpcService: RpcService) {}

  connect() {
    try {
      this.socket = io(import.meta.env.VITE_JARJAR_RPC_WS_URL);
      console.log("Connected to socket");
    } catch (error) {
      console.error("Error connecting to socket", error);
    }
  }

  disconnect() {
    if (this.socket) {
      console.log("Disconnecting from socket");
      this.socket.disconnect();
    }
  }

  listenQueueSizeUpdate() {
    if (!this.socket) return;
    this.socket.on("queueSizeUpdate", (size) => {
      console.log("queueSizeUpdate", size);
      toast.success(`Oracle queue size updated to ${size}`, { duration: 2000 });
    });
  }

  listenEventReceived() {
    if (!this.socket) return;
    this.socket.on("eventStatus", (event) => {
      console.log("eventStatus", event);
      toast.success(`Oracle received inference request`, {
        duration: 2000,
      });
    });
  }

  listenInferenceStarted() {
    if (!this.socket) return;
    this.socket.on("inferenceStart", (event) => {
      console.log("inferenceStart", event);
      toast.success(`Inference started`, { duration: 2000 });
    });
  }

  listenInferenceFinished() {
    if (!this.socket) return;
    this.socket.on("inferenceFinished", async (event) => {
      if (event.status === "error") {
        toast.error(`Inference failed`, { duration: 2000 });
        return;
      }
      console.log("inferenceFinished", event);
      toast.success(`Inference finished: ${event.status}`, { duration: 2000 });
      await this.rpcService.getUserNfts();
      this.rpcService.loading.set(false);
    });
  }

  handleAuthenticate(address: string) {
    if (this.socket && address) {
      try {
        this.socket.emit("authenticate", { address });
        console.log("authenticated", address);
        this.listenQueueSizeUpdate();
        this.listenEventReceived();
        this.listenInferenceFinished();
      } catch (error) {
        console.error("Error authenticating", error);
      }
    }
  }
}
