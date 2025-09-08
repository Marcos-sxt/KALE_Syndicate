#!/bin/bash
# KALE Syndicate - Teste completo de contratos
# Executa e valida todos métodos dos contratos

set -e
ACCOUNT="minha-conta"
NETWORK="testnet"
GUILD_NAME="GuildKALE"
OWNER="minha-conta"
USER2="user2"
SEED="Harvest #1"
KIND="GuildKALE"

# IDs dos contratos (ajuste conforme necessário)
SYNDICATE="$(cat syndicate_id.txt)"
BADGENFT="$(cat badgenft_id.txt)"
ORACLE="$(cat oracle_id.txt)"

# OracleAdapter: init
soroban contract invoke --id "$ORACLE" --network "$NETWORK" --source-account "$ACCOUNT" -- init --oracle_addr "$ACCOUNT" --price_symbol "USD" --base_price_scaled 1000

# OracleAdapter: read_price
soroban contract invoke --id "$ORACLE" --network "$NETWORK" --source-account "$ACCOUNT" -- read_price

# OracleAdapter: calc_market_bonus
soroban contract invoke --id "$ORACLE" --network "$NETWORK" --source-account "$ACCOUNT" -- calc_market_bonus

# OracleAdapter: get_params
soroban contract invoke --id "$ORACLE" --network "$NETWORK" --source-account "$ACCOUNT" -- get_params

# OracleAdapter: set_base_price
soroban contract invoke --id "$ORACLE" --network "$NETWORK" --source-account "$ACCOUNT" -- set_base_price --new_base_scaled 2000

# SyndicateManager: register_guild
soroban contract invoke --id "$SYNDICATE" --network "$NETWORK" --source-account "$ACCOUNT" -- register_guild --owner "$OWNER" --name "$GUILD_NAME"

# SyndicateManager: join_guild
soroban contract invoke --id "$SYNDICATE" --network "$NETWORK" --source-account "$ACCOUNT" -- join_guild --guild_id 1 --user "$ACCOUNT"
soroban contract invoke --id "$SYNDICATE" --network "$NETWORK" --source-account "$ACCOUNT" -- join_guild --guild_id 1 --user "$USER2"

# SyndicateManager: list_guilds
soroban contract invoke --id "$SYNDICATE" --network "$NETWORK" --source-account "$ACCOUNT" -- list_guilds

# SyndicateManager: list_members
soroban contract invoke --id "$SYNDICATE" --network "$NETWORK" --source-account "$ACCOUNT" -- list_members --guild_id 1

# BadgeNFT: mint_badge
soroban contract invoke --id "$BADGENFT" --network "$NETWORK" --source-account "$ACCOUNT" -- mint_badge --user "$ACCOUNT" --kind "$KIND" --seed "$SEED"
soroban contract invoke --id "$BADGENFT" --network "$NETWORK" --source-account "$ACCOUNT" -- mint_badge --user "$USER2" --kind "$KIND" --seed "$SEED"

# BadgeNFT: list_badges
soroban contract invoke --id "$BADGENFT" --network "$NETWORK" --source-account "$ACCOUNT" -- list_badges --user "$ACCOUNT"
soroban contract invoke --id "$BADGENFT" --network "$NETWORK" --source-account "$ACCOUNT" -- list_badges --user "$USER2"

# Fim do teste
