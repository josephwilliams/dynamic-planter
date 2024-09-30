// pages/_app.tsx
import type { AppProps } from "next/app";
import WalletProvider from "@/contexts/WalletContext";
import SolanaContractProvider from "@/contexts/ContractContext";

const RPC_URL = "https://api.mainnet-beta.solana.com";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider rpcUrl={RPC_URL}>
      <SolanaContractProvider>
        <Component {...pageProps} />
      </SolanaContractProvider>
    </WalletProvider>
  );
}

export default MyApp;
