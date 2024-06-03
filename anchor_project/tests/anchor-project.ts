import * as anchor from "@coral-xyz/anchor";
import * as web3 from "@solana/web3.js";
import { BN } from "bn.js";
import { assert } from "chai";

import { AnchorProject } from "../target/types/anchor_project";


describe("anchor-project", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.AnchorProject as anchor.Program<AnchorProject>;
  const hunter1 = anchor.web3.Keypair.generate();
  const hunter2 = anchor.web3.Keypair.generate();
  const startKey = anchor.web3.Keypair.generate();
  const portal1 = 1;
  const portal2 = 2;


  it("Start hunting with starter Key", async () => {

    const [key_pkey, key_bump] = getKeyAddress(startKey.publicKey, hunter1.publicKey, program.programId);

    await airdrop(provider.connection, hunter1.publicKey);

    await program.methods.getKey(key_pkey)
      .accounts({
        systemProgram: anchor.web3.SystemProgram.programId,
        hunter: hunter1.publicKey,
        luckyKey: key_pkey,
      })
      .signers([hunter1])
      .rpc({ commitment: "confirmed" });

    await checkKey(program, key_pkey, hunter1.publicKey, startKey.publicKey, key_bump, false, 0);
  });

  it("Hunter can use Key to open Portal", async () => {

    const [key_pkey, key_bump] = getKeyAddress(startKey.publicKey, hunter1.publicKey, program.programId);
    const [usekey_pkey, usekey_bump] = getUseKeyAddress(startKey.publicKey, hunter1.publicKey, program.programId);

    await program.methods.useKey(new anchor.BN(portal1))
      .accounts({
        systemProgram: anchor.web3.SystemProgram.programId,
        luckyKey: key_pkey,
      })
      .signers([hunter1])
      .rpc({ commitment: "confirmed" });

  });

  it("Hunter can claim Treasure", async () => {

  });

  it("Hunter2 can't claim Hunter1's Treasure", async () => {

  });
});


class SolanaError {
  static contains(logs, error): boolean {
    const match = logs?.filter(s => s.includes(error));
    return Boolean(match?.length)
  }
}


async function airdrop(connection: any, address: any, amount = 1000000000) {
  await connection.confirmTransaction(await connection.requestAirdrop(address, amount), "confirmed");
}


function getKeyAddress(link: web3.PublicKey, hunter: web3.PublicKey, programID: web3.PublicKey) {
  return web3.PublicKey.findProgramAddressSync(
    [
      link.toBuffer(),
      anchor.utils.bytes.utf8.encode("lucky_key"),
      hunter.toBuffer()
    ], programID);
}

async function checkKey(
  program: anchor.Program<AnchorProject>,
  key: web3.PublicKey,
  hunter: web3.PublicKey,
  link: web3.PublicKey,
  bump: number,
  used: boolean,
  portal: number
) {
  let keyData = await program.account.luckyKey.fetch(key);

  assert.strictEqual(keyData.hunter.toString(), hunter.toString());
  assert.strictEqual(keyData.link.toString(), link.toString());
  assert.strictEqual(keyData.link.toString(), link.toString());
  assert.strictEqual(keyData.bump.toString(), bump.toString());
  assert.strictEqual(keyData.used.toString(), used.toString());
  assert.strictEqual(keyData.portal.toString(), portal.toString());
}
