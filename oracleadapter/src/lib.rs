#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, Symbol, symbol_short};

// ===== Escala e parâmetros =====
pub const SCALE: i128 = 10_000_000;       // 1e7 => 1.00 == 10_000_000
pub const M_MIN: i128 = 8_500_000;        // 0.85
pub const M_MAX: i128 = 12_500_000;       // 1.25
pub const ALPHA_SCALED: i128 = 5_000_000; // 0.50 * SCALE
pub const RMAX: i128 = 1_500_000;         // 0.15
const ORACLE_TTL_SECS: u64 = 300;     // 5 minutos de staleness

mod keys {
    use super::*;
    pub const ORACLE_ADDR: Symbol = symbol_short!("oracle");
    pub const PRICE_SYM:   Symbol = symbol_short!("psym");
    pub const BASE_PRICE:  Symbol = symbol_short!("bprice"); // baseline da season (preço escalado)
}

pub fn clamp_i128(x: i128, lo: i128, hi: i128) -> i128 {
    if x < lo {
        lo
    } else if x > hi {
        hi
    } else {
        x
    }
}

fn now(env: &Env) -> u64 {
    env.ledger().timestamp()
}

#[contract]
pub struct OracleAdapter;

#[contractimpl]
impl OracleAdapter {
    pub fn init(env: Env, oracle_addr: Address, price_symbol: Symbol, base_price_scaled: i128) {
        // Para testes/mock, não exige require_auth
        env.storage().persistent().set(&keys::ORACLE_ADDR, &oracle_addr);
        env.storage().persistent().set(&keys::PRICE_SYM, &price_symbol);
        env.storage().persistent().set(&keys::BASE_PRICE, &base_price_scaled);
    }

    pub fn read_price(env: Env, asset: soroban_sdk::Map<soroban_sdk::Symbol, soroban_sdk::Val>) -> (i128, u64) {
        // Integração real com Reflector para XLM ou outro asset
        let oracle: Address = env.storage().persistent().get(&keys::ORACLE_ADDR).unwrap();
        let args = soroban_sdk::Vec::from_array(&env, [asset.clone().into()]);
        let res: Option<(i128, u64)> = env.invoke_contract(
            &oracle,
            &symbol_short!("lastprice"),
            args,
        );
        match res {
            Some((price, ts)) => (price, ts),
            None => (0, 0),
        }
    }

    pub fn calc_market_bonus(env: Env, asset: soroban_sdk::Map<soroban_sdk::Symbol, soroban_sdk::Val>) -> i128 {
        let (p_t, ts) = Self::read_price(env.clone(), asset.clone());
        let now_ts = now(&env);
        if now_ts.saturating_sub(ts) > ORACLE_TTL_SECS {
            return SCALE;
        }
        let p_base: i128 = env.storage().persistent().get(&keys::BASE_PRICE).unwrap();
        if p_base <= 0 {
            return SCALE;
        }
        let r_t_scaled = ((p_t - p_base) * SCALE) / p_base;
        let r_t_clamped = clamp_i128(r_t_scaled, -RMAX, RMAX);
        let value = SCALE + (ALPHA_SCALED * r_t_clamped) / SCALE;
        clamp_i128(value, M_MIN, M_MAX)
    }

    pub fn apply_bonus(env: Env, asset: soroban_sdk::Map<soroban_sdk::Symbol, soroban_sdk::Val>, base_payout: i128) -> i128 {
        let m_t = Self::calc_market_bonus(env, asset);
        (base_payout * m_t) / SCALE
    }

    pub fn get_params(env: Env) -> (Address, Symbol, i128) {
        let oracle: Address = env.storage().persistent().get(&keys::ORACLE_ADDR).unwrap();
        let symbol: Symbol  = env.storage().persistent().get(&keys::PRICE_SYM).unwrap();
        let base: i128      = env.storage().persistent().get(&keys::BASE_PRICE).unwrap();
        (oracle, symbol, base)
    }

    pub fn set_base_price(env: Env, new_base_scaled: i128) {
        env.storage().persistent().set(&keys::BASE_PRICE, &new_base_scaled);
    }
}

// Soroban tests devem ser feitos com o harness do SDK, não std. Veja docs Soroban para exemplos.
