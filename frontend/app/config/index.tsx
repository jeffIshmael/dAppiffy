


import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage, http } from 'wagmi'
import { mainnet, sepolia , liskSepolia } from 'wagmi/chains'

// Your WalletConnect Cloud project ID
export const projectId = '36da7b8b0119e8424a7a80d1bb17e3c8'

// Create a metadata object
const metadata = {
  name: 'dAppify',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}



// Create wagmiConfig
const chains = [mainnet, sepolia, liskSepolia] as const
export const wagmiConfig = defaultWagmiConfig({
    chains, // required
    projectId, // required
    metadata, // required
    ssr: true,
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [liskSepolia.id]: http()
      // [bscTestnet.id]: http('https://data-seed-prebsc-1-s1.binance.org:8545'),
    },
    storage: createStorage({
      storage: cookieStorage,
    }),
    enableWalletConnect: true, // Optional - true by default
    enableInjected: true, // Optional - true by default
    enableEIP6963: true, // Optional - true by default
    enableCoinbase: true, // Optional - true by default
  });