import { WalletError } from '.';

export type SubscriptionFn = (
  accounts: WalletAccount[] | undefined
) => void | Promise<void>;

export interface WalletLogoProps {
  // Logo url
  src: string;
  // Alt for the Logo url
  alt: string;
}

export interface WalletAccount {
  address: string;
  source: string;
  name?: string;
  wallet?: Wallet;
  signer?: unknown;
}

interface WalletData {
  // The name of the wallet extension. Should match `WalletAccount.source`
  extensionName: string;
  // Display name for the wallet extension
  title: string;
  // Message to display if wallet extension is not installed
  noExtensionMessage?: string;
  // The URL to install the wallet extension
  installUrl: string;
  // The wallet logo
  logo: WalletLogoProps;
}

interface WalletExtension {
  installed: boolean | undefined;

  // The raw extension object which will have everything a dapp developer needs.
  // Refer to a specific wallet's extension documentation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extension: any;

  // The raw signer object for convenience. Usually the implementer can derive this from the extension object.
  // Refer to a specific wallet's extension documentation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signer: any;
}

interface Signer {
  // Sign function
  sign?: (address: string, payload: string) => unknown;
}

interface Connector {
  enable: (dappName: string) => unknown;

  // The subscribe to accounts function
  subscribeAccounts: (callback: SubscriptionFn) => unknown;
}

interface WalletErrors {
  transformError: (err: WalletError) => Error;
}

// Provide web3* functions for consistency with existing Dapps using @polkadot/extension-dapp
interface Web3Funcs {
  web3Enable: (dappName: string) => unknown;
  web3Accounts: () => unknown;
  web3FromAddress: () => unknown;
  web3ListRpcProviders?: () => unknown;
  web3UseRpcProvider?: () => unknown;
}

export interface Wallet
  extends WalletData,
    WalletExtension,
    Connector,
    Signer,
    Web3Funcs,
    WalletErrors {}
