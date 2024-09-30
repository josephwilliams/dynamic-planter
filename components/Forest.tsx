// components/Forest.tsx

import React from "react";
import { useSolanaContract } from "@/contexts/ContractContext";
import { useWallet } from "@/contexts/WalletContext";
import ForestMatrix from "./ForestMatrix";

const Forest: React.FC = () => {
  const { incrementCount, isIncrementing } = useSolanaContract();
  const { walletAddress } = useWallet(); // Access the connected wallet

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        style={{
          position: "relative",
          width: "360px",
          height: "360px",
          maxWidth: "100vw",
          overflow: "hidden",
        }}
        className="rounded-lg bg-white shadow-lg"
      >
        <ForestMatrix />
      </div>
      {walletAddress && (
        <button
          className="shadow-md bg-[#6e9e6e] text-white rounded-md p-3 mt-3 text-sm min-w-[120px]"
          onClick={incrementCount}
        >
          {isIncrementing ? "Planting... 🌱" : "Plant a Tree 🌳"}
        </button>
      )}
    </div>
  );
};

export default Forest;
