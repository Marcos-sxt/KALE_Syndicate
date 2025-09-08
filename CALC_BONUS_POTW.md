Let's structure a PoTW 2.0 distribution formula that is practical to implement in the SyndicateManager, considering:

- Base value of KALE mined in the cycle
- Market bonus as a % of the XLM value
- Relative participation of each member
- Total number of active members in the cycle

🔹 Proposed Formula

Reward₍ᵢ₎ = Base_KALE × (1 + MarketBonus) × (Powerᵢ / ΣPower₍members₎)

Where:

- Base_KALE = amount of KALE mined in the cycle
- MarketBonus = (XLM_price × Bonus_Percentage) / Base_KALE → adjusts the bonus according to the XLM price
- Powerᵢ = contribution of member i in the cycle (hashes/min, stake, or other parameter)
- ΣPower₍members₎ = sum of all members' contributions in the cycle

This ensures that each member receives proportionally to their participation, with the market bonus applied globally to the cycle.

🔹 Guild Adjustment

If you want to normalize by the number of participating syndicate members:

Reward₍ᵢ₎ = Base_KALE × (1 + MarketBonus) × (Powerᵢ / ΣPower₍members₎) × (1 / NumMembers)

Here, 1 / NumMembers reduces the bonus to avoid excessive inflation when many participate, keeping the balance.

🔹 Benefits of This Approach

- Scalable – works for any number of members.
- Flexible – easy to change MarketBonus or normalization without changing all the logic.
- Simple for MVP – can be implemented directly in the SyndicateManager contract and tested with mocks before integrating Reflector.

---

Let's simulate a cycle with 5 members, using the parameters you suggested:

🔹 Simulation Parameters

- Base KALE value: 10,000 KALE
- XLM Price: $0.10
- Market bonus: 50% of XLM value (simplified to 0.5)
- Member contributions (Power):

| Member | Power |
|--------|-------|
|   A    |  40   |
|   B    |  30   |
|   C    |  15   |
|   D    |  10   |
|   E    |   5   |

Total Power: 40+30+15+10+5 = 100  
Number of members: 5

🔹 Formula Used

Reward₍ᵢ₎ = Base_KALE × (1 + MarketBonus) × (Powerᵢ / ΣPower₍members₎)

🔹 Step-by-Step Calculation

Base value + market bonus:

10,000 × (1 + 0.5) = 10,000 × 1.5 = 15,000 KALE distributed in the cycle

Proportional reward per member:

A: 15,000 × 40 / 100 = 6,000 KALE  
B: 15,000 × 30 / 100 = 4,500 KALE  
C: 15,000 × 15 / 100 = 2,250 KALE  
D: 15,000 × 10 / 100 = 1,500 KALE  
E: 15,000 × 5 / 100 = 750 KALE  

🔹 Result

| Member | Reward (KALE) |
|--------|---------------|
|   A    |    6,000      |
|   B    |    4,500      |
|   C    |    2,250      |
|   D    |    1,500      |
|   E    |     750       |

Total distributed: 15,000 KALE (matches base + market bonus)

---

Now, let's apply the normalizer by the number of members in the same simulation.

🔹 Adjusted Formula

Reward₍ᵢ₎ = Base_KALE × (1 + MarketBonus) × (Powerᵢ / ΣPower₍members₎) × (1 / NumMembers)

Number of members: 5

So each reward will be divided by 5, reducing the bonus impact when there are many participants.

🔹 Step-by-Step Calculation

Base value + market bonus: 10,000 × 1.5 = 15,000 KALE

Proportional distribution with normalizer (÷5):

A: 6,000 ÷ 5 = 1,200 KALE  
B: 4,500 ÷ 5 = 900 KALE  
C: 2,250 ÷ 5 = 450 KALE  
D: 1,500 ÷ 5 = 300 KALE  
E: 750 ÷ 5 = 150 KALE  

🔹 Result with Normalizer

| Member | Reward (KALE) |
|--------|---------------|
|   A    |    1,200      |
|   B    |     900       |
|   C    |     450       |
|   D    |     300       |
|   E    |     150       |

Total distributed: 3,000 KALE (less than the total cycle without the normalizer, but maintaining member proportions).

🔹 Observations

The normalizer avoids inflating the bonus in large guilds, making the system more sustainable.

However, the total KALE distributed drops considerably; it may be necessary to adjust the base value or MarketBonus percentage to keep incentives attractive.

This effect also impacts how long each member takes to farm $100, increasing the number of cycles needed.

---

Let's estimate how long each member would take to farm $100 in KALE using the normalized distribution.

