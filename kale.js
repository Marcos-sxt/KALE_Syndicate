// generateWork.js
import { Server } from 'soroban-client';
import pkg from 'js-sha3';
const { keccak256 } = pkg;
import { Keypair } from '@stellar/stellar-sdk';

async function generateWorkCommand(contractId, farmerAddress) {
  const server = new Server('https://soroban-testnet.stellar.org');

  // Obter index e entropy
  const indexRaw = await server.getContractData(contractId, "FarmIndex", "persistent");
  const entropyRaw = await server.getContractData(contractId, "Entropy", "persistent");

  const index = Number(indexRaw);
  const entropy = entropyRaw.replace(/^0x/, '');

  // Nonce aleatório
  const nonce = Math.floor(Math.random() * 1e12);

  // Buffer para hash
  const buffer = Buffer.alloc(76);
  buffer.writeUInt32BE(index, 0);
  buffer.writeBigUInt64BE(BigInt(nonce), 4);
  Buffer.from(entropy, 'hex').copy(buffer, 12);

  const farmerRaw = Keypair.fromPublicKey(farmerAddress).rawPublicKey();
  farmerRaw.copy(buffer, 44);

  const hashHex = '0x' + keccak256(buffer);

  // Exibir comando pronto
  console.log('Comando `work` gerado:\n');
  console.log(`stellar contract invoke \\`);
  console.log(`  --id ${contractId} \\`);
  console.log(`  --source minha-conta \\`);
  console.log(`  --network testnet \\`);
  console.log(`  -- \\`);
  console.log(`  work \\`);
  console.log(`  --hash ${hashHex} \\`);
  console.log(`  --nonce ${nonce} \\`);
  console.log(`  --farmer ${farmerAddress}`);
}

generateWorkCommand(
  'CDSWUUXGPWDZG76ISK6SUCVPZJMD5YUV66J2FXFXFGDX25XKZJIEITAO',
  'GBO4HJ4JHHMSZQ2UQ26YBROXQ6GDDZWMDANKBOKLNDRERTGPUP2J3Z55'
);
