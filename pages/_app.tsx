// pages/_app.tsx
import type { AppProps } from "next/app";
import WalletProvider from "@/contexts/WalletContext";

const RPC_URL = "https://api.mainnet-beta.solana.com";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider rpcUrl={RPC_URL}>
      <Component {...pageProps} />
    </WalletProvider>
  );
}

export default MyApp;
