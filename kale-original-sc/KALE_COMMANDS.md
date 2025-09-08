# KALE Smart Contract — Guia de Comandos Soroban

Este documento detalha os comandos disponíveis no contrato KALE, seus parâmetros e exemplos de uso via Soroban CLI.

---

## Comandos Principais

### 1. `plant`
- **Descrição:** Inicia o ciclo de farming para um endereço, plantando uma quantidade de KALE.
- **Parâmetros:**
  - `--farmer <Address>`: Endereço do farmer (chave pública, contract ID ou alias).
  - `--amount <i128>`: Quantidade a ser plantada.
- **Exemplo:**
  ```bash
  soroban contract invoke --id <KALE_ID> --network testnet --source-account minha-conta -- plant --farmer <Address> --amount 1
  ```

---

### 2. `work`
- **Descrição:** Realiza o trabalho no ciclo de farming, registrando o hash e nonce do farmer.
- **Parâmetros:**
  - `--nonce <u64>`: Número do nonce (ex: 1).
  - `--farmer <Address>`: Endereço do farmer.
  - `--hash <32_hex_bytes>`: Hash de 32 bytes em hexadecimal.
- **Exemplo:**
  ```bash
  soroban contract invoke --id <KALE_ID> --network testnet --source-account minha-conta -- work --nonce 1 --farmer <Address> --hash 0000000000000000000000000000000000000000000000000000000000000000
  ```

---

### 3. `harvest`
- **Descrição:** Finaliza o ciclo de farming, colhendo a recompensa para o farmer.
- **Parâmetros:**
  - `--index <u32>`: Índice do ciclo (ex: 1).
  - `--farmer <Address>`: Endereço do farmer.
- **Exemplo:**
  ```bash
  soroban contract invoke --id <KALE_ID> --network testnet --source-account minha-conta -- harvest --index 1 --farmer <Address>
  ```

---

## Observações
- Os comandos devem ser executados na ordem: `plant` → `work` → `harvest`.
- O endereço do farmer é o seu endereço público Stellar.
- O valor de `amount` deve ser compatível com o saldo e regras do contrato.
- O `hash` deve ser um valor válido de 32 bytes em hexadecimal.
- O `nonce` e `index` devem corresponder ao ciclo ativo do farmer.

---

## Outros Comandos Disponíveis
- `__constructor`, `upgrade`, `pause`, `unpause`, `remove_block`, `__check_auth`, `help`
- Consulte o help de cada comando para detalhes avançados.

---

> Para dúvidas sobre parâmetros, consulte o código-fonte do contrato ou a documentação oficial do KALE.
