import { Component, OnInit, Signal, inject } from '@angular/core';

import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

import { injectPublicKey } from "@heavy-duty/wallet-adapter";

import { derivedAsync } from "ngxtension/derived-async";

import { ShyftApiService } from "../core/services/shyft-api.service";


@Component({
  standalone: true,
  selector: 'app-continue',
  imports: [
      MatAnchor
    , MatListModule
    , MatButtonModule
    , MatGridListModule
    , MatDividerModule
  ],
  template: `
    <section>
      <!-- @if (nfts().length == 0 || nfts().every((n) => n.trait_type)) { -->
      @if (false) {
        Not started yet
      } @else {

        <mat-list>
          @for (nft of nfts(); track nft) {
            <div mat-subheader>Folders</div>
            <mat-list-item>
              <div matListItemTitle>{{nft.name}}</div>

              <mat-grid-list cols="3" rowHeight="2:1">
                <mat-grid-tile>
                  <button mat-raised-button color="blue" type="button" (click)="onMint(1)">
                    <img src="assets/" />
                  </button>
                </mat-grid-tile>
              </mat-grid-list>
            </mat-list-item>
            <mat-divider></mat-divider>
          }
        </mat-list>

        for each start_key && not used
        if nfts[0].attributes.type == start_key && !nfts[0].attributes.used =>
          Choose
          * portal 1
          * portal 2
          =>
            mint continue_key
        
        if nfts[1].attributes.type == continue_key && !nfts[0].attributes.used =>
          selected start_key value
          final portal

        if nfts[1].attributes.type == continue_key && nfts[0].attributes.used =>
          if ruta == key1 & portal1 ||
             ruta == key2 & portal2 ||
             ruta == key3 & portal2 => Claim Treasure
          else
            Nothing try with other choices
      }
    </section>
  `
})

export class ContinueComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _publicKey = injectPublicKey();

  readonly nfts = derivedAsync(() =>
    this._shyftApiService.getAllNFT(this._publicKey()?.toBase58())
  );

  onMint(n: number) {

  };
}
