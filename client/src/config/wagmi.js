import { createConfig, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { sepolia } from 'wagmi/chains'

// Base Sepolia config
const baseSepoliaChain = {
  id: 84532,
  name: 'Base Sepolia',
  network: 'base-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://sepolia.base.org'] },
    public: { http: ['https://sepolia.base.org'] },
  },
  blockExplorers: {
    default: { name: 'Basescan', url: 'https://sepolia.basescan.org' },
  },
  testnet: true,
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [baseSepoliaChain],
  [publicProvider()],
)

// Wagmi config
export const config = createConfig({
  chains,
  connectors: [
    new CoinbaseWalletConnector({ 
      appName: 'PayrollBase',
      chainId: sepolia.id,
    }),
  ],
  publicClient,
  webSocketPublicClient,
})
