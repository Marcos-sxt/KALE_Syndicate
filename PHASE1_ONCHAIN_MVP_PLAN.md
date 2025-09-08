
# Implementation Plan — Phase 1: On-chain MVP

This document details the technical steps to implement Phase 1 of KALE Syndicate: the On-chain MVP.

---


## Phase 1 Objective

Deliver a functional and recordable MVP, demonstrating:
- Guild creation and member entry
- Application of the market bonus (mock price)
- Harvest registration and minting of badge NFT (placeholder)
- Display of events and returns in the terminal

---


## Recommended Repository Structure

```
kale-syndicate/
├── syndicatemanager/
├── oracleadapter/
├── badgenft/
├── cli-demo/
├── tests/
├── Cargo.toml (workspace)
```

---


## Technical Steps

### 1. Environment Setup
- Install Rust, Soroban CLI, Stellar testnet
- Initialize cargo workspace and subdirectories
- Set up basic CI/CD

### 2. SyndicateManager
- Implement guild registration
- Allow member entry
- Emit creation/entry events
- Expose functions via Soroban
- Unit tests for guild and members

### 3. OracleAdapter (Mock)
- Implement mock function to return price
- Calculate simple market bonus
- Expose function for querying
- Unit tests for calculation

### 4. BadgeNFT (Placeholder)
- Implement basic NFT minting
- Use simple deterministic seed
- Emit mint event
- Unit tests for minting

### 5. CLI/Demo Script
- Script to create guild, join, harvest, and mint badge
- Display events and returns in the terminal
- Simulate complete MVP flow

### 6. Tests
- Unit tests for each contract
- Integrated test of the complete flow

### 7. Deploy to Testnet
- Build contracts
- Deploy via Soroban CLI
- Run demo script

---


## Acceptance Criteria
- Recordable flow executing all steps
- Events and returns visible in the terminal
- Unit tests covering main functionalities

---


## Recommendations
- Document functions and events
- Use mocks to facilitate iteration
- Prioritize simplicity and clarity in the MVP

---


> After validating Phase 1, proceed to off-chain integration and gamification (Phase 2).
