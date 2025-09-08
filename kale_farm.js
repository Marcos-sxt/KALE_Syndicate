// kale_farm.js
import { execSync } from "child_process";
import pkg from "js-sha3";
import { StrKey } from "@stellar/stellar-sdk";

const { keccak256 } = pkg;

const contractId = "CDSWUUXGPWDZG76ISK6SUCVPZJMD5YUV66J2FXFXFGDX25XKZJIEITAO";
const farmer = "GBO4HJ4JHHMSZQ2UQ26YBROXQ6GDDZWMDANKBOKLNDRERTGPUP2J3Z55";
const identity = "minha-conta";

// Função para converter endereço em últimos 32 bytes
function addressToLast32(address) {
  const raw = StrKey.decodeEd25519PublicKey(address);
  return Buffer.from(raw).slice(-32);
}

// Função para ler uma chave do contrato via CLI
function readKey(key) {
  try {
    const output = execSync(
      `stellar contract read --id ${contractId} --key ${key} --network testnet`,
      { encoding: "utf-8" }
    );
    return output.trim();
  } catch (err) {
    console.error(`Erro lendo chave ${key}:`, err.message);
    return null;
  }
}

function generateWorkCommand() {
  // 1. Ler index e entropy via CLI
  const indexStr = readKey("FarmIndex");
  const entropyStr = readKey("Entropy");

  if (!indexStr || !entropyStr) {
    console.error("Não consegui ler FarmIndex ou Entropy do contrato.");
    return;
  }

  const index = parseInt(indexStr, 10);
  const entropy = Buffer.from(entropyStr.replace(/^0x/, ""), "hex");

  // 2. Gerar nonce aleatório
  const nonce = Math.floor(Math.random() * 1e12);

  // 3. Montar buffer
  const buf = Buffer.alloc(76);
  buf.writeUInt32BE(index, 0);
  buf.writeBigUInt64BE(BigInt(nonce), 4);
  entropy.copy(buf, 12);
  addressToLast32(farmer).copy(buf, 44);

  const hashHex = "0x" + keccak256(buf);

  // 4. Imprimir comando
  console.log("\nComando `work` gerado:\n");
  console.log(`stellar contract invoke \\`);
  console.log(`  --id ${contractId} \\`);
  console.log(`  --source ${identity} \\`);
  console.log(`  --network testnet \\`);
  console.log(`  -- \\`);
  console.log(`  work \\`);
  console.log(`  --hash ${hashHex} \\`);
  console.log(`  --nonce ${nonce} \\`);
  console.log(`  --farmer ${farmer}`);
}

generateWorkCommand();
