//! CLI demo para KALE Syndicate MVP
use badgenft::{BadgeNFT};
use oracleadapter::{clamp_i128, SCALE, ALPHA_SCALED, RMAX, M_MIN, M_MAX};
use syndicatemanager::{SyndicateManager};

fn main() {
    println!("--- KALE Syndicate Demo ---");

    // 1. Criar SyndicateManager e BadgeNFT
    let mut manager = SyndicateManager::new();
    // BadgeNFT agora é contrato Soroban, use chamadas diretas:

    // 2. Criar guilda e entrar nela
    let guild_id = manager.register_guild("VeggieDAO", "alice");
    manager.join_guild(guild_id, "bob");
    println!("Guildas registradas: {:?}", manager.list_guilds());
    println!("Membros da guilda {}: {:?}", guild_id, manager.list_members(guild_id));

    // 3. Simular harvest e aplicar market bonus (mock)
    let base_payout: i128 = 1_000_000_000; // Exemplo: 100 tokens escalados
    let p_base: i128 = 10_000_000; // 1.00
    let p_t: i128 = 11_000_000;    // 1.10 (+10%)
    let r_t_scaled = ((p_t - p_base) * SCALE) / p_base;
    let r_t_clamped = clamp_i128(r_t_scaled, -RMAX, RMAX);
    let value = SCALE + (ALPHA_SCALED * r_t_clamped) / SCALE;
    let m_t = clamp_i128(value, M_MIN, M_MAX);
    let payout_final = (base_payout * m_t) / SCALE;
    println!("Harvest: base_payout = {}, market_bonus = {}, payout_final = {}", base_payout, m_t, payout_final);

    // 4. Mintar badge NFT para alice
    // Exemplo de chamada Soroban:
    // let badge_id = BadgeNFT::mint_badge(env, "alice".into(), "raridade".into(), "seed123".into());
    // println!("Badges de alice: {:?}", BadgeNFT::list_badges(env, "alice".into()));

    // 5. Exibir eventos (já impressos nos métodos)
    println!("--- Fim da demo ---");
}

#[cfg(test)]
mod integration_tests {
    // ...existing code...
    use syndicatemanager::SyndicateManager;
    use badgenft::BadgeNFT;
    use oracleadapter::{clamp_i128, SCALE, ALPHA_SCALED, RMAX, M_MIN, M_MAX};

    #[test]
    fn test_mvp_flow() {
        // Instanciar contratos
        let mut manager = SyndicateManager::new();
    // BadgeNFT agora é contrato Soroban, use chamadas diretas:

        // Criar guilda e membros
        let guild_id = manager.register_guild("VeggieDAO", "alice");
        assert!(manager.join_guild(guild_id, "bob"));
        let members = manager.list_members(guild_id).unwrap();
        let members_str: Vec<&str> = members.iter().map(|s| s.as_str()).collect();
        assert_eq!(members_str, vec!["alice", "bob"]);

        // Simular harvest e bônus
        let base_payout: i128 = 1_000_000_000;
        let p_base: i128 = 10_000_000;
        let p_t: i128 = 11_000_000;
        let r_t_scaled = ((p_t - p_base) * SCALE) / p_base;
        let r_t_clamped = clamp_i128(r_t_scaled, -RMAX, RMAX);
        let value = SCALE + (ALPHA_SCALED * r_t_clamped) / SCALE;
        let m_t = clamp_i128(value, M_MIN, M_MAX);
        let payout_final = (base_payout * m_t) / SCALE;
        assert_eq!(m_t, 10_500_000); // Esperado: 1.05 * SCALE
        assert_eq!(payout_final, 1_050_000_000);

        // Mintar badge
    // let badge_id = BadgeNFT::mint_badge(env, "alice".into(), "raridade".into(), "seed123".into());
    // let badges = BadgeNFT::list_badges(env, "alice".into());
    // assert_eq!(badges.len(), 1);
    // assert_eq!(badges[0].0, badge_id);
    // assert_eq!(badges[0].1, "alice");
    // assert_eq!(badges[0].2, "raridade");
    // assert_eq!(badges[0].3, "seed123");
    }
}
