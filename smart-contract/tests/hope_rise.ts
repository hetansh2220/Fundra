import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { HopeRise } from "../target/types/hope_rise";
import { expect } from "chai";
import { PublicKey, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";

describe("hope_rise", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.HopeRise as Program<HopeRise>;

  // Test accounts
  const creator = Keypair.generate();
  const contributor = Keypair.generate();

  // PDAs
  let campaignCounterPda: PublicKey;
  let campaignPda: PublicKey;
  let contributionPda: PublicKey;
  let milestonePda: PublicKey;

  // Campaign data
  const campaignTitle = "Test Campaign";
  const shortDescription = "A test campaign for unit testing";
  const coverImageUrl = "ipfs://QmTest123";
  const storyUrl = "ipfs://QmStory456";
  const fundingGoal = new anchor.BN(1 * LAMPORTS_PER_SOL); // 1 SOL
  const durationDays = new anchor.BN(30);

  before(async () => {
    // Airdrop SOL to test accounts
    const airdropCreator = await provider.connection.requestAirdrop(
      creator.publicKey,
      10 * LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(airdropCreator);

    const airdropContributor = await provider.connection.requestAirdrop(
      contributor.publicKey,
      10 * LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(airdropContributor);

    // Derive campaign counter PDA
    [campaignCounterPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("campaign_counter")],
      program.programId
    );
  });

  it("Initializes the campaign counter", async () => {
    await program.methods
      .initialize()
      .accounts({
        campaignCounter: campaignCounterPda,
        authority: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const counter = await program.account.campaignCounter.fetch(campaignCounterPda);
    expect(counter.count.toNumber()).to.equal(0);
  });

  it("Creates a campaign", async () => {
    // Get current counter to derive campaign PDA
    const counter = await program.account.campaignCounter.fetch(campaignCounterPda);

    [campaignPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("campaign"),
        creator.publicKey.toBuffer(),
        counter.count.toArrayLike(Buffer, "le", 8),
      ],
      program.programId
    );

    await program.methods
      .createCampaign(
        campaignTitle,
        shortDescription,
        { environment: {} }, // Category enum
        coverImageUrl,
        storyUrl,
        fundingGoal,
        durationDays
      )
      .accounts({
        campaign: campaignPda,
        campaignCounter: campaignCounterPda,
        creator: creator.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([creator])
      .rpc();

    const campaign = await program.account.campaign.fetch(campaignPda);
    expect(campaign.title).to.equal(campaignTitle);
    expect(campaign.shortDescription).to.equal(shortDescription);
    expect(campaign.fundingGoal.toNumber()).to.equal(fundingGoal.toNumber());
    expect(campaign.isActive).to.be.true;
    expect(campaign.amountRaised.toNumber()).to.equal(0);
    expect(campaign.backerCount.toNumber()).to.equal(0);
  });

  it("Adds a milestone to the campaign", async () => {
    const campaign = await program.account.campaign.fetch(campaignPda);

    [milestonePda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("milestone"),
        campaignPda.toBuffer(),
        Buffer.from([campaign.milestoneCount]),
      ],
      program.programId
    );

    await program.methods
      .addMilestone("First Milestone", new anchor.BN(0.5 * LAMPORTS_PER_SOL))
      .accounts({
        campaign: campaignPda,
        milestone: milestonePda,
        creator: creator.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([creator])
      .rpc();

    const milestone = await program.account.milestone.fetch(milestonePda);
    expect(milestone.title).to.equal("First Milestone");
    expect(milestone.isCompleted).to.be.false;
  });

  it("Funds a campaign", async () => {
    [contributionPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("contribution"),
        campaignPda.toBuffer(),
        contributor.publicKey.toBuffer(),
      ],
      program.programId
    );

    const fundAmount = new anchor.BN(0.5 * LAMPORTS_PER_SOL);

    await program.methods
      .fundCampaign(fundAmount)
      .accounts({
        campaign: campaignPda,
        contribution: contributionPda,
        contributor: contributor.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([contributor])
      .rpc();

    const campaign = await program.account.campaign.fetch(campaignPda);
    expect(campaign.amountRaised.toNumber()).to.equal(fundAmount.toNumber());
    expect(campaign.backerCount.toNumber()).to.equal(1);

    const contribution = await program.account.contribution.fetch(contributionPda);
    expect(contribution.amount.toNumber()).to.equal(fundAmount.toNumber());
  });

  it("Completes a milestone when target is reached", async () => {
    // Fund more to reach milestone target
    const additionalFund = new anchor.BN(0.5 * LAMPORTS_PER_SOL);

    await program.methods
      .fundCampaign(additionalFund)
      .accounts({
        campaign: campaignPda,
        contribution: contributionPda,
        contributor: contributor.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([contributor])
      .rpc();

    // Now complete the milestone
    await program.methods
      .completeMilestone()
      .accounts({
        campaign: campaignPda,
        milestone: milestonePda,
        creator: creator.publicKey,
      })
      .signers([creator])
      .rpc();

    const milestone = await program.account.milestone.fetch(milestonePda);
    expect(milestone.isCompleted).to.be.true;
  });

  it("Allows creator to withdraw when goal is met", async () => {
    const creatorBalanceBefore = await provider.connection.getBalance(creator.publicKey);

    await program.methods
      .withdrawFunds()
      .accounts({
        campaign: campaignPda,
        creator: creator.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([creator])
      .rpc();

    const creatorBalanceAfter = await provider.connection.getBalance(creator.publicKey);
    expect(creatorBalanceAfter).to.be.greaterThan(creatorBalanceBefore);
  });

  it("Closes a campaign", async () => {
    await program.methods
      .closeCampaign()
      .accounts({
        campaign: campaignPda,
        creator: creator.publicKey,
      })
      .signers([creator])
      .rpc();

    const campaign = await program.account.campaign.fetch(campaignPda);
    expect(campaign.isActive).to.be.false;
  });
});

describe("hope_rise - refund flow", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.HopeRise as Program<HopeRise>;

  const creator2 = Keypair.generate();
  const contributor2 = Keypair.generate();

  let campaignCounterPda: PublicKey;
  let campaign2Pda: PublicKey;
  let contribution2Pda: PublicKey;

  before(async () => {
    // Airdrop SOL
    const airdropCreator = await provider.connection.requestAirdrop(
      creator2.publicKey,
      10 * LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(airdropCreator);

    const airdropContributor = await provider.connection.requestAirdrop(
      contributor2.publicKey,
      10 * LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(airdropContributor);

    [campaignCounterPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("campaign_counter")],
      program.programId
    );
  });

  it("Creates a campaign with high goal", async () => {
    const counter = await program.account.campaignCounter.fetch(campaignCounterPda);

    [campaign2Pda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("campaign"),
        creator2.publicKey.toBuffer(),
        counter.count.toArrayLike(Buffer, "le", 8),
      ],
      program.programId
    );

    await program.methods
      .createCampaign(
        "High Goal Campaign",
        "This campaign has a very high goal",
        { technology: {} },
        "ipfs://test",
        "ipfs://story",
        new anchor.BN(100 * LAMPORTS_PER_SOL), // 100 SOL - high goal
        new anchor.BN(1) // 1 day duration
      )
      .accounts({
        campaign: campaign2Pda,
        campaignCounter: campaignCounterPda,
        creator: creator2.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([creator2])
      .rpc();
  });

  it("Funds the campaign (but not enough to meet goal)", async () => {
    [contribution2Pda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("contribution"),
        campaign2Pda.toBuffer(),
        contributor2.publicKey.toBuffer(),
      ],
      program.programId
    );

    await program.methods
      .fundCampaign(new anchor.BN(1 * LAMPORTS_PER_SOL))
      .accounts({
        campaign: campaign2Pda,
        contribution: contribution2Pda,
        contributor: contributor2.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([contributor2])
      .rpc();
  });

  it("Creator closes campaign (goal not met)", async () => {
    await program.methods
      .closeCampaign()
      .accounts({
        campaign: campaign2Pda,
        creator: creator2.publicKey,
      })
      .signers([creator2])
      .rpc();
  });

  it("Contributor claims refund", async () => {
    const contributorBalanceBefore = await provider.connection.getBalance(contributor2.publicKey);

    await program.methods
      .claimRefund()
      .accounts({
        campaign: campaign2Pda,
        contribution: contribution2Pda,
        contributor: contributor2.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([contributor2])
      .rpc();

    const contributorBalanceAfter = await provider.connection.getBalance(contributor2.publicKey);
    expect(contributorBalanceAfter).to.be.greaterThan(contributorBalanceBefore);

    const contribution = await program.account.contribution.fetch(contribution2Pda);
    expect(contribution.refundClaimed).to.be.true;
  });
});
