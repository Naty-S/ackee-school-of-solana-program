import { Component, OnInit, inject } from '@angular/core';

import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

import * as web3 from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";

import {
  injectWallet,
  injectConnection,
  provideWalletAdapter,
  injectTransactionSender
} from '@heavy-duty/wallet-adapter';

import {IDL, type AnchorProject} from "../shared/anchor_project";
import { ShyftApiService } from '../core/services/shyft-api.service';



@Component({
  standalone: true,
  selector: 'app-start',
  imports: [
      MatAnchor
    , MatButtonModule
    , MatGridListModule
  ],
  template: `
    <section>
      <mat-grid-list cols="3" rowHeight="1:1">
        <mat-grid-tile>
          <button mat-raised-button color="blue" type="button" (click)="onMint(1)">
            <img src="assets/K01.png" class="w-64"/>
          </button>
        </mat-grid-tile>
        <mat-grid-tile>
          <button mat-raised-button color="blue" type="button" (click)="onMint(2)">
            <img src="assets/K02.png" class="w-64"/>
          </button>
        </mat-grid-tile>
        <mat-grid-tile>
          <button mat-raised-button color="blue" type="button" (click)="onMint(3)">
            <img src="assets/K03.png" class="w-64"/>
          </button>
        </mat-grid-tile>
      </mat-grid-list>
    </section>
  `
})

export class StartComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  private readonly _shyftApiService = inject(ShyftApiService);
  readonly _wallet = injectWallet();
  readonly _wallet2 = injectWallet();
  readonly _connection = new web3.Connection(this._shyftApiService.getEndpoint());
  readonly _connection2 = injectConnection();
  readonly _tx = injectTransactionSender();
  readonly _provider = provideWalletAdapter();

  // Configure the client to use the local cluster
  // readonly provider = new anchor.AnchorProvider(this._connection, this._wallet, {});
  readonly provider = anchor.setProvider(anchor.AnchorProvider.env());
  readonly program = new anchor.Program(IDL, "3kAVGR8RrGNnutMWiVYi2DVs12NuhKhtKGQpn1TPQy7V");


  async onMint(n: number) {

    // anchor.setProvider(this.provider);

    const startKey = new web3.Keypair();

    const startKeyBuffer = startKey.publicKey.toBuffer()
    const [startKeyMintPubKey] = web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("lucky_mint", "utf-8"),
        startKeyBuffer,
      ],
      this.program.programId
    );

    await this.program.methods.mintKey(startKey.publicKey, new anchor.BN(0))
      .accounts({
        systemProgram: web3.SystemProgram.programId,
        authority: this.program.provider.publicKey,
        payer: this.program.provider.publicKey,
        luckyKey: startKey.publicKey,
        mint: startKeyMintPubKey,
      })
      .signers([startKey])
      .rpc();
    
    const key = await this.program.account.luckyKey.fetch(startKey.publicKey);

    console.log(key)
  };
}
