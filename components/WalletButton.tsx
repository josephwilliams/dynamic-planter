import React from "react";
import { classNames, DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const WalletButton: React.FC = () => {
  const { primaryWallet } = useDynamicContext();

  return (
    <div className="flex flex-col justify-center items-center mb-2">
      <div
        className={classNames(
          "mb-[3px] border-[2px] border-[#6e9e6e] border-dotted",
          primaryWallet?.address ? "rounded-md" : "border-none"
        )}
      >
        <DynamicWidget />
      </div>
      <div className="text-[12px] text-[#386e39]">
        *Recommended Polygon Network
      </div>
    </div>
  );
};

export default WalletButton;
