// context/SolanaContractContext.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Connection,
  PublicKey,
  TransactionInstruction,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { useWallet } from "./WalletContext"; // Import the WalletContext

const CONTRACT_ADDRESS = "";
const RPC_URL = "https://api.mainnet-beta.solana.com";

interface SolanaContractContextProps {
  count: number | null;
  incrementCount: () => Promise<void>;
}

const SolanaContractContext = createContext<
  SolanaContractContextProps | undefined
>(undefined);

export const useSolanaContract = (): SolanaContractContextProps => {
  const context = useContext(SolanaContractContext);
  if (!context) {
    throw new Error(
      "useSolanaContract must be used within a SolanaContractProvider"
    );
  }
  return context;
};

const SolanaContractProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { walletAddress } = useWallet(); // Get the wallet address from WalletContext
  const [count, setCount] = useState<number | null>(null);
  const [connection, setConnection] = useState<Connection | null>(null);
  const [programId, setProgramId] = useState<PublicKey | null>(null);

  // Initialize connection to Solana
  useEffect(() => {
    const conn = new Connection(RPC_URL);
    setConnection(conn);
    // setProgramId(new PublicKey(CONTRACT_ADDRESS));
  }, []);

  // Fetch the current count from the smart contract
  const fetchCount = useCallback(async () => {
    if (!connection || !programId) return;

    try {
      const accountInfo = await connection.getAccountInfo(programId);
      if (accountInfo?.data) {
        // Assuming the count is stored in the first 4 bytes
        const countData = accountInfo.data.slice(0, 4); // Adjust this depending on your contract's structure
        const countValue = new DataView(countData.buffer).getUint32(0, true); // Parse count as little-endian
        setCount(countValue);
      }
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  }, [connection, programId]);

  // Increment the count by interacting with the smart contract
  const incrementCount = async () => {
    if (!connection || !programId || !walletAddress) return;

    try {
      // Create transaction instruction to interact with the contract
      const instruction = new TransactionInstruction({
        keys: [{ pubkey: walletAddress, isSigner: true, isWritable: true }],
        programId,
        data: Buffer.from([1]), // Assuming the contract increments the count on receiving '1'
      });

      // Create the transaction
      const transaction = new Transaction().add(instruction);

      // Send the transaction
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        []
      );
      console.log("Transaction signature:", signature);

      // Refetch the count after incrementing
      fetchCount();
    } catch (error) {
      console.error("Error incrementing count:", error);
    }
  };

  useEffect(() => {
    fetchCount();
  }, [connection, fetchCount, programId]);

  return (
    <SolanaContractContext.Provider value={{ count, incrementCount }}>
      {children}
    </SolanaContractContext.Provider>
  );
};

export default SolanaContractProvider;
