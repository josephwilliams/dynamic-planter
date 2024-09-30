// pages/index.tsx
import Forest from "@/components/Forest";
import WalletButton from "../components/WalletButton";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center p-3 m-0-auto forest-bg min-h-screen">
      {/* <h1>Solana Wallet Integration with Backpack</h1> */}
      <Forest />
      <WalletButton />
    </div>
  );
}
