
#![no_std]
use soroban_sdk::{contract, contractimpl, Env, symbol_short, Vec, String};

#[contract]
pub struct BadgeNFT;

#[contractimpl]
impl BadgeNFT {
    // Armazena badges como Vec<(id, user, kind, seed)>
    pub fn mint_badge(env: Env, user: String, kind: String, seed: String) -> u32 {
    let next_badge_id: u32 = env.storage().persistent().get(&symbol_short!("next_id")).unwrap_or(1);
        let mut badges: Vec<(u32, String, String, String)> = env.storage().persistent().get(&symbol_short!("badges")).unwrap_or(Vec::new(&env));
        badges.push_back((next_badge_id, user.clone(), kind.clone(), seed.clone()));
        env.storage().persistent().set(&symbol_short!("badges"), &badges);
        env.storage().persistent().set(&symbol_short!("next_id"), &(next_badge_id + 1));
        next_badge_id
    }

    pub fn list_badges(env: Env, user: String) -> Vec<(u32, String, String, String)> {
        let badges: Vec<(u32, String, String, String)> = env.storage().persistent().get(&symbol_short!("badges")).unwrap_or(Vec::new(&env));
        let mut user_badges = Vec::new(&env);
        for (id, badge_user, kind, seed) in badges.iter() {
            if badge_user == user {
                user_badges.push_back((id, badge_user.clone(), kind.clone(), seed.clone()));
            }
        }
        user_badges
    }
}


// Soroban tests devem ser feitos com o harness do SDK, não std. Veja docs Soroban para exemplos.
