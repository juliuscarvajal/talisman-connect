import { TalismanWallet } from './talisman-wallet';
import { PolkadotjsWallet } from './polkadotjs-wallet';
import { Wallet } from '..';

// Export wallets as well for one and done usage
export { TalismanWallet, PolkadotjsWallet };

// Add new wallets here
const supportedWallets = [new TalismanWallet(), new PolkadotjsWallet()];

export function getWallets(): Wallet[] {
  return supportedWallets;
}

export function getWalletBySource(
  source: string | unknown
): Wallet | undefined {
  return supportedWallets.find((wallet) => {
    return wallet.extensionName === source;
  });
}

export function isWalletInstalled(source: string | unknown): boolean {
  const wallet = getWalletBySource(source);
  return wallet?.installed as boolean;
}
