# KALE Syndicate

> **A social, gamified, and memetic layer on top of KALE farming on Stellar.**
>
> The Syndicate adds *seasons*, *guilds*, *badges/NFTs*, and dynamic bonuses guided by an oracle (Reflector), without changing the rules of the base KALE contract.

---

## Table of Contents

* [Overview](#overview)
* [Motivation](#motivation)
* [How It Works (high level)](#how-it-works-high-level)
* [Game Design](#game-design)
  * [Game Loops](#game-loops)
  * [Seasons](#seasons)
  * [Guilds (Syndicates)](#guilds-syndicates)
  * [Proof‑of‑Teamwork 2.0](#proof-of-teamwork-20)
  * [Badges & NFTs (Generative Art)](#badges--nfts-generative-art)
* [Economy & Incentives](#economy--incentives)
  * [Relation to Base KALE](#relation-to-base-kale)
  * [Market Bonus (Reflector)](#market-bonus-reflector)
  * [Team Bonus (Teamwork)](#team-bonus-teamwork)
  * [Sinks & Burns](#sinks--burns)
  * [Anti‑Whale & Fairness](#antiwhale--fairness)
* [Architecture](#architecture)
  * [On‑chain Contracts](#onchain-contracts)
  * [Off‑chain Services (optional)](#offchain-services-optional)
  * [Data Flow](#data-flow)
  * [Addresses & Configuration](#addresses--configuration)
* [System Parameters](#system-parameters)
* [APIs/ABIs (Soroban)](#apisabis-soroban)
  * [SyndicateManager](#syndicatemanager)
  * [OracleAdapter](#oracleadapter)
  * [BadgeNFT](#badgenft)
  * [Embedded Events](#embedded-events)
  * [View Helpers](#view-helpers)
* [Security](#security)
* [Development Quickstart](#development-quickstart)
* [Demo](#demo)
* [Tests](#tests)
* [Operation & Observability](#operation--observability)
* [Roadmap](#roadmap)
* [FAQ](#faq)
* [Contributing](#contributing)
* [License](#license)
* [Notices](#notices)
* [Base Projects & Resources](#base-projects--resources)

---

## Overview

**KALE Syndicate** is a meta-layer that transforms classic KALE farming (*plant → work → harvest*) into a **social metagame**. We introduce:

* **Seasons** (~30-day themed challenges and rewards)
* **Guilds (Syndicates)** and leaderboards for collaborative competition
* **Proof‑of‑Teamwork 2.0** for synchronized harvest bonuses per block
* **Badges & NFTs** with generative art (on-chain kaleidoscopes) for rare achievements
* **Oracle-guided bonuses (Reflector)**: season multipliers based on price/FX signals (spot or TWAP), with on-chain proof of the event that adjusted difficulty/incentive

> **Core principle**: we do not touch the KALE contract. Everything is attached externally, composing states and payouts via auxiliary contracts.

---

## Motivation

* **Elevate** fun farming into a **competitive social game** with cultural and memetic identity.
* **Encourage coordination** (guilds) and **synchronization** (Teamwork 2.0) on top of a simple primitive.
* **Introduce real-world variables** (prices, FX) via Reflector for dynamic seasons, without losing verifiability.
* **Create sinks/burns** and cosmetic utilities to sustain the economy without diluting the core token.

---

## How It Works (high level)

1. **Base KALE** continues to issue rewards per block according to stake, hash zeros, and time gap (original rules).
2. **SyndicateManager** reads states/rewards and applies **multipliers**: (a) *Market Bonus* from Reflector and (b) *Teamwork Bonus* if X members of the same guild harvest in the same block/interval.
3. **BadgeNFT** mints generative art for rare achievements (e.g., ≥7 hash zeros, perfect sync, season streaks).
4. **OracleAdapter** isolates the interface with Reflector addresses (SEP‑40), allowing feed swaps without touching logic.
5. **EventKeeper** (off-chain, optional) reacts to Reflector subscriptions (webhooks) and submits adjustment/rollover transactions with timelock + multisig (on-chain proof).

---

## Game Design

### Game Loops

* **Core loop**: plant → work → harvest (base KALE)
* **Seasonal loop**: complete season missions, collect badges, climb individual and guild leaderboards
* **Social loop**: coordinate synchronized harvests (Teamwork 2.0), vote for guild, plan challenges

### Seasons

* Suggested duration: **30 days**
* Each season defines a **price baseline** (e.g., initial 24h average), **missions**, **memetic themes**, and **cosmetic rewards**
* **Reset** of leaderboards and season-specific counters

### Guilds (Syndicates)

* On-chain registration with **owner**, **members**, **internal rules**
* **Reputation** per season (guild points) and optional **reward pools**
* *Hooks* for **Shared Rewards** (part of the bonus can go to the guild vault)

### Proof‑of‑Teamwork 2.0

* If **K** or more members of the same guild **harvest in the same block/interval Δ**, a **Teamwork Bonus** is applied
* **Perfect sync** (e.g., Δ ≤ 1 ledger) mints a rare badge
* Anti-whale: smooth saturation in marginal gain per additional member

### Badges & NFTs (Generative Art)

* **Deterministic seed**: `seed = keccak256(harvest_hash || season_id || oracle_price_scaled || guild_id)`
* Visual parameters (colors, symmetry, frequency) mapped from the *seed* to generate **unique kaleidoscopes**
* NFTs **non-transferable** (SBT) for achievements, and **transferable** for season collectibles

---

## Economy & Incentives

### Relation to Base KALE

* **Immutable**: we do not change base KALE emission/engine
* The Syndicate only **modulates** payouts with extra multipliers **outside** the main contract and creates **cosmetic rewards**

### Market Bonus (Reflector)

* We read **spot/TWAP** (e.g., XLM/USD) from authorized oracles
* Define relative return $r_t = (P_t - P_{base})/P_{base}$ and apply:

```
M_t = clamp( 1.00 + α * clip(r_t, -Rmax, Rmax) - β * Vol_t,  Mmin, Mmax )
```

* **Scaled integers** (e.g., 1e7) to avoid floats
* $Vol_t$ can be the mean of |r| in short windows (simple volatility proxy)

### Team Bonus (Teamwork)

* If **N_g ≥ K** members harvest together: `B_team = 1 + γ * min(N_g, Nmax)`
* `payout_final = payout_base * M_t * B_team` (with caps and saturation)

### Sinks & Burns

* **Seasonal skins/collectibles** (KALE burn to mint)
* **Tickets** for special challenges/raffles
* **Guild naming/branding** with burned fee

### Anti‑Whale & Fairness

* **Saturation** in bonuses by guild size
* **Missions** that value skill (e.g., high zeros, sync) more than pure stake
* **Caps** per account/guild for specific benefits

---

## Architecture

### On‑chain Contracts

* **SyndicateManager**
  * Guild, season, leaderboard registry
  * Calculation/application of `M_t` and `B_team`
  * Event emission and hooks for badge minting
* **OracleAdapter**
  * Reads price/FX from authorized addresses (Reflector, SEP‑40)
  * Scale and timestamp normalization
* **BadgeNFT**
  * NFT minting (SBT and transferable) with generative art from seed

> Separate contracts allow **oracle updates** and **NFT evolution** without touching the season engine

### Off‑chain Services (optional)

* **EventKeeper**: consumes Reflector subscriptions (webhooks) and sends parameter adjustment transactions with **timelock + multisig**
* **Indexer/Leaderboard**: aggregates events for front-end and analytics
* **Guild bots**: automation for coordinated harvests and window alerts

### Data Flow

1. Base KALE closes a block and defines `payout_base` per farmer
2. SyndicateManager queries OracleAdapter → reads `P_t`/`TWAP`
3. Calculates `M_t`, checks `Teamwork` (block Δ, N_guild) and applies `B_team`
4. Emits events
   * `SeasonBonusApplied(farmer, M_t, B_team, payout_final)`
   * `TeamworkAchieved(guild_id, block, N_g)`
   * `BadgeMinted(farmer, badge_id)`

### Addresses & Configuration

* `KALE_CONTRACT_ADDR` – base KALE contract (testnet/mainnet)
* `REFLECTOR_ORACLE_ADDR` – authorized oracle contract (SEP‑40)
* `PRICE_SYMBOL` – e.g., `XLM_USD`
* `SYNDICATE_MANAGER_ADDR`, `BADGE_NFT_ADDR` – meta-layer addresses

---

## System Parameters

| Parameter    | Description                                 | Initial Value (suggested) |
| ------------ | ------------------------------------------- | ------------------------- |
| `α`          | Market Bonus sensitivity to return           | `0.50`                    |
| `β`          | Volatility penalty                          | `0.10`                    |
| `Rmax`       | Max relative variation considered           | `±0.15` (±15%)            |
| `Mmin/Mmax`  | Multiplier caps                             | `0.85` / `1.25`           |
| `K`          | Min members per block for Teamwork          | `3`                       |
| `Nmax`       | Bonus saturation by team size               | `10`                      |
| `Δ`          | Sync window per block                       | `1–2 ledgers`             |
| `TTL_oracle` | Max accepted staleness time                 | `5 min`                   |

> All values are adjustable by governance (timelock + multisig), with transparency events

---

## APIs/ABIs (Soroban)

### SyndicateManager

```rust
// Illustrative signatures
pub fn register_guild(name: Bytes, meta_uri: Bytes) -> GuildId {}
pub fn join_guild(guild: GuildId) {}
pub fn leave_guild(guild: GuildId) {}

pub fn start_season(cfg: SeasonCfg) {}
pub fn end_season() {}

pub fn apply_season_bonus(farmer: Address, base_payout: i128, block: u64) -> i128 {}
pub fn record_harvest(farmer: Address, guild: Option<GuildId>, block: u64, zeros: u32, gap_s: u32) {}

pub fn set_params(params: Params) {}
pub fn get_params() -> Params {}
```

### OracleAdapter

```rust
pub fn read_price(symbol: Symbol) -> (i128 /*price_scaled*/, u64 /*ts*/)
```

* Validates `symbol`, checks staleness (`ts`), scale, and origin (authorized oracle list)

### BadgeNFT

```rust
pub fn mint_badge(to: Address, badge_kind: u32, seed: Bytes32) -> TokenId {}
```

* `badge_kind` maps the visual template and rarity rules

### Embedded Events

* `GuildRegistered(guild_id, owner)`
* `JoinedGuild(member, guild_id)` / `LeftGuild(member, guild_id)`
* `SeasonStarted(season_id, cfg)` / `SeasonEnded(season_id, stats)`
* `TeamworkAchieved(guild_id, block, n_members)`
* `SeasonBonusApplied(farmer, season_id, M_t, B_team, payout_final)`
* `BadgeMinted(farmer, badge_id, kind)`

### View Helpers

* `current_season()`
* `guild_of(farmer)`
* `preview_bonus(farmer, block)` → returns `(M_t, B_team)`
* `leaderboard(season_id, page, size)`

---

## Security

* **Oracle**: explicit list of authorized addresses; rejects stale reads; preference for **TWAP** and per-block variation limits
* **Governance**: *timelock + multisig* to change critical parameters
* **Anti‑exploit**: caps/saturations; cooldowns; monotonicity validation; overflow tests; independent audits
* **Fail‑safe**: if oracle unavailable, freezes `M_t` at last valid value or reverts to `1.00` until normalized

---

## Development Quickstart

1. **Prerequisites**: Rust + Soroban CLI, Stellar network (testnet), Node (optional front-end)
2. **Clone & Build**:

   ```bash
   git clone https://github.com/<org>/kale-syndicate && cd kale-syndicate
   make build # or cargo build -p syndicatemanager -p oracleadapter -p badgenft
   ```
3. **.env Config (testnet)**:

   ```env
   KALE_CONTRACT_ADDR=...
   REFLECTOR_ORACLE_ADDR=...
   PRICE_SYMBOL=XLM_USD
   ```
4. **Deploy**:

   ```bash
   soroban contract deploy --wasm target/wasm32-unknown-unknown/release/syndicatemanager.wasm --network testnet
   soroban contract deploy --wasm target/.../oracleadapter.wasm --network testnet
   soroban contract deploy --wasm target/.../badgenft.wasm --network testnet
   ```
5. **Seed accounts & invocations** (examples):

   ```bash
   soroban contract invoke --id $SYNDICATE --fn start_season --arg '{...}'
   soroban contract invoke --id $SYNDICATE --fn register_guild --arg '{name:"Veggie DAO"}'
   soroban contract invoke --id $SYNDICATE --fn join_guild --arg '{guild:1}'
   ```

---

## Demo

Season 1 ("Stellar Journey") will be demonstrated including:

- Simulation of guild registration and operation
- Application of Reflector bonus (dynamic market bonus)
- Minting generative badge NFT for rare achievements

This demo covers all main Syndicate loops and will run on testnet with Soroban contracts.

---

## Tests

* **Unit**: logic for `M_t`, `B_team`, limits, staleness, and caps
* **Property-based**: sweep `(stake, zeros, gap, N_guild, price path)` and check fairness/monotonicity
* **Integration**: simulate Reflector subscriptions → EventKeeper → `apply_season_bonus` → `record_harvest`
* **Fuzzing**: out-of-order events, short reorgs, stale oracles, block race conditions

---

## Operation & Observability

* **EventKeeper** with health checks, exponential retries, idempotent queue
* **Metrics**: `kale_syndicate_M_t`, `teamwork_blocks`, `badges_minted`, `oracle_staleness_seconds`
* **Dashboards**: on-chain leaderboards + NFT art; transparency: last `M_t`, oracle in use, TWAP vs spot

---

## Roadmap

**Phase 1**

* Seasons + leaderboards
* OracleAdapter (spot/TWAP) and basic Market Bonus
* Transparency page (minimal UI)

**Phase 2**

* Proof‑of‑Teamwork 2.0 (collaborative bonus)
* Reflector subscriptions + EventKeeper (multisig/timelock)
* BadgeNFT (generative art) and missions

**Phase 3**

* Syndicate DAO (parameter governance)
* Cosmetic sinks/burns, *Meme Seasons Toolkit*
* SDKs (Rust/TS) and guild bots

---

## FAQ

**Does the Syndicate change KALE emission?**

> No. The base KALE remains untouched. The Syndicate only composes bonuses and cosmetics.

**What if the oracle goes down?**

> We freeze `M_t` (or 1.00) until the oracle returns, with transparency events.

**How do we avoid pay‑to‑win?**

> Saturation, caps, skill missions, and coordination bonuses (not just stake).

**Are NFTs required?**

> No. But they help with culture and retention; can be SBTs (merit) and/or transferable (collection).

---

## Contributing

* Issues and PRs are welcome
* Follow lint and commit conventions
* Game balance proposals should include rationale and simulations

---

## License


> Generative art may have a separate license, as defined in the /art folder.

---

## Notices

* Experimental project, **no warranty**. Inherent risk on public networks.
* Do your own research. Consider independent audits before production use.

---
