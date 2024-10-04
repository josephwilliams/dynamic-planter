import React from "react";
import { useEVMContract } from "@/contexts/ContractContext";
import ForestMatrix from "./ForestMatrix";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export function truncateWalletAddress(address, startLength = 4, endLength = 4) {
  // Ensure the address is valid and long enough to truncate
  if (address.length <= startLength + endLength) {
    return address;
  }

  // Extract the beginning and end of the address
  const start = address.slice(0, startLength);
  const end = address.slice(-endLength);

  // Combine the start and end with ellipsis in the middle
  return `${start}...${end}`;
}

const Forest: React.FC = () => {
  const { incrementCount, isIncrementing } = useEVMContract();
  const { primaryWallet } = useDynamicContext();

  // const [wallets, setWallets] = useState<string[]>([]);

  // useEffect(() => {
  //   const fetchWallets = async () => {
  //     const lastFiveWallets = await getLastFiveWallets();
  //     setWallets(lastFiveWallets);
  //   };

  //   fetchWallets();
  // }, [getLastFiveWallets]);

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
        </>
      )}
      {/* <div className="text-[12px] mt-3 text-[#386e39]">
        {wallets.length > 0 && (
          <>
            <p>Last 5 wallets:</p>
            <ul>
              {wallets.map((wallet, index) => (
                <li key={index}>{wallet}</li>
              ))}
            </ul>
          </>
        )}
      </div> */}
    </div>
  );
};

export default Forest;
