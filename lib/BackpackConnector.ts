// lib/BackpackConnector.ts
import { PublicKey, Connection } from "@solana/web3.js";

export class BackpackConnector {
  private connection: Connection;
  private publicKey: PublicKey | null = null;

  constructor(rpcUrl: string) {
    this.connection = new Connection(rpcUrl);
  }

  // Connect to Backpack
  async connect(): Promise<PublicKey | null> {
    try {
      const backpackWallet = (window as any).backpack;

      if (!backpackWallet || !backpackWallet.isBackpack) {
        console.error("Backpack Wallet is not installed");
        return null;
      }

      // Request access to the wallet
      const response = await backpackWallet.connect();
      this.publicKey = new PublicKey(response.publicKey.toString());
      return this.publicKey;
    } catch (error) {
      console.error("Failed to connect to Backpack Wallet:", error);
      return null;
    }
  }

  // Disconnect from Backpack
  disconnect() {
    (window as any).backpack.disconnect();
    this.publicKey = null;
  }

  getPublicKey(): PublicKey | null {
    return this.publicKey;
  }

  getConnection(): Connection {
    return this.connection;
  }
}
