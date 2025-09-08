#![no_std]
use soroban_sdk::{contract, contractimpl, Env, symbol_short, Vec, String};

#[contract]
pub struct SyndicateManager;

#[contractimpl]
impl SyndicateManager {
    // Armazena guildas como Vec<(id, name, owner, Vec<String>)>
    pub fn register_guild(env: Env, name: String, owner: String) -> u32 {
        let next_guild_id: u32 = env.storage().persistent().get(&symbol_short!("next_id")).unwrap_or(1);
        let mut guilds: Vec<(u32, String, String, Vec<String>)> = env.storage().persistent().get(&symbol_short!("guilds")).unwrap_or(Vec::new(&env));
        let mut members = Vec::new(&env);
        members.push_back(owner.clone());
        guilds.push_back((next_guild_id, name.clone(), owner.clone(), members));
        env.storage().persistent().set(&symbol_short!("guilds"), &guilds);
        env.storage().persistent().set(&symbol_short!("next_id"), &(next_guild_id + 1));
        next_guild_id
    }

    pub fn join_guild(env: Env, guild_id: u32, user: String) -> bool {
        let mut guilds: Vec<(u32, String, String, Vec<String>)> = env.storage().persistent().get(&symbol_short!("guilds")).unwrap_or(Vec::new(&env));
        for i in 0..guilds.len() {
            let (id, _name, _owner, mut members) = guilds.get(i).unwrap();
            if id == guild_id {
                if !members.contains(&user) {
                    members.push_back(user.clone());
                    guilds.set(i, (id, _name.clone(), _owner.clone(), members));
                    env.storage().persistent().set(&symbol_short!("guilds"), &guilds);
                    return true;
                }
            }
        }
        false
    }

    pub fn list_guilds(env: Env) -> Vec<(u32, String, String, Vec<String>)> {
        env.storage().persistent().get(&symbol_short!("guilds")).unwrap_or(Vec::new(&env))
    }

    pub fn list_members(env: Env, guild_id: u32) -> Vec<String> {
        let guilds: Vec<(u32, String, String, Vec<String>)> = env.storage().persistent().get(&symbol_short!("guilds")).unwrap_or(Vec::new(&env));
        for (id, _name, _owner, members) in guilds.iter() {
            if id == guild_id {
                return members.clone();
            }
        }
        Vec::new(&env)
    }
}

// Soroban tests devem ser feitos com o harness do SDK, não std. Veja docs Soroban para exemplos.
