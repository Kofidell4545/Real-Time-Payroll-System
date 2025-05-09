import { createConfig, configureChains } from 'wagmi';
import { mainnet, baseGoerli } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [mainnet, baseGoerli],
  [publicProvider()]
);

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains })
  ],
  publicClient,
});

export const SUPPORTED_CHAINS = chains;
