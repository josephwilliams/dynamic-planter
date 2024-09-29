// components/WalletButton.tsx
import React from "react";
import { useWallet } from "../contexts/WalletContext";

const WalletButton: React.FC = () => {
  const { walletAddress, connectWallet, disconnectWallet } = useWallet();

  return (
    <div>
      {walletAddress ? (
        <>
          <p>Connected as: {walletAddress.toString()}</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </>
      ) : (
        <button onClick={connectWallet}>Connect to Backpack</button>
      )}
    </div>
  );
};

export default WalletButton;
