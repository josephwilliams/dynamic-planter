import { useSolanaContract } from "@/contexts/ContractContext";
import { useWallet } from "@/contexts/WalletContext";
import React, { useEffect, useState } from "react";

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

const SPRITES = ["~", "*", " ", "^", "+", " ", " ", ".", " ", "🌳"]; // Include tree emoji
const GRID_SIZE = 30;

type Cell = string | null;

const getRandomSprite = () => {
  const randomIndex = Math.floor(Math.random() * (SPRITES.length - 1)); // Exclude tree initially
  return SPRITES[randomIndex];
};

const generateMatrix = (count: number): Cell[][] => {
  // Create empty 50x50 grid
  const grid: Cell[][] = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => null)
  );

  // Fill the grid with random sprites
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      grid[i][j] = getRandomSprite();
    }
  }

  // Randomly place tree emojis
  let treesPlaced = 0;
  while (treesPlaced < count) {
    const randomRow = Math.floor(Math.random() * GRID_SIZE);
    const randomCol = Math.floor(Math.random() * GRID_SIZE);

    // Place tree if the cell is not already a tree
    if (grid[randomRow][randomCol] !== "🌳") {
      grid[randomRow][randomCol] = "🌳";
      treesPlaced++;
    }
  }

  return grid;
};

const ForestMatrix: React.FC = () => {
  const { count: treeCount } = useSolanaContract();
  const [matrix, setMatrix] = useState<Cell[][]>([]);

  useEffect(() => {
    // Generate the grid when the component mounts
    const generatedMatrix = generateMatrix(treeCount);
    setMatrix(generatedMatrix);
  }, [treeCount]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${GRID_SIZE}, 12px)`,
      }}
    >
      {matrix.flatMap((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            style={{
              width: "12px",
              height: "12px",
              textAlign: "center",
              lineHeight: "12px",
              border: "1px solid #fefefe",
              boxSizing: "border-box",
              opacity: cell === "🌳" ? 1 : 0.5,
              // random green
              color:
                GREEN_COLORS[Math.floor(Math.random() * GREEN_COLORS.length)],
            }}
          >
            {cell}
          </div>
        ))
      )}
    </div>
  );
};

export default function Forest() {
  const { incrementCount } = useSolanaContract();
  const { walletAddress } = useWallet(); // Access the connected wallet

  return (
    <div
      style={{
        position: "relative",
        width: "360px",
        height: "360px",
        maxWidth: "100vw",
        // border: "1px solid lightgray",
        overflow: "auto",
      }}
      className="rounded-lg bg-white"
    >
      <ForestMatrix />
      {walletAddress && <button onClick={incrementCount}>Plant a Tree</button>}
    </div>
  );
}
