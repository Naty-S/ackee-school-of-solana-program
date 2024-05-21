use anchor_lang::prelude::*;

declare_id!("3kAVGR8RrGNnutMWiVYi2DVs12NuhKhtKGQpn1TPQy7V");

#[program]
pub mod anchor_project {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
