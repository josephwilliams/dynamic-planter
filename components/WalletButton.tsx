import React from "react";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

const WalletButton: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center mb-2">
      <div className="mb-[3px] border-[2px] border-[#6e9e6e] border-dotted rounded-md">
        <DynamicWidget />
      </div>
      <div className="text-[12px] text-[#386e39]">
        *Recommended Polygon Network
      </div>
    </div>
  );
};

export default WalletButton;
