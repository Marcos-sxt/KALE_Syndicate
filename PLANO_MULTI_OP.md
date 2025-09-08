
# KALE Syndicate — Detailed Plan for the Multi-op Flow (Harvest + Bonus)

This document details the steps, requirements, test scenarios, and deliverables to implement and validate the multi-op flow, where the user performs the KALE harvest and registers the bonus in the Syndicate in the same transaction/block.

---


## 🎯 Objective

Allow the user to execute `KALE.harvest` followed by `SyndicateManager.record_harvest` in a single transaction, ensuring that:
- The market bonus (`M_t`) is correctly calculated and applied.
- The teamwork bonus (`B_team`) is assigned when multiple guild members harvest together.
- A badge NFT is minted when the criteria are met.
- All relevant events are emitted and recorded.

---


## 📝 Detailed Tasks

### 1. Environment Preparation
- Deploy the `KALE`, `SyndicateManager`, `OracleAdapter`, and `BadgeNFT` contracts on testnet.
- Configure contract addresses in `.env` or a configuration file.
- Test contract integration using Soroban CLI or SDK.

### 2. Multi-op Flow Implementation
- Develop a script/CLI that builds a multi-op transaction:
  - Call to `KALE.harvest(...)` (with user/guild parameters)
  - Call to `SyndicateManager.record_harvest(...)` (using harvest data)
- Ensure both operations are executed in the same block/ledger.
- Validate that the script/CLI handles errors and retries if necessary.

### 3. Bonus Validation
- Test the calculation of the market bonus (`M_t`) using different oracle prices.
- Simulate synchronized harvests to validate the teamwork bonus (`B_team`).
- Check teamwork saturation (member limit per block).
- Validate safe fallback when the oracle is stale or offline.

### 4. Badge NFT Minting and Visualization
- Integrate a call to the `BadgeNFT` contract after eligible harvests.
- Generate and display generative art (SVG) based on the harvest seed.
- List user badges and show details (id, type, seed, date).

### 5. Tests and Edge Cases
- Test multiple guild members harvesting in the same block.
- Validate idempotency: prevent double registration of harvests.
- Simulate failures (oracle, storage, network) and ensure robustness.
- Test anti-spam (`last_seen[farmer]`) and teamwork saturation.

### 6. Documentation and Demonstration
  - Guild creation/join
  - Harvest + Bonus (multi-op)
  - Badge minting
  - Simple leaderboard

soroban contract invoke --id <SYNDICATE_CONTRACT_ID> --network testnet --source-account <USER> -- record_harvest --params ...
soroban contract invoke --id "$SYNDICATE" --network "$NETWORK" --source-account "$ACCOUNT" -- record_harvest --params ...

## 📋 CLI/Soroban Command Examples

### Example of multi-op transaction (Soroban CLI)
```bash
soroban contract invoke --id <KALE_CONTRACT_ID> --network testnet --source-account <USER> -- harvest --params ...
soroban contract invoke --id <SYNDICATE_CONTRACT_ID> --network testnet --source-account <USER> -- record_harvest --params ...
```

### Example of automated script
```bash
#!/bin/bash
# Performs harvest and registers bonus in sequence
soroban contract invoke --id "$KALE" --network "$NETWORK" --source-account "$ACCOUNT" -- harvest --params ...
soroban contract invoke --id "$SYNDICATE" --network "$NETWORK" --source-account "$ACCOUNT" -- record_harvest --params ...
```

---


## ✅ Validation Checklist

- [ ] Contracts deployed and configured
- [ ] Harvest executed and registered in KALE
- [ ] Bonus applied and registered in Syndicate
- [ ] Events emitted correctly
- [ ] Badge NFT minted when applicable
- [ ] Edge case tests performed
- [ ] Oracle safe fallback tested
- [ ] Documentation and tutorial reviewed

---


## 🎯 Success Criteria

- Harvest and bonus registered in the same block/ledger
- Teamwork and market bonus events emitted
- Badge NFT minted and listed for the user
- Edge cases (oracle offline, saturation, anti-spam) covered
- Script/CLI executes the full flow without errors

---


## ⚠️ Risks and Mitigation

- **Synchronization failure:**
- **Oracle offline/stale:**

## 🛡️ Points of Attention

- **Double registration/anti-spam:**
- Synchronization of harvests for teamwork bonus.
- **Teamwork limit/saturation:**
- Ensure the script/CLI is easy to use and reproduce.

---



## 👥 Responsibilities and Deadlines by Task

| Task                             | Responsible      | Deadline      |
|----------------------------------|------------------|---------------|
| Contract deployment              | [Name/Team]      | [Date]        |
| Multi-op script/CLI              | [Name/Team]      | [Date]        |
| Edge case tests                  | [Name/Team]      | [Date]        |
| Generative badge art             | [Name/Team]      | [Date]        |
| Documentation/tutorial           | [Name/Team]      | [Date]        |
| Video/demo                       | [Name/Team]      | [Date]        |

---
- Monitor events and logs for validation.
- Handle network, oracle, and storage errors.
- Validate saturation and anti-spam limits.

---



## 📅 Deliverables
- Functional script/CLI for multi-op flow
- Integration tests covering main scenarios
- Generative badge art (SVG)
- Updated documentation
- Visual tutorial
- Video/demo of the complete flow

---



## 🏷️ Responsible
- [Your Name or Team]

## ⏳ Deadline
- [Set a realistic deadline]

---



## 🔗 References
- [SYNDICATE.md](SYNDICATE.md)
- [README.md](README.md)
- [Soroban Documentation](https://soroban.stellar.org/)

---



> This plan may be adjusted according to feedback and project evolution.
