#!/bin/bash
# KALE Syndicate - MVP On-chain Test Script (ajustado para alias)
# Usage: bash mvp_test.sh

set -e

# Config
ACCOUNT="minha-conta"
NETWORK="testnet"
GUILD_NAME="GuildKALE"
OWNER="minha-conta"

# Contract IDs
SYNDICATE="CBECA45FZMLWDU3AKYWM64XX6AWG67KQXHDE7Z6OH2EU4ZACBEVHE5JZ"
BADGENFT="CCQ2KFJHY7LXRMVTQZGZC7VO52DESMRLPN22ANBMKUJNSILH7MKTOCC7"
ORACLE="CDMJV7BFK56IPW3WKRS7H7KAEHSDEDWWUOHUMPM5NNAJ4ETNO3EJ2H5E"

# Inicializar OracleAdapter (mock)
echo "\n== Inicializando OracleAdapter (mock) =="
soroban contract invoke --id "$ORACLE" --network "$NETWORK" --source-account "$ACCOUNT" -- init --oracle_addr "$ACCOUNT" --price_symbol "USD" --base_price_scaled 1000

# 1. Criar guilda
echo "\n== Criando guilda =="
soroban contract invoke --id "$SYNDICATE" --network "$NETWORK" --source-account "$ACCOUNT" -- register_guild --owner "$OWNER" --name "$GUILD_NAME"

# 2. Listar guildas
echo "\n== Listando guildas =="
soroban contract invoke --id "$SYNDICATE" --network "$NETWORK" --source-account "$ACCOUNT" -- list_guilds

# 3. Entrar na guilda (guild_id=1)
echo "\n== Entrando na guilda =="
soroban contract invoke --id "$SYNDICATE" --network "$NETWORK" --source-account "$ACCOUNT" -- join_guild --guild_id 1 --user "$ACCOUNT"

# 4. Listar membros da guilda
echo "\n== Listando membros da guilda =="
soroban contract invoke --id "$SYNDICATE" --network "$NETWORK" --source-account "$ACCOUNT" -- list_members --guild_id 1

# 5. Consultar preço (mock)
echo "\n== Consultando preço (mock) =="
PRECO=$(soroban contract invoke --id "$ORACLE" --network "$NETWORK" --source-account "$ACCOUNT" -- read_price)
echo "Preço retornado: $PRECO"

# 6. Calcular market bonus
echo "\n== Calculando market bonus =="
BONUS=$(soroban contract invoke --id "$ORACLE" --network "$NETWORK" --source-account "$ACCOUNT" -- calc_market_bonus)
echo "Market bonus: $BONUS"

# 7. Mintar badge NFT
echo "\n== Mintando badge NFT =="
soroban contract invoke --id "$BADGENFT" --network "$NETWORK" --source-account "$ACCOUNT" -- mint_badge --user "$ACCOUNT" --kind "GuildKALE" --seed "Harvest #1"

# 8. Listar badges
echo "\n== Listando badges =="
soroban contract invoke --id "$BADGENFT" --network "$NETWORK" --source-account "$ACCOUNT" -- list_badges --user "$ACCOUNT"

echo "\n== Teste completo do MVP executado! ="
