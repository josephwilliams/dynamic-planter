import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Contract } from "ethers";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { isEthereumWallet } from "@dynamic-labs/ethereum";
import { getWeb3Provider, getSigner } from "@dynamic-labs/ethers-v6";

const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newCount",
        type: "uint256",
      },
    ],
    name: "CountIncremented",
    type: "event",
  },
  {
    inputs: [],
    name: "increment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "count",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const CONTRACT_ADDRESS = "0x5b2b3b3a8fe3e8c88e7d9b2d729b53180c355c2d";

interface EVMContractContextProps {
  count: number | null;
  incrementCount: () => Promise<void>;
  isIncrementing: boolean;
  getLastFiveWallets: () => Promise<string[]>;
}

const EVMContractContext = createContext<EVMContractContextProps | undefined>(
  undefined
);

export const useEVMContract = (): EVMContractContextProps => {
  const context = useContext(EVMContractContext);
  if (!context) {
    throw new Error(
      "useEVMContract must be used within an EVMContractProvider"
    );
  }
  return context;
};

const EVMContractProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { primaryWallet } = useDynamicContext();
  const [count, setCount] = useState<number | null>(null);
  const [isIncrementing, setIsIncrementing] = useState(false);

  // Fetch the current count from the contract
  const fetchCount = useCallback(async () => {
    if (!primaryWallet || !isEthereumWallet(primaryWallet)) return;

    try {
      const provider = await getWeb3Provider(primaryWallet); // Get provider using Dynamic Labs
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

      // Call the `getCount` function from the contract
      const contractCount = await contract.getCount();
      setCount(Number(contractCount));
    } catch (error) {
      console.error("Error fetching count from contract:", error);
    }
  }, [primaryWallet]);

  // Function to increment the count
  const incrementCount = useCallback(async () => {
    if (!primaryWallet || !isEthereumWallet(primaryWallet)) {
      console.error("Wallet not connected or not Ethereum-based");
      return;
    }

    try {
      setIsIncrementing(true);

      const signer = await getSigner(primaryWallet); // Get signer using Dynamic Labs
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Send the transaction to increment the counter
      const transaction = await contract.increment();

      // Wait for the transaction to be mined
      await transaction.wait();

      console.log("Transaction confirmed:", transaction);

      // Optimistically update the count (or fetch it again)
      setCount((prevCount) => (prevCount !== null ? prevCount + 1 : null));
    } catch (error) {
      console.error("Error incrementing count:", error);
    } finally {
      setIsIncrementing(false);
    }
  }, [primaryWallet]);

  const getLastFiveWallets = useCallback(async () => {
    if (!primaryWallet || !isEthereumWallet(primaryWallet)) return [];

    try {
      const provider = await getWeb3Provider(primaryWallet);
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

      // Query the past logs for the `CountIncremented` event
      const filter = contract.filters.CountIncremented();
      const logs = await provider.getLogs({
        fromBlock: "latest", // You can adjust the block range or remove this to get all logs
        toBlock: "latest",
        ...filter,
      });

      // Extract wallet addresses by fetching the transaction for each log
      const walletAddresses = await Promise.all(
        logs.slice(-5).map(async (log) => {
          const tx = await provider.getTransaction(log.transactionHash);
          return tx.from; // This will give the wallet address that made the transaction
        })
      );

      return walletAddresses.reverse(); // Return last 5 wallets in reverse chronological order
    } catch (error) {
      console.error("Error fetching last 5 wallet addresses:", error);
      return [];
    }
  }, [primaryWallet]);

  useEffect(() => {
    if (primaryWallet && isEthereumWallet(primaryWallet)) {
      fetchCount(); // Fetch count on wallet connect
    }
  }, [primaryWallet, fetchCount]);

  return (
    <EVMContractContext.Provider
      value={{ count, incrementCount, isIncrementing, getLastFiveWallets }}
    >
      {children}
    </EVMContractContext.Provider>
  );
};

export default EVMContractProvider;
