import { createContext, useContext } from "react";
import { ApiService } from "./api.service";
import { MoveTxService } from "../services/move-tx.service";
import { RpcService } from "../services/rpc.service";
import { WsService } from "../services/ws.service";

const apiService = new ApiService();
const rpcService = new RpcService(apiService);
const moveTxService = new MoveTxService(rpcService);
const wsService = new WsService(rpcService);

export const services = {
  moveTxService,
  rpcService,
  wsService,
};

export type Services = typeof services;
export const ServicesContext = createContext<Services | null>(null);
export const ServicesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};

export function useServices(): Services {
  const services = useContext(ServicesContext);
  if (!services) {
    throw Error("ServiceContext not defined");
  }
  return services;
}
