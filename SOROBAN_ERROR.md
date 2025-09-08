badgenft:
oracleadapter:

# Technical Report: Soroban SDK Build Error + Rust 1.81.0

## Problem Summary

When attempting to compile Soroban contracts to WASM using Rust 1.81.0 and Soroban SDK (tested on versions 21, 22, 23.0.0-rc.2), an error occurs related to the transitive dependency `base64ct v1.8.0`, which requires `edition2024` from Cargo/Rust. Rust 1.81.0 does not support this edition, resulting in a build failure.

## Project Context
- **Workspace:** KALE Syndicate
- **Contracts:** syndicatemanager, badgenft, oracleadapter
- **SDK:** soroban-sdk (tested on versions 21, 22, 23.0.0-rc.2)
- **Rust:** 1.81.0 (pinned via rust-toolchain.toml)
- **Reason for Rust 1.81.0:** Avoid WASM reference types bug introduced in Rust 1.82+ (not supported by Soroban VM)
- **Build:** Soroban CLI (`soroban contract build`), cargo build --target wasm32-unknown-unknown

## Error Message
```
error: failed to download `base64ct v1.8.0`
Caused by:
  failed to parse manifest at `/home/user/.cargo/registry/src/index.crates.io-6f17d22bba15001f/base64ct-1.8.0/Cargo.toml`
Caused by:
  feature `edition2024` is required
  The package requires the Cargo feature called `edition2024`, but that feature is not stabilized in this version of Cargo (1.81.0 ...)
```

## Diagnosis
- The error occurs because Soroban SDK (or its transitive dependencies) is pulling in `base64ct v1.8.0`, which requires `edition2024`.
- The patch/crates-io approach does not work to force a version downgrade, as it does not replace dependencies from crates.io itself.
- Adding `base64ct = "1.7.3"` explicitly to the contracts' `Cargo.toml` does not solve the issue, as transitive dependencies ignore this pin.
- Clearing the cargo cache (`rm -rf ~/.cargo/registry/src/index.crates.io-*/base64ct-1.8.0`) does not solve it, as the build re-downloads the incompatible version.
- The error occurs even when using Soroban SDK 21 and 22.
- The lockfile (`Cargo.lock`) was removed and updated several times.
- Both Soroban CLI and plain cargo builds fail in the same way.

## Additional Context
- The WASM reference types bug occurs in Rust 1.82+ (hence pinned to 1.81.0).
- Newer Soroban SDK requires Rust 1.84.0, but this breaks WASM deploy on Soroban VM.
- The project follows all official doc recommendations: `#![no_std]`, `crate-type = ["cdylib"]`, build via Soroban CLI, aligned dependencies.
- The error is recurring and blocks any build/deploy of Soroban contracts.


## Attempt History and Diagnosis

### Step 0 — Rust Guarantee
- Rust pinned to 1.81.0 via rust-toolchain.toml and rustup override.

### Step 1 — Global pin of base64ct
- Added `[patch.crates-io] base64ct = { version = "=1.7.0" }` and then `=1.7.3` to the workspace Cargo.toml.
- Ran `cargo update -p base64ct --precise 1.7.3`.
- Result: error, as patch/crates-io does not work to pin a version already published on crates.io.

### Step 2 — Downgrade upstream
- Added patch for common upstream packages (`elliptic-curve`, `p256`, `ed25519`, `signature`) in the workspace Cargo.toml.
- Ran update commands for each package.
- Result: error, as patch/crates-io does not work for crates.io, only for different sources (git/local path).

### Step 3 — Clean and rebuild
- Removed lockfile, cleaned cache, ran cargo update and tried to build.
- Result: error persists, as transitive dependencies keep pulling base64ct v1.8.x.

### Diagnosis
- The command `cargo tree -i base64ct` does not work because the base64ct v1.8.x error prevents graph resolution.
- Transitive dependencies ignore explicit pin and global patch for crates.io.

### Conclusion
- patch/crates-io cannot be used to pin versions already published on crates.io.
- The problem cannot be solved with just patch/crates-io or explicit dependency.
- A definitive solution requires forking or local patching of upstream packages, or updating Rust.

### Suggested Alternatives
- Fork upstream packages and use a local patch.
- Update Rust to 1.84.0 and try to build (with risk of WASM reference types bug).
- Open an issue in the repositories of the involved packages.

## Suggestions for AI/Specialist
- Investigate if there is any way to force Soroban SDK (or its dependencies) to use `base64ct` < 1.8.0 on Rust 1.81.0
- Suggest a workaround for building WASM compatible with Soroban VM without reference types
- Indicate if there is a version of Soroban SDK/CLI that works with Rust 1.81.0 and does not pull dependencies with edition2024
- Suggest patch, fork, or configuration to work around the problem
- Indicate if there is an official bug/issue or if a new issue needs to be opened

## Useful Links
- [Reference issue for reference types bug](https://github.com/stellar/soroban-sdk/issues)
- [Official Soroban docs](https://developers.stellar.org/docs/smart-contracts/get-started/)
- [base64ct crate](https://crates.io/crates/base64ct)

# Soroban Contracts - Testnet Deployment Addresses

syndicatemanager:
CBECA45FZMLWDU3AKYWM64XX6AWG67KQXHDE7Z6OH2EU4ZACBEVHE5JZ


CCQ2KFJHY7LXRMVTQZGZC7VO52DESMRLPN22ANBMKUJNSILH7MKTOCC7

## Observação
CCB27OLJ67J3SJYABX26N4IIOMWCKVJVY6YCFOE4WENC4JFW7OUN2JYN

# Explorer links
- syndicatemanager: https://stellar.expert/explorer/testnet/contract/CBECA45FZMLWDU3AKYWM64XX6AWG67KQXHDE7Z6OH2EU4ZACBEVHE5JZ
- badgenft: https://stellar.expert/explorer/testnet/contract/CCQ2KFJHY7LXRMVTQZGZC7VO52DESMRLPN22ANBMKUJNSILH7MKTOCC7
- oracleadapter: https://stellar.expert/explorer/testnet/contract/CCB27OLJ67J3SJYABX26N4IIOMWCKVJVY6YCFOE4WENC4JFW7OUN2JYN
Esse relatório foi gerado por uma AI (GitHub Copilot) após diversas tentativas de correção automática e manual, sem sucesso. O problema parece estar no ecossistema de dependências do Soroban SDK e sua compatibilidade com Rust estável.
