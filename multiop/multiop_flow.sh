#!/bin/bash
# Script Multi-op: Harvest + Bonus no KALE Syndicate
# Executa harvest no KALE e registra bônus no SyndicateManager na mesma sequência

set -e

# Configuração

ACCOUNT="minha-conta"
NETWORK="testnet"
KALE="CDSWUUXGPWDZG76ISK6SUCVPZJMD5YUV66J2FXFXFGDX25XKZJIEITAO"           # Contrato base KALE na testnet
SYNDICATE="CBECA45FZMLWDU3AKYWM64XX6AWG67KQXHDE7Z6OH2EU4ZACBEVHE5JZ"      # SyndicateManager
BADGENFT="CCQ2KFJHY7LXRMVTQZGZC7VO52DESMRLPN22ANBMKUJNSILH7MKTOCC7"        # BadgeNFT
ORACLE="CD6VSTB3VOG6JMXZTJX54BVAO2C3SEMOXDHB6MRSRBOP6CONJCTQEXRI"         # OracleAdapter
GUILD_ID=1                           # Exemplo de guilda



# Parâmetros do harvest (ajustar conforme o contrato KALE)
FARMER="GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF" # Exemplo de endereço
INDEX=1 # Exemplo de índice
HARVEST_PARAMS="--farmer $FARMER --index $INDEX"


# 1. Executa harvest no KALE
soroban contract invoke --id "$KALE" --network "$NETWORK" --source-account "$ACCOUNT" -- harvest $HARVEST_PARAMS

# 2. Registra bônus no SyndicateManager
soroban contract invoke --id "$SYNDICATE" --network "$NETWORK" --source-account "$ACCOUNT" -- record_harvest --guild_id "$GUILD_ID" --user "$ACCOUNT"

# 3. (Opcional) Mint badge NFT se aplicável
soroban contract invoke --id "$BADGENFT" --network "$NETWORK" --source-account "$ACCOUNT" -- mint_badge --user "$ACCOUNT" --kind "GuildKALE" --seed "Harvest #1"

# 4. (Opcional) Listar badges
soroban contract invoke --id "$BADGENFT" --network "$NETWORK" --source-account "$ACCOUNT" -- list_badges --user "$ACCOUNT"

# Fim do fluxo
