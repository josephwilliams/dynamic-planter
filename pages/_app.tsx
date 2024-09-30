// pages/_app.tsx
import type { AppProps } from "next/app";
import WalletProvider from "@/contexts/WalletContext";
import SolanaContractProvider from "@/contexts/ContractContext";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider>
      <SolanaContractProvider>
        <Component {...pageProps} />
      </SolanaContractProvider>
    </WalletProvider>
  );
}

export default MyApp;
