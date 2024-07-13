import { http, createConfig } from "wagmi";
import { astarZkyoto, polygonZkEvmCardona, sepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [sepolia, polygonZkEvmCardona, astarZkyoto],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [sepolia.id]: http(),
    [polygonZkEvmCardona.id]: http(),
    [astarZkyoto.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
