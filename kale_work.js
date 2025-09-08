// kale_work.js
import fetch from "node-fetch";
import pkg from "js-sha3";
import { StrKey } from "@stellar/stellar-sdk";

const { keccak256 } = pkg;

// CONFIG
const rpcUrl = "https://soroban-testnet.stellar.org";
const homesteadId = "CCSAET53SBW3MAKHP4TFVMAKRAHPYYXTK6C7OW74INJTUFX3WDRZFVKJ"; // sua fazenda
const farmer = "GBO4HJ4JHHMSZQ2UQ26YBROXQ6GDDZWMDANKBOKLNDRERTGPUP2J3Z55"; // sua conta pública (só usada pro cálculo do hash)
const identity = "minha-conta"; // alias criado no stellar-cli

// Converter endereço → últimos 32 bytes
function addressToLast32(address) {
  const raw = StrKey.decodeEd25519PublicKey(address);
  return Buffer.from(raw).slice(-32);
}

// Pegar hash do último ledger via RPC
async function getLatestLedgerHash() {
  const body = { jsonrpc: "2.0", id: 1, method: "getLatestLedger" };

  console.log("📤 Enviando request RPC:", JSON.stringify(body, null, 2));

  const res = await fetch(rpcUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  console.log("📥 Resposta bruta do RPC:", JSON.stringify(data, null, 2));

  if (!data.result?.id) {
    throw new Error("❌ Resposta inesperada do RPC: " + JSON.stringify(data));
  }

  console.log("✅ ledgerId usado como entropy:", data.result.id);
  return data.result.id; // string hex (64 chars)
}

async function generateWorkCommand() {
  // 1. Ledger hash = entropy
  const entropyHex = await getLatestLedgerHash();
  const entropy = Buffer.from(entropyHex, "hex");

  // 2. index = 0 (primeiro farming), nonce aleatório
  const index = 0;
  const nonce = Math.floor(Math.random() * 1e12);

  console.log("➡️ Usando index:", index, "nonce:", nonce);

  // 3. Montar buffer de 76 bytes (index + nonce + entropy + farmer raw)
  const buf = Buffer.alloc(76);
  buf.writeUInt32BE(index, 0);
  buf.writeBigUInt64BE(BigInt(nonce), 4);
  entropy.copy(buf, 12, 0, 32);
  addressToLast32(farmer).copy(buf, 44);

  console.log("🧩 Buffer montado (hex):", buf.toString("hex"));

  // 4. Calcular hash (hex, 64 chars)
  const hashHex = keccak256(buf);
  console.log("🔑 Hash calculado (hex):", hashHex);

  // 5. Exibir comandos prontos (plant, work, harvest)
  console.log("\n🌱 Para plantar (inicializar):\n");
  console.log(`stellar contract invoke \\`);
  console.log(`  --id ${homesteadId} \\`);
  console.log(`  --source ${identity} \\`);
  console.log(`  --network testnet \\`);
  console.log(`  -- \\`);
  console.log(`  plant --amount 0`);

  console.log("\n⛏️ Para trabalhar (work):\n");
  console.log(`stellar contract invoke \\`);
  console.log(`  --id ${homesteadId} \\`);
  console.log(`  --source ${identity} \\`);
  console.log(`  --network testnet \\`);
  console.log(`  -- \\`);
  console.log(`  work --hash ${hashHex} --nonce ${nonce}`);

  console.log("\n🌾 Para colher (harvest, substitua <index>):\n");
  console.log(`stellar contract invoke \\`);
  console.log(`  --id ${homesteadId} \\`);
  console.log(`  --source ${identity} \\`);
  console.log(`  --network testnet \\`);
  console.log(`  -- \\`);
  console.log(`  harvest --index <u32>`);
}

generateWorkCommand().catch(console.error);
