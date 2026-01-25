use anchor_lang::prelude::*;

/// Campaign category enum matching frontend categories
#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq, Debug)]
pub enum Category {
    Environment,
    Education,
    Healthcare,
    Technology,
    Community,
    Arts,
}

/// Global campaign counter for generating unique campaign IDs
#[account]
pub struct CampaignCounter {
    /// Total number of campaigns created
    pub count: u64,
    /// Authority that initialized the program
    pub authority: Pubkey,
    /// PDA bump
    pub bump: u8,
}

impl CampaignCounter {
    pub const SIZE: usize = 8 + // discriminator
        8 +  // count
        32 + // authority
        1;   // bump
}

/// Main campaign account storing all campaign data
#[account]
pub struct Campaign {
    /// Unique campaign identifier
    pub campaign_id: u64,
    /// Campaign creator's wallet address
    pub creator: Pubkey,
    /// Campaign title (max 80 characters)
    pub title: String,
    /// Short description (max 200 characters)
    pub short_description: String,
    /// Campaign category
    pub category: Category,
    /// IPFS hash for cover image
    pub cover_image_url: String,
    /// IPFS hash for long story content
    pub story_url: String,
    /// Target funding goal in lamports
    pub funding_goal: u64,
    /// Campaign deadline (Unix timestamp)
    pub deadline: i64,
    /// Total amount raised in lamports
    pub amount_raised: u64,
    /// Number of unique backers
    pub backer_count: u64,
    /// Whether campaign is active
    pub is_active: bool,
    /// Creation timestamp
    pub created_at: i64,
    /// Number of milestones added
    pub milestone_count: u8,
    /// PDA bump
    pub bump: u8,
}

impl Campaign {
    // Account size calculation:
    // 8 (discriminator) + 8 (campaign_id) + 32 (creator) +
    // (4 + 80) (title) + (4 + 200) (short_description) + 1 (category) +
    // (4 + 200) (cover_image_url) + (4 + 200) (story_url) +
    // 8 (funding_goal) + 8 (deadline) + 8 (amount_raised) + 8 (backer_count) +
    // 1 (is_active) + 8 (created_at) + 1 (milestone_count) + 1 (bump)
    // = 8 + 8 + 32 + 84 + 204 + 1 + 204 + 204 + 8 + 8 + 8 + 8 + 1 + 8 + 1 + 1 = 788
    pub const SIZE: usize = 800; // Rounded up for safety
}

/// Milestone account linked to a campaign
#[account]
pub struct Milestone {
    /// Reference to parent campaign
    pub campaign: Pubkey,
    /// Milestone index (0-based)
    pub milestone_index: u8,
    /// Milestone title (max 100 characters)
    pub title: String,
    /// Target amount for this milestone (in lamports)
    pub target_amount: u64,
    /// Whether milestone is completed
    pub is_completed: bool,
    /// PDA bump
    pub bump: u8,
}

impl Milestone {
    // 8 (discriminator) + 32 (campaign) + 1 (index) + (4 + 100) (title) +
    // 8 (target_amount) + 1 (is_completed) + 1 (bump) = 155
    pub const SIZE: usize = 160; // Rounded up
}

/// Contribution account tracking individual backer contributions
#[account]
pub struct Contribution {
    /// Reference to campaign
    pub campaign: Pubkey,
    /// Contributor's wallet address
    pub contributor: Pubkey,
    /// Total amount contributed (in lamports)
    pub amount: u64,
    /// Timestamp of first contribution
    pub contributed_at: i64,
    /// Whether refund has been claimed
    pub refund_claimed: bool,
    /// PDA bump
    pub bump: u8,
}

impl Contribution {
    // 8 (discriminator) + 32 (campaign) + 32 (contributor) + 8 (amount) +
    // 8 (contributed_at) + 1 (refund_claimed) + 1 (bump) = 90
    pub const SIZE: usize = 96; // Rounded up
}
