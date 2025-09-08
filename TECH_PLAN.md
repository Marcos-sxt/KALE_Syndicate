
# Technical Implementation Plan — KALE Syndicate

This document details the technical implementation plan for KALE Syndicate, based on the scope defined in the README.

---

## 0. MVP Objective (Definition of Done)

The MVP must deliver a complete and recordable flow, including:
- Create a guild and join it
- Apply the market bonus by reading the price (mock at first, Reflector later)
- Register a harvest and mint 1 badge (NFT placeholder)
- Display the main events and returns in the terminal

### Granular MVP Tasks
1. Implement the SyndicateManager contract with guild registration and member entry
2. Mock OracleAdapter for price reading and market bonus calculation
3. Register harvest and emit corresponding event
4. Mint badge NFT (placeholder) on harvest
5. CLI/Script to execute the flow and display events in the terminal
6. Unit tests for each step

---

## 1. General Architecture

- **On-chain Contracts (Soroban/Stellar):**
   - SyndicateManager
   - OracleAdapter
   - BadgeNFT
- **Off-chain Services (optional):**
   - EventKeeper (webhooks, automation)
   - Indexer/Leaderboard
   - Guild bots
- **Front-end:**
   - Transparency dashboard, leaderboards, badges

---

## 1.1 Repository Structure (Cargo Workspace)

Suggested modular structure for Rust/Soroban:

```
kale-syndicate/
├── syndicatemanager/
├── oracleadapter/
├── badgenft/
├── cli-demo/
├── tests/
├── Cargo.toml (workspace)
```
- Each contract in a subdirectory
- Separate CLI/demo script
- Integrated tests folder

---

## 2. Implementation Steps

### Phase 1 — MVP On-chain
1. **Environment setup:**
   - Tools: Rust, Soroban CLI, Stellar testnet network
   - Initial repository, CI/CD setup
2. **SyndicateManager:**
   - Guild, season, and leaderboard registration
   - Bonus calculation (Market/Teamwork)
   - Event emission
3. **OracleAdapter:**
   - Integration with SEP-40 oracles
   - Price validation, staleness, normalization
4. **BadgeNFT:**
   - Minting NFTs (SBT and transferable)
   - On-chain generative art
5. **Unit and property-based tests**
6. **Deploy to testnet**

### Phase 2 — Off-chain Integration and Gamification
1. **EventKeeper:**
   - Consumes events from Reflector
   - Submits adjustment transactions
   - Timelock + multisig
2. **Indexer/Leaderboard:**
   - Aggregates events for front-end
   - REST API for queries
3. **Guild bots:**
   - Coordinates harvests
   - Window notifications
4. **Minimal front-end:**
   - Transparency page
   - Leaderboards and badges

### Phase 3 — Expansion and Governance
1. **Syndicate DAO:**
   - Parameter governance
   - On-chain voting
2. **Cosmetic Sinks/Burns:**
   - Skins, tickets, guild branding
3. **SDKs (Rust/TS):**
   - Facilitate bot and app integration
4. **Security audit and hardening**

---

## 3. Technologies and Tools
- **Rust** (Soroban contracts)
- **Soroban CLI** (deploy/tests)
- **Node.js/TypeScript** (front-end, bots, indexer)
- **Stellar SEP-40** (oracles)
- **Database** (indexer, leaderboard)
- **Docker** (development environment)

---


## 4. Risks and Recommendations
- **Oracles:**
   - Validate feeds, safe fallback, staleness monitoring
- **Harvest coordination:**
   - Block synchronization, reorg tolerance
- **Governance:**
   - Timelock + multisig, event transparency
- **Generative art:**
   - Ensure uniqueness and low execution cost
- **Testing:**
   - Unit coverage, property-based, fuzzing

---


## 5. Summary Roadmap
- MVP on-chain (main contracts)
- Off-chain and front-end integration
- Gamification and governance expansion
- Audit and mainnet launch

---


## 6. References
- [KALE Base Contract](https://github.com/stellar-kaos/kale)
- [Soroban](https://soroban.stellar.org/)
- [Stellar SEP-40 Oracle Standard](https://github.com/stellar/SEP-40)

---


> This plan may be detailed further as the project progresses and based on community feedback.
