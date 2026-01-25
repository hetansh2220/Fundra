'use client';

import { useState, useCallback } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Program, AnchorProvider, BN } from '@coral-xyz/anchor';
import type { HopeRise } from '@/lib/idl/hope_rise';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import {
  idl,
  getCampaignCounterPDA,
  getCampaignPDA,
  getMilestonePDA,
  getContributionPDA,
  getCategoryEnum,
  getCategoryString,
  solToLamports,
  lamportsToSol,
  type Campaign,
  type Milestone,
  type Contribution,
} from '@/lib/solana/program';

export function useHopeRise() {
  const { publicKey, signTransaction, signAllTransactions, connected } = useWallet();
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const walletAddress = publicKey?.toBase58() || null;

  // Create program with wallet for write operations
  const getProgram = useCallback(async () => {
    if (!publicKey || !signTransaction) {
      throw new Error('Wallet not connected. Please connect your wallet and try again.');
    }

    const provider = new AnchorProvider(
      connection,
      {
        publicKey,
        signTransaction,
        signAllTransactions: signAllTransactions!,
      },
      { commitment: 'confirmed' }
    );

    return new Program<HopeRise>(idl as unknown as HopeRise, provider);
  }, [publicKey, signTransaction, signAllTransactions, connection]);

  // Read-only program for fetching data
  const getReadOnlyProgram = useCallback(() => {
    const provider = new AnchorProvider(
      connection,
      {
        publicKey: PublicKey.default,
        signTransaction: async (tx) => tx,
        signAllTransactions: async (txs) => txs,
      },
      { commitment: 'confirmed' }
    );
    return new Program<HopeRise>(idl as unknown as HopeRise, provider);
  }, [connection]);

  // Initialize campaign counter (one-time admin operation)
  const initialize = useCallback(async () => {
    if (!publicKey) throw new Error('Wallet not connected');
    setLoading(true);
    setError(null);

    try {
      const program = await getProgram();
      const [campaignCounterPda] = getCampaignCounterPDA();

      const tx = await program.methods
        .initialize()
        .accountsPartial({
          campaignCounter: campaignCounterPda,
          authority: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      return tx;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to initialize';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [publicKey, getProgram]);

  // Create a new campaign
  const createCampaign = useCallback(async (params: {
    title: string;
    shortDescription: string;
    category: string;
    coverImageUrl: string;
    storyUrl: string;
    fundingGoalSol: number;
    durationDays: number;
  }) => {
    if (!publicKey) throw new Error('Wallet not connected');
    setLoading(true);
    setError(null);

    try {
      const program = await getProgram();
      const [campaignCounterPda] = getCampaignCounterPDA();

      // Check if counter is initialized, if not initialize it first
      let counter;
      try {
        counter = await program.account.campaignCounter.fetch(campaignCounterPda);
      } catch {
        // Counter not initialized, initialize it first
        await program.methods
          .initialize()
          .accountsPartial({
            campaignCounter: campaignCounterPda,
            authority: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        // Fetch the counter after initialization
        counter = await program.account.campaignCounter.fetch(campaignCounterPda);
      }

      const [campaignPda] = getCampaignPDA(publicKey, counter.count);

      const tx = await program.methods
        .createCampaign(
          params.title,
          params.shortDescription,
          getCategoryEnum(params.category),
          params.coverImageUrl,
          params.storyUrl,
          solToLamports(params.fundingGoalSol),
          new BN(params.durationDays)
        )
        .accountsPartial({
          campaign: campaignPda,
          campaignCounter: campaignCounterPda,
          creator: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      
      return { tx, campaignPda };
      
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create campaign';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [publicKey, getProgram]);
  
  // Fund a campaign
  const fundCampaign = useCallback(async (
    campaignPubkey: PublicKey,
    amountSol: number
  ) => {
    if (!publicKey) throw new Error('Wallet not connected');
    setLoading(true);
    setError(null);

    try {
      const program = await getProgram();
      const [contributionPda] = getContributionPDA(campaignPubkey, publicKey);

      const tx = await program.methods
        .fundCampaign(solToLamports(amountSol))
        .accountsPartial({
          campaign: campaignPubkey,
          contribution: contributionPda,
          contributor: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      return tx;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fund campaign';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [publicKey, getProgram]);

  // Withdraw funds (creator only)
  const withdrawFunds = useCallback(async (campaignPubkey: PublicKey) => {
    if (!publicKey) throw new Error('Wallet not connected');
    setLoading(true);
    setError(null);

    try {
      const program = await getProgram();

      const tx = await program.methods
        .withdrawFunds()
        .accountsPartial({
          campaign: campaignPubkey,
          creator: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      return tx;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to withdraw funds';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [publicKey, getProgram]);

  // Add milestone to campaign
  const addMilestone = useCallback(async (
    campaignPubkey: PublicKey,
    milestoneIndex: number,
    title: string,
    targetAmountSol: number
  ) => {
    if (!publicKey) throw new Error('Wallet not connected');
    setLoading(true);
    setError(null);

    try {
      const program = await getProgram();
      const [milestonePda] = getMilestonePDA(campaignPubkey, milestoneIndex);

      const tx = await program.methods
        .addMilestone(title, solToLamports(targetAmountSol))
        .accountsPartial({
          campaign: campaignPubkey,
          milestone: milestonePda,
          creator: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      return tx;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to add milestone';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [publicKey, getProgram]);

  // Complete milestone
  const completeMilestone = useCallback(async (
    campaignPubkey: PublicKey,
    milestonePubkey: PublicKey
  ) => {
    if (!publicKey) throw new Error('Wallet not connected');
    setLoading(true);
    setError(null);

    try {
      const program = await getProgram();

      const tx = await program.methods
        .completeMilestone()
        .accountsPartial({
          campaign: campaignPubkey,
          milestone: milestonePubkey,
          creator: publicKey,
        })
        .rpc();

      return tx;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to complete milestone';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [publicKey, getProgram]);

  // Close campaign
  const closeCampaign = useCallback(async (campaignPubkey: PublicKey) => {
    if (!publicKey) throw new Error('Wallet not connected');
    setLoading(true);
    setError(null);

    try {
      const program = await getProgram();

      const tx = await program.methods
        .closeCampaign()
        .accountsPartial({
          campaign: campaignPubkey,
          creator: publicKey,
        })
        .rpc();

      return tx;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to close campaign';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [publicKey, getProgram]);

  // Claim refund
  const claimRefund = useCallback(async (campaignPubkey: PublicKey) => {
    if (!publicKey) throw new Error('Wallet not connected');
    setLoading(true);
    setError(null);

    try {
      const program = await getProgram();
      const [contributionPda] = getContributionPDA(campaignPubkey, publicKey);

      const tx = await program.methods
        .claimRefund()
        .accountsPartial({
          campaign: campaignPubkey,
          contribution: contributionPda,
          contributor: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      return tx;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to claim refund';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [publicKey, getProgram]);

  // Fetch all campaigns
  const fetchAllCampaigns = useCallback(async (): Promise<Campaign[]> => {
    try {
      const program = getReadOnlyProgram();
      const accounts = await program.account.campaign.all();

      return accounts.map((acc) => ({
        publicKey: acc.publicKey,
        campaignId: (acc.account.campaignId as BN).toNumber(),
        creator: acc.account.creator as PublicKey,
        title: acc.account.title as string,
        shortDescription: acc.account.shortDescription as string,
        category: getCategoryString(acc.account.category as Record<string, object>),
        coverImageUrl: acc.account.coverImageUrl as string,
        storyUrl: acc.account.storyUrl as string,
        fundingGoal: (acc.account.fundingGoal as BN).toNumber(),
        deadline: (acc.account.deadline as BN).toNumber(),
        amountRaised: (acc.account.amountRaised as BN).toNumber(),
        backerCount: (acc.account.backerCount as BN).toNumber(),
        isActive: acc.account.isActive as boolean,
        createdAt: (acc.account.createdAt as BN).toNumber(),
        milestoneCount: acc.account.milestoneCount as number,
        bump: acc.account.bump as number,
      }));
    } catch (err) {
      console.error('Failed to fetch campaigns:', err);
      return [];
    }
  }, [getReadOnlyProgram]);

  // Fetch single campaign
  const fetchCampaign = useCallback(async (pubkey: PublicKey): Promise<Campaign | null> => {
    try {
      const program = getReadOnlyProgram();
      const acc = await program.account.campaign.fetch(pubkey);

      return {
        publicKey: pubkey,
        campaignId: (acc.campaignId as BN).toNumber(),
        creator: acc.creator as PublicKey,
        title: acc.title as string,
        shortDescription: acc.shortDescription as string,
        category: getCategoryString(acc.category as Record<string, object>),
        coverImageUrl: acc.coverImageUrl as string,
        storyUrl: acc.storyUrl as string,
        fundingGoal: (acc.fundingGoal as BN).toNumber(),
        deadline: (acc.deadline as BN).toNumber(),
        amountRaised: (acc.amountRaised as BN).toNumber(),
        backerCount: (acc.backerCount as BN).toNumber(),
        isActive: acc.isActive as boolean,
        createdAt: (acc.createdAt as BN).toNumber(),
        milestoneCount: acc.milestoneCount as number,
        bump: acc.bump as number,
      };
    } catch (err) {
      console.error('Failed to fetch campaign:', err);
      return null;
    }
  }, [getReadOnlyProgram]);

  // Fetch milestones for a campaign
  const fetchMilestones = useCallback(async (campaignPubkey: PublicKey): Promise<Milestone[]> => {
    try {
      const program = getReadOnlyProgram();
      const accounts = await program.account.milestone.all([
        {
          memcmp: {
            offset: 8, // after discriminator
            bytes: campaignPubkey.toBase58(),
          },
        },
      ]);

      return accounts.map((acc) => ({
        publicKey: acc.publicKey,
        campaign: acc.account.campaign as PublicKey,
        milestoneIndex: acc.account.milestoneIndex as number,
        title: acc.account.title as string,
        targetAmount: (acc.account.targetAmount as BN).toNumber(),
        isCompleted: acc.account.isCompleted as boolean,
        bump: acc.account.bump as number,
      })).sort((a, b) => a.milestoneIndex - b.milestoneIndex);
    } catch (err) {
      console.error('Failed to fetch milestones:', err);
      return [];
    }
  }, [getReadOnlyProgram]);

  // Fetch contribution for a campaign and user
  const fetchContribution = useCallback(async (
    campaignPubkey: PublicKey,
    contributorPubkey: PublicKey
  ): Promise<Contribution | null> => {
    try {
      const program = getReadOnlyProgram();
      const [contributionPda] = getContributionPDA(campaignPubkey, contributorPubkey);
      const acc = await program.account.contribution.fetch(contributionPda);

      return {
        publicKey: contributionPda,
        campaign: acc.campaign as PublicKey,
        contributor: acc.contributor as PublicKey,
        amount: (acc.amount as BN).toNumber(),
        contributedAt: (acc.contributedAt as BN).toNumber(),
        refundClaimed: acc.refundClaimed as boolean,
        bump: acc.bump as number,
      };
    } catch {
      return null;
    }
  }, [getReadOnlyProgram]);

  // Check if campaign counter is initialized
  const isInitialized = useCallback(async (): Promise<boolean> => {
    try {
      const program = getReadOnlyProgram();
      const [campaignCounterPda] = getCampaignCounterPDA();
      await program.account.campaignCounter.fetch(campaignCounterPda);
      return true;
    } catch {
      return false;
    }
  }, [getReadOnlyProgram]);

  return {
    // State
    loading,
    error,
    connected,
    publicKey,
    walletAddress,

    // Write operations
    initialize,
    createCampaign,
    fundCampaign,
    withdrawFunds,
    addMilestone,
    completeMilestone,
    closeCampaign,
    claimRefund,

    // Read operations
    fetchAllCampaigns,
    fetchCampaign,
    fetchMilestones,
    fetchContribution,
    isInitialized,

    // Helpers
    lamportsToSol,
    solToLamports,
  };
}

export type { Campaign, Milestone, Contribution };
