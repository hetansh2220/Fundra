import { Program, AnchorProvider, Idl, BN } from '@coral-xyz/anchor';
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';
import idl from '@/lib/idl/hope_rise.json';

// Program ID from the deployed contract
export const PROGRAM_ID = new PublicKey('8zeHBfNfVkHQcWpJH9HRnR8NoEfrW6zSGqmZvBMWeCkd');

// Connection to Solana devnet
export const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// PDA Seeds
export const CAMPAIGN_COUNTER_SEED = 'campaign_counter';
export const CAMPAIGN_SEED = 'campaign';
export const MILESTONE_SEED = 'milestone';
export const CONTRIBUTION_SEED = 'contribution';

// Category enum mapping
export const CategoryEnum = {
  environment: { environment: {} },
  education: { education: {} },
  healthcare: { healthcare: {} },
  technology: { technology: {} },
  community: { community: {} },
  arts: { arts: {} },
} as const;

export type CategoryKey = keyof typeof CategoryEnum;

// Helper to convert category string to enum
export function getCategoryEnum(category: string) {
  const key = category.toLowerCase() as CategoryKey;
  return CategoryEnum[key] || CategoryEnum.community;
}

// Helper to convert category enum to string
export function getCategoryString(category: Record<string, object>): string {
  const key = Object.keys(category)[0];
  return key.charAt(0).toUpperCase() + key.slice(1);
}

// PDA derivation helpers
export function getCampaignCounterPDA(): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(CAMPAIGN_COUNTER_SEED)],
    PROGRAM_ID
  );
}

export function getCampaignPDA(creator: PublicKey, campaignId: BN | number): [PublicKey, number] {
  const id = typeof campaignId === 'number' ? new BN(campaignId) : campaignId;
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(CAMPAIGN_SEED),
      creator.toBuffer(),
      id.toArrayLike(Buffer, 'le', 8),
    ],
    PROGRAM_ID
  );
}

export function getMilestonePDA(campaignPubkey: PublicKey, milestoneIndex: number): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(MILESTONE_SEED),
      campaignPubkey.toBuffer(),
      Buffer.from([milestoneIndex]),
    ],
    PROGRAM_ID
  );
}

export function getContributionPDA(campaignPubkey: PublicKey, contributor: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(CONTRIBUTION_SEED),
      campaignPubkey.toBuffer(),
      contributor.toBuffer(),
    ],
    PROGRAM_ID
  );
}

// Helper to convert lamports to SOL
export function lamportsToSol(lamports: number | BN): number {
  const value = typeof lamports === 'number' ? lamports : lamports.toNumber();
  return value / LAMPORTS_PER_SOL;
}

// Helper to convert SOL to lamports
export function solToLamports(sol: number): BN {
  return new BN(Math.floor(sol * LAMPORTS_PER_SOL));
}

// Campaign type for frontend
export interface Campaign {
  publicKey: PublicKey;
  campaignId: number;
  creator: PublicKey;
  title: string;
  shortDescription: string;
  category: string;
  coverImageUrl: string;
  storyUrl: string;
  fundingGoal: number; // in lamports
  deadline: number; // unix timestamp
  amountRaised: number; // in lamports
  backerCount: number;
  isActive: boolean;
  createdAt: number; // unix timestamp
  milestoneCount: number;
  bump: number;
}

// Milestone type for frontend
export interface Milestone {
  publicKey: PublicKey;
  campaign: PublicKey;
  milestoneIndex: number;
  title: string;
  targetAmount: number; // in lamports
  isCompleted: boolean;
  bump: number;
}

// Contribution type for frontend
export interface Contribution {
  publicKey: PublicKey;
  campaign: PublicKey;
  contributor: PublicKey;
  amount: number; // in lamports
  contributedAt: number; // unix timestamp
  refundClaimed: boolean;
  bump: number;
}

// Get program instance (without wallet - for read-only operations)
export function getReadOnlyProgram(): Program {
  const provider = new AnchorProvider(
    connection,
    {
      publicKey: PublicKey.default,
      signTransaction: async (tx) => tx,
      signAllTransactions: async (txs) => txs,
    },
    { commitment: 'confirmed' }
  );
  return new Program(idl as Idl, provider);
}

// Export IDL for use in components
export { idl };
