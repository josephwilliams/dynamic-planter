// components/Forest.tsx

import React from "react";
import { useEVMContract } from "@/contexts/ContractContext";
import ForestMatrix from "./ForestMatrix";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const Forest: React.FC = () => {
  const { incrementCount, isIncrementing } = useEVMContract();
  const { primaryWallet } = useDynamicContext();

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
      {primaryWallet?.address && (
        <>
          <button
            className="shadow-md bg-[#6e9e6e] text-white rounded-md p-3 mt-3 text-sm min-w-[120px]"
            onClick={incrementCount}
          >
            {isIncrementing ? "Planting... 🌱" : "Plant a Tree 🌳"}
          </button>
          <div className="text-[12px] text-[#386e39]">
            *Recommended Polygon Network
          </div>
        </>
      )}
    </div>
  );
};

export default Forest;
