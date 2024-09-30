// components/ForestMatrix.tsx

import React from "react";
import { useForest } from "@/contexts/ForestContext";

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

const GRID_SIZE = 30;

const ForestMatrix: React.FC = () => {
  const { matrix } = useForest(); // Access the forest matrix from context

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
              opacity: cell === "🌳" ? 1 : 0.5,
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

export default ForestMatrix;
