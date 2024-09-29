import { useSolanaContract } from "@/contexts/ContractContext";
import { useWallet } from "@/contexts/WalletContext";
import React from "react";
import { FaTree } from "react-icons/fa";
import { FaTree as FaTreeWide } from "react-icons/fa6";

const GREEN_COLORS = [
  "#228B22",
  "#2E8B57",
  "#3CB371",
  "#32CD32",
  "#90EE90",
  "#98FB98",
  "#8FBC8F",
  "#00FF7F",
  "#00FA9A",
  "#ADFF2F",
  "#7FFF00",
  "#7CFC00",
  "#00FF00",
  "#32CD32",
  "#00FF00",
  "#7FFF00",
  "#00FA9A",
  "#00FF7F",
  "#7CFC00",
  "#7FFF00",
  "#ADFF2F",
  "#8FBC8F",
  "#98FB98",
  "#90EE90",
  "#32CD32",
  "#3CB371",
  "#2E8B57",
  "#228B22",
];

export default function Forest() {
  const { count, incrementCount } = useSolanaContract();
  const { walletAddress } = useWallet(); // Access the connected wallet

  // Function to generate random positions within the 500px x 500px area
  const getRandomPosition = () => {
    const top = Math.floor(Math.random() * 500); // Random number between 0 and 500 for vertical positioning
    const left = Math.floor(Math.random() * 500); // Random number between 0 and 500 for horizontal positioning
    return { top, left };
  };

  return (
    <div
      style={{
        position: "relative",
        width: "500px",
        height: "500px",
        border: "1px solid black",
        overflow: "hidden",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Forest</h1>
      {Array.from({ length: count }).map((_, index) => {
        const { top, left } = getRandomPosition();
        // randomly select between two tree icons
        const TreeIcon = Math.random() > 0.5 ? FaTree : FaTreeWide;
        // Size between 18 and 24px
        const treeSize = Math.floor(Math.random() * 6) + 18;
        return (
          <TreeIcon
            key={index}
            style={{
              position: "absolute",
              top: `${top}px`,
              left: `${left}px`,
              fontSize: `${treeSize}px`,
              color:
                GREEN_COLORS[Math.floor(Math.random() * GREEN_COLORS.length)],
            }}
          />
        );
      })}
      {walletAddress && <button onClick={incrementCount}>Plant a Tree</button>}
    </div>
  );
}
