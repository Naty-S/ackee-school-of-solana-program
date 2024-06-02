use anchor_lang::prelude::*;


declare_id!("3kAVGR8RrGNnutMWiVYi2DVs12NuhKhtKGQpn1TPQy7V");


#[program]
pub mod anchor_project {
  use super::*;

  pub fn get_key(ctx: Context<GetKey>, link: Pubkey) -> Result<()> {

    let key = &mut ctx.accounts.lucky_key;
  
    key.hunter = ctx.accounts.hunter.key();
    key.bump = ctx.bumps.lucky_key;
    key.link = link;
    key.used = false;
    key.portal = 0;

    Ok(())
  }

  pub fn use_key(ctx: Context<UseKey>, portal: u64) -> Result<()> {

    let key = &mut ctx.accounts.lucky_key;
    
    key.used = true;
    key.portal = portal;

    Ok(())
  }

  pub fn claim_treasure(ctx: Context<ClaimTreasure>) -> Result<()> {

    let key = &mut ctx.accounts.lucky_key;
    let treasure = &mut ctx.accounts.treasure;
  
    require!(key.used, Errors::NoKey);
    require!(key.portal > 0, Errors::NoPortal);
    // require!(key.hunter == ctx.accounts.hunter.key(), Errors::)

    treasure.hunter = ctx.accounts.hunter.key();
    treasure.key = key.key();
    treasure.bump = ctx.bumps.treasure;


    Ok(())
  }
}

#[derive(Accounts)]
#[instruction(link: Pubkey)]
pub struct GetKey<'info> {

  pub system_program: Program<'info, System>,

  #[account(mut)]
  pub hunter: Signer<'info>,

  #[account(
    init,
    payer = hunter,
    space = LuckyKey::SIZE,
    seeds = [link.key().as_ref(), "lucky_key".as_bytes(), hunter.key().as_ref()],
    bump
  )]
  pub lucky_key: Account<'info, LuckyKey>,
}

#[derive(Accounts)]
pub struct UseKey<'info> {

  pub system_program: Program<'info, System>,

  #[account(
    mut,
    seeds = [lucky_key.link.key().as_ref(), "lucky_key".as_bytes(), lucky_key.hunter.key().as_ref()],
    bump = lucky_key.bump
  )]
  pub lucky_key: Account<'info, LuckyKey>,
}

#[derive(Accounts)]
pub struct ClaimTreasure<'info> {

  pub system_program: Program<'info, System>,

  #[account(mut)]
  pub hunter: Signer<'info>,

  #[account(
    init,
    payer = hunter,
    space = Treasure::SIZE,
    seeds = ["treasure".as_bytes(), hunter.key().as_ref(), lucky_key.key().as_ref()],
    bump
  )]
  pub treasure: Account<'info, Treasure>,

  #[account(
    mut,
    seeds = [lucky_key.link.key().as_ref(), "lucky_key".as_bytes(), lucky_key.hunter.key().as_ref()],
    bump = lucky_key.bump
  )]
  pub lucky_key: Account<'info, LuckyKey>,
}

#[account]
pub struct LuckyKey {
  pub link: Pubkey,
  pub hunter: Pubkey,
  pub used: bool,
  pub portal: u64,
  pub bump: u8
}

impl LuckyKey {
  pub const SIZE: usize = 8 + 32 + 32 + 1 + 8 + 1;
}

#[account]
pub struct Treasure {
  pub hunter: Pubkey,
  pub key: Pubkey,
  pub bump: u8
}

impl Treasure {
  pub const SIZE: usize = 8 + 32 + 32 + 1;
}

#[error_code]
pub enum Errors {
  #[msg("Cannot claim treasure without Key")]
  NoKey,
  #[msg("Cannot claim treasure without going trouhg a Portal")]
  NoPortal,
}
