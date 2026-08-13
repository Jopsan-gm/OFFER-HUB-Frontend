import type { StellarNetworkName } from "@/config/wallet";

/**
 * Wallet slice of the auth store.
 *
 * `walletConnected` is redundant with `walletAddress !== null`. Both are kept
 * because consumers read the flag, and the two fields are only ever written
 * together by the actions below — never set them independently or they will
 * drift.
 *
 * Connecting a wallet does not authenticate the user: it is independent of
 * `isAuthenticated`, which still comes from email/password or OAuth until the
 * D1.2 challenge-response flow lands.
 */
export interface WalletConnectionState {
  /** Public key of the connected wallet, or null when none is connected. */
  walletAddress: string | null;
  /** True while a wallet is connected. */
  walletConnected: boolean;
  /** Record a successful wallet connection. */
  connectWallet: (address: string) => void;
  /** Clear the connected wallet. */
  disconnectWallet: () => void;
}

/**
 * One asset line of a Stellar account, normalized from Horizon's `balances[]`.
 *
 * Amounts stay strings: Horizon reports 7-decimal fixed point and `number`
 * cannot round-trip large balances exactly. Convert only for display.
 */
export interface StellarAssetBalance {
  /** Display code, e.g. "XLM" or "USDC". */
  code: string;
  /** Balance as Horizon reports it, e.g. "9974.9999800". "0" without a trustline. */
  balance: string;
  /**
   * False when the account holds no trustline for this asset. Always true for
   * XLM, which every funded account holds natively.
   */
  hasTrustline: boolean;
}

/** XLM and USDC balances of a single Stellar account. */
export interface StellarAccountBalances {
  xlm: StellarAssetBalance;
  usdc: StellarAssetBalance;
}

export interface WalletKitContextValue {
  /** True once SWK has been initialized in the browser. False during SSR and first paint. */
  isReady: boolean;
  /** Public key of the connected wallet, or null when no wallet is connected. */
  address: string | null;
  /** Stellar network the kit is configured against. */
  network: StellarNetworkName;
  /** Network passphrase SWK signs with. */
  networkPassphrase: string;
}
