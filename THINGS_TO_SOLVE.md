1. Reward Distribution (PoTW 2.0)

Status: Concept defined, but still needs formalization:

Whether the bonus will be 50% or 100%.

How it will be divided proportionally (participation vs. number of members).

Formula needs mathematical validation and testing in the contract.

Action: Create a clear calculation function, with configurable parameters, to be used in the MVP.

2. Oracle for Market Bonus

Status: Decided to use XLM, but still missing:

Determine the percentage of the XLM value to be used as a bonus.

Define the origin of the tokens (e.g., Syndicate contract treasury pool or special issuance).

Action: Define the source of the bonus tokens and the update logic based on the Reflector.

3. On-chain Events / Synchronized Harvest

Status: Infrastructure for harvest synchronization still needs refinement.

Possible solution: Off-chain backend (EventKeeper) that monitors blocks, coordinates harvests, and triggers events in the contract.

Action: Implement MVP backend to simulate synchronization before mainnet.

4. NFTs / Badges

Status: Rarity and transferability definitions still pending.

MVP Suggestion: Start with a simple transferable placeholder badge; rarities can be introduced in the expansion phase.

Action: Decide the type of NFT (SBT or transferable) and simple minting rules for the MVP.

5. Onboarding / UX

Status: Tutorial and dashboard are critical for retention.

MVP Action: Implement a minimal dashboard showing guild, harvests, and badges. Basic visual tutorial for new users.

✅ Prioritization for MVP

PoTW 2.0 + bonus calculation (functional base for farming and guilds).

Oracle Adapter with XLM (for market bonus).

On-chain events + minimal EventKeeper (synchronized harvest).

Placeholder Badge NFT (simple, transferable or SBT).

CLI + minimal dashboard (for recordable and testable flow).

Simple visual tutorial (onboarding guide for new players).