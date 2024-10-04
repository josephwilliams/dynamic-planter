import type { AppProps } from "next/app";
import WalletProvider from "@/contexts/WalletContext";
import SolanaContractProvider from "@/contexts/ContractContext";
import {
  DynamicContextProvider,
  // DynamicWidget,
} from "@dynamic-labs/sdk-react-core";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

import "../styles/globals.css";
import { ForestProvider } from "@/contexts/ForestContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "f393451d-c3c4-436a-96c0-5f79fa2ff9bc",
        walletConnectors: [EthereumWalletConnectors],
        // recommendedWallets: [],
      }}
    >
      <WalletProvider>
        <SolanaContractProvider>
          <ForestProvider>
            <Component {...pageProps} />
          </ForestProvider>
        </SolanaContractProvider>
      </WalletProvider>
    </DynamicContextProvider>
  );
}

export default MyApp;
