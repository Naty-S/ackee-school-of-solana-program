import { Component, OnInit, inject } from '@angular/core';

import { injectPublicKey } from "@heavy-duty/wallet-adapter";

import { derivedAsync } from "ngxtension/derived-async";

import { ShyftApiService } from "../core/services/shyft-api.service";


@Component({
  standalone: true,
  selector: 'app-treasures',
  template: `
    <section>
      @if (false) {
        No treasures found yet
      } @else {

        for each treasure
        nfts[2].attributes_array[0].trait_type == treasure =>
          Adventure

            Key1, portal1
          
          Tresure
      }
    </section>
  `
})

export class TreasuresComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _publicKey = injectPublicKey();

  readonly nfts = derivedAsync(() =>
    this._shyftApiService.getAllNFT(this._publicKey()?.toBase58())
  );
}