🔹 Parameters

- KALE price: $0.000314 USD
- Goal: $100 → 100 ÷ 0.000314 ≈ 318,471 KALE

Rewards per cycle (normalized):

| Member | Reward (KALE/cycle) |
|--------|---------------------|
|   A    |      1,200          |
|   B    |       900           |
|   C    |       450           |
|   D    |       300           |
|   E    |       150           |

🔹 Calculation of Number of Cycles Needed

Cycles = 318,471 / Reward_per_cycle

A: 318,471 ÷ 1,200 ≈ 265 cycles  
B: 318,471 ÷ 900 ≈ 354 cycles  
C: 318,471 ÷ 450 ≈ 708 cycles  
D: 318,471 ÷ 300 ≈ 1,062 cycles  
E: 318,471 ÷ 150 ≈ 2,123 cycles  

🔹 Time Estimate (in hours)

Assuming each cycle lasts 1 hour (just for simplification):

| Member | Estimated Time       |
|--------|---------------------|
|   A    | 265 h ≈ 11 days     |
|   B    | 354 h ≈ 15 days     |
|   C    | 708 h ≈ 30 days     |
|   D    | 1,062 h ≈ 44 days   |
|   E    | 2,123 h ≈ 88 days   |

Note: the actual time depends on cycle duration, number of participants, and real mining power. But this gives a good notion of scalability and incentive for everyone to contribute more.

---

Now let's simulate the scenario without the normalizer, i.e., using direct proportional distribution with market bonus, without dividing by the number of members.

🔹 Rewards per Cycle (without normalizer)

| Member | Reward (KALE/cycle) |
|--------|---------------------|
|   A    |      6,000          |
|   B    |      4,500          |
|   C    |      2,250          |
|   D    |      1,500          |
|   E    |       750           |

🔹 Number of Cycles Needed for $100 (~318,471 KALE)

A: 318,471 ÷ 6,000 ≈ 53 cycles  
B: 318,471 ÷ 4,500 ≈ 71 cycles  
C: 318,471 ÷ 2,250 ≈ 142 cycles  
D: 318,471 ÷ 1,500 ≈ 212 cycles  
E: 318,471 ÷ 750 ≈ 425 cycles  

🔹 Time Estimate (in hours, cycle = 1h)

| Member | Estimated Time      |
|--------|--------------------|
|   A    | 53 h ≈ 2.2 days    |
|   B    | 71 h ≈ 3 days      |
|   C    | 142 h ≈ 6 days     |
|   D    | 212 h ≈ 9 days     |
|   E    | 425 h ≈ 18 days    |

🔹 Comparison with Normalizer

Without normalizer: much faster for each member to reach $100, but the total distributed per cycle is higher, which can generate inflation or imbalance if many guilds participate.

With normalizer: more balanced distribution, but farming time increases significantly, encouraging coordination among members.

---

Let's compare KALE’s current “solo” PoTW with Syndicate’s PoTW 2.0 using the same price and goal parameters: $100 in KALE (~318,471 KALE).

🔹 Current KALE Scenario (PoTW Solo)

- Base value per cycle (estimated solo): 500 KALE/cycle
- Cycles needed for $100: 318,471 ÷ 500 ≈ 637 cycles
- Estimated time (1h per cycle): 637 h ≈ 26.5 days

🔹 Syndicate Scenario (PoTW 2.0, without normalizer, 5-member guild)

| Member | Reward (KALE/cycle) | Cycles for $100 | Estimated Time |
|--------|---------------------|-----------------|---------------|
|   A    |      6,000          |      53         |   2.2 days    |
|   B    |      4,500          |      71         |   3 days      |
|   C    |      2,250          |     142         |   6 days      |
|   D    |      1,500          |     212         |   9 days      |
|   E    |       750           |     425         |   18 days     |

🔹 Visual Comparison

| Scenario           | Typical Reward | Cycles for $100 | Typical Time   |
|--------------------|---------------|-----------------|---------------|
| KALE solo          | 500 KALE      |      637        | 26.5 days     |
| Syndicate (PoTW 2.0)| 1,200–6,000 KALE | 53–425      | 2–18 days     |

🔹 Insights

- Increased efficiency: even members with lower power in the Syndicate reach $100 faster than solo mining.
- Incentive to collaborate: PoTW 2.0 rewards active guilds, motivating coordination for harvests.
- More strategic distribution: strong members (higher Power) receive more, but everyone gets a proportional fraction, avoiding frustration.
- Tuning flexibility: adjusting MarketBonus or normalizer allows balancing farming time vs. guild distribution.