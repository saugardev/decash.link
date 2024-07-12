import { http, createConfig } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, polygon],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http()
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
