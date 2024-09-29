// pages/index.tsx
import Forest from "@/components/Forest";
import WalletButton from "../components/WalletButton";

export default function Home() {
  return (
    <div>
      {/* <h1>Solana Wallet Integration with Backpack</h1> */}
      <Forest />
      <WalletButton />
    </div>
  );
}
