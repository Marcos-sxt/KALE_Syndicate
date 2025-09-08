# KALE Syndicate — Composing on KALE (No SDK Required)

A social + gamified layer on top of KALE farming on Stellar, using Reflector for dynamic season bonuses.
This README explains how to integrate with KALE without the official SDK, what paths exist, and the recommended plan for the hackathon.

---

## 🎯 Goal

Deliver a social metagame (seasons, guilds, badges, leaderboards) that does **not** alter the KALE contract.
We only compose externally, applying reward multipliers based on:

- **Market Bonus** (price/FX via Reflector)
- **Teamwork Bonus** (harvest synchronized by ledger among guild members)

---

## 🧱 KALE Fundamentals (Essential for Composability)

- **Pipeline:** plant → work → harvest.
- **Payout** is calculated at harvest based on stake, zeros, and gap.
- Only `plant` requires `require_auth`; `work` and `harvest` can be called by third parties (ideal for automation, bundling, and social layers).
- The contract emits events (invocations and logs) that can be observed off-chain.

These points allow composition without the SDK: simply watch harvests and/or bundle calls in the same transaction.

---

## 🔌 Three Composability Modes (No SDK)

### 1) Off-chain Event Watcher (fastest and safest for hackathon)

- An **EventKeeper** service listens for KALE harvests via Soroban RPC/Horizon.
- On detecting a harvest, it calls `SyndicateManager.record_harvest(...)`:
  - Reads price via `OracleAdapter` → Reflector
  - Calculates `M_t` (market bonus) and `B_team` (counting (guild, ledger) on-chain)
  - Emits events and mints `BadgeNFT` when applicable
- **Proof of "same block":** counter per (guild_id, ledger_seq) in contract.

**✅ Pros:** Simple, robust, works now; great for demo (dashboard + badges).  
**⚠️ Cons:** Requires online watcher (fine for hackathon).

---

### 2) Multi-op Transaction (manual composability, great UX)

- In the same transaction:
  - `KALE.harvest(...)`
  - `SyndicateManager.record_harvest(...)`
- Guarantees same ledger and avoids cross-contract call.
- A frontend/CLI builds the tx with `@stellar/stellar-sdk`.

**✅ Pros:** Smooth experience; no KALE SDK needed.  
**⚠️ Cons:** Needs a simple front/CLI for "Harvest + Bonus".

---

### 3) Wrapper with Cross-contract Call (elegant but fragile for hackathon)

- A method `harvest_with_bonus(...)` in Syndicate calls KALE internally and applies the bonus.
- Requires locking in KALE's spec/symbols.

**✅ Pros:** Single call.
**⚠️ Cons:** More sensitive to spec changes/failures — leave for after hackathon.

---

## 🏆 Recommendations (for 1st Place)

**Combine 1 + 2:**

- **Main flow (demo):** multi-op `KALE.harvest` → `Syndicate.record_harvest` (same tx/ledger).
- **Watcher (fallback):** ensures bonuses/badges for harvests done outside your front.

---

## 🧩 Syndicate Components

### 1) SyndicateManager (on-chain contract)

**Minimal Functions:**
- `record_harvest(farmer, guild?, ledger_seq, zeros, gap)`
- `preview_bonus(ledger_seq) -> (M_t, B_team)`
- `register_guild(...)`, `join_guild(...)` (MVP)

**State:**
- `count[(guild_id, ledger_seq)] -> u32` // synced members
- `last_seen[farmer] -> ledger_seq` // anti-spam/double entry
- season parameters (`α`, `β`, `Rmax`, `K`, `Nmax`, `TTL_oracle`, caps)

**Events:**
- `TeamworkAchieved(guild_id, ledger, n_members)`
- `SeasonBonusApplied(farmer, season_id, M_t, B_team, payout_final)`

### 2) OracleAdapter (on-chain contract)

- `read_price(symbol) -> (price_scaled:i128, ts:u64)`
- Checks staleness (`now - ts <= TTL`), fallback to `M_t = 1.00`.
- Integrates Reflector feeds (spot or TWAP), SEP-40 compatible.

### 3) BadgeNFT (on-chain contract)

- `mint_badge(to, kind, seed) -> token_id`
- **Deterministic seed:**  
  `keccak256(harvest_tx_hash || season_id || price_scaled || guild_id)`
- One generative template (kaleidoscope) delivers visual impact in the demo.

---

## 🔄 Flows

### A) Multi-op (front/CLI)
`KALE.harvest` → `Syndicate.record_harvest` (same tx)
→ Syndicate reads price, applies `M_t * B_team`, emits events, can mint badge.

### B) Watcher (EventKeeper)
Listens for KALE harvest
→ calls `record_harvest(...)`
→ same bonus and badge logic.

---

## 🖥️ Minimal Demo (what to show in the video)

- Create/join guild.
- Do Harvest + Bonus (multi-op) and see `M_t` (Reflector) and `B_team` applied.
- Mint 1 badge generated from seed (show SVG/preview).
- Leaderboard (top 10) and "last M_t / last teamwork" in a simple UI.

This delivers innovation + usability + community impact.

---

## ⚙️ Quickstart (MVP)

**Prerequisites:** Rust + Soroban CLI, Node.js, testnet account.

### Clone & build
```bash
git clone https://github.com/<org>/kale-syndicate
cd kale-syndicate
make build   # or cargo build -p syndicatemanager -p oracleadapter -p badgenft
```

### .env (testnet)
```
KALE_CONTRACT_ADDR=...
REFLECTOR_ORACLE_ADDR=...
PRICE_SYMBOL=XLM_USD
```

### Deploy (example)
```bash
soroban contract deploy --wasm target/.../syndicatemanager.wasm --network testnet
soroban contract deploy --wasm target/.../oracleadapter.wasm   --network testnet
soroban contract deploy --wasm target/.../badgenft.wasm        --network testnet
```

### EventKeeper (steps)
- Connect to Soroban RPC/Horizon.
- Filter KALE invocations/events (`contractId=KALE`, topic Harvest).
- Extract farmer, zeros, gap, ledger_seq and call `record_harvest(...)`.
- Implement retry + idempotency (`tx_hash:op_index`).

---

## 🛡️ Security & Fairness

- **Oracle:** authorized feed, `TTL_oracle`, caps on block variation, prefer TWAP.
- **Teamwork:** counter per (guild, ledger), saturation by `Nmax`.
- **Anti-spam:** `last_seen[farmer]`, short cooldown, idempotency in watcher.
- **Fail-safe:** Reflector unavailable → `M_t = 1.00` until normalized.

---

## 🗺️ Roadmap (Beyond Demo MVP)

- DAO for Syndicate (timelock + multisig for parameters)
- Cosmetic sinks/burns (skins, tickets, naming)
- Guild bots and SDK (TS/Rust)
- Transparency dashboards (last `M_t`, TWAP vs spot, staleness)

---

## 📄 License

MIT (code). Generative art may have its own license in /art.