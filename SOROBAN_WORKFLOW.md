
# Practical Guide: Compiling, Deploying, and Invoking Soroban Contracts


## 1. Compiling the Contract

Run in the root of the contract workspace:
```bash
cargo build --release --target wasm32-unknown-unknown -p <package_name>
```
Example:
```bash
cargo build --release --target wasm32-unknown-unknown -p syndicatemanager
```
The generated `.wasm` file will be in:
```
target/wasm32-unknown-unknown/release/<package_name>.wasm
```

### Tips:
- If the contract uses features (e.g., mock_oracle), compile with:
  ```bash
  cargo build --release --target wasm32-unknown-unknown --features mock_oracle -p oracleadapter
  ```
- If a dependency error occurs, check `Cargo.toml` and run `cargo clean` before compiling again.
- To compile all contracts in the workspace:
  ```bash
  cargo build --release --target wasm32-unknown-unknown --workspace
  ```

### Common Errors and Solutions
- **Error: unresolved dependencies**
  - Solution: Make sure all crates are in `Cargo.toml` and run `cargo clean` before compiling again.
- **Error: target not found**
  - Solution: Install the wasm32 target: `rustup target add wasm32-unknown-unknown`.
- **Error: unrecognized feature**
  - Solution: Confirm the feature name in `Cargo.toml` and use the correct parameter in `--features`.
- **Error: permission denied when compiling**
  - Solution: Check folder permissions and run as the correct user.
- **Rust syntax errors**
  - **Error: expected identifier, found keyword**
    - Solution: Do not use reserved words as variable or function names.
  - **Error: missing semicolon**
    - Solution: Add a semicolon at the end of the line.
  - **Error: mismatched types**
    - Solution: Check if the variable/function type is correct and cast if necessary.
  - **Error: cannot find function/struct/enum**
    - Solution: Import the module correctly or define the item before using it.
  - **Error: expected `,` or `;`**
    - Solution: Check for missing commas or semicolons in lists, arguments, or at the end of lines.
  - **Error: unexpected end of file**
    - Solution: Make sure all `{}` blocks are properly closed.

---

  --wasm target/wasm32-unknown-unknown/release/<nome_do_pacote>.wasm \
  --network testnet \
  --source-account <alias_da_identidade>
  --wasm target/wasm32-unknown-unknown/release/syndicatemanager.wasm \
  --network testnet \
  --source-account minha-conta

## 2. Deploying the Contract to Testnet

```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/<package_name>.wasm \
  --network testnet \
  --source-account <identity_alias>
```
Example:
```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/syndicatemanager.wasm \
  --network testnet \
  --source-account my-account
```
The command returns the contract address (`CONTRACT_ID`).

### Parameter Explanation:
- `--wasm`: Path to the compiled contract file.
- `--network`: Target network (`testnet`, `standalone`, etc).
- `--source-account`: Alias registered via `soroban config identity add ...`.

### Tips:
- Save the returned `CONTRACT_ID` for future invocations.
- If deployment fails, check the account balance and if the `.wasm` file exists.
- To list already deployed contracts:
  ```bash
  soroban contract list --network testnet --source-account my-account
  ```

### Common Errors and Solutions
- **Error: insufficient balance**
  - Solution: Add funds to the testnet account via faucet.
- **Error: .wasm file not found**
  - Solution: Make sure the build was executed and the path is correct.
- **Error: source-account not recognized**
  - Solution: Register the alias with `soroban config identity add <alias> <private_key>`.
- **Error: network not found**
  - Solution: Check if the `--network` parameter is correct and if the CLI is up to date.

---

  --id <CONTRACT_ID> \
  --network testnet \
  --source-account <alias_da_identidade> \
  -- <metodo> [--arg1 valor1 --arg2 valor2 ...]
  --id CBECA45FZMLWDU3AKYWM64XX6AWG67KQXHDE7Z6OH2EU4ZACBEVHE5JZ \
  --network testnet \
  --source-account minha-conta \
  -- register_guild --name "GuildKALE" --owner "minha-conta"

## 3. Invoking Contract Methods

```bash
soroban contract invoke \
  --id <CONTRACT_ID> \
  --network testnet \
  --source-account <identity_alias> \
  -- <method> [--arg1 value1 --arg2 value2 ...]
```
Example to create a guild:
```bash
soroban contract invoke \
  --id CBECA45FZMLWDU3AKYWM64XX6AWG67KQXHDE7Z6OH2EU4ZACBEVHE5JZ \
  --network testnet \
  --source-account my-account \
  -- register_guild --name "GuildKALE" --owner "my-account"
```

### Common Errors and Solutions
- **Error: missing argument**
  - Solution: Check if all required arguments are present and correct.
- **Error: method not found**
  - Solution: Use `--help` to list available methods and review the name.
- **Error: invalid signature**
  - Solution: Use the correct alias registered with `soroban config identity add ...`.
- **Error: external contract not initialized**
  - Solution: Run the `init` method of the dependent contract with the correct address.
- **Error: incorrect argument type**
  - Solution: Check the expected type in the contract code and adjust the value passed.

---


## 4. Tips and Best Practices

- Use the identity alias (`my-account`) as `--source-account` so the CLI signs automatically.
- Check available methods with:
  ```bash
  soroban contract invoke --id <CONTRACT_ID> --network testnet --source-account <identity_alias> -- --help
  ```
- For contracts that depend on others (e.g., oracles), initialize with the correct external contract address.
- For mock features, compile with:
  ```bash
  cargo build --release --target wasm32-unknown-unknown --features mock_oracle -p oracleadapter
  ```

---


## 5. References

- [Soroban CLI Documentation](https://docs.rs/crate/soroban-cli/latest)
- [Reflector contract example](https://github.com/reflector-network/reflector-contract)
- [Stellar Testnet Explorer](https://stellar.expert/explorer/testnet/)

---


> Update this guide as new versions of Soroban CLI or contract changes are released.


### CLI Command Syntax Errors and How to Fix Them
- **Error: unknown argument**
  - Solution: Check if the argument name is correct and matches the contract method. Use `--help` to list valid arguments.
- **Error: missing required argument**
  - Solution: Add all required arguments as specified by the contract or command.
- **Error: invalid value for argument**
  - Solution: Check the expected type and format (e.g., string in quotes, number without quotes, correct address).
- **Error: unrecognized option**
  - Solution: Make sure the parameter name is correct (e.g., `--source-account` not `--source_account`).
- **Error: file not found**
  - Solution: Check the path to the `.wasm` file and if the build was run in the correct folder.
- **Error: command not found**
  - Solution: Make sure Soroban CLI is installed and the binary is in your PATH.
- **Error: too many arguments**
  - Solution: Remove extra arguments and follow the command format as in the example.
- **Error: unexpected token**
  - Solution: Check for unwanted spaces or characters, especially in method and argument names.
- **Error: unclosed quotes**
  - Solution: Make sure all quotes are properly opened and closed in strings.
- **Error: misplaced backslash**
  - Solution: Use `\` only to break lines in long commands, with no extra spaces after the backslash.
