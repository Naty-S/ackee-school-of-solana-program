import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { map, of } from 'rxjs';

import { NFTS } from '../models/transactions.model';


@Injectable({ providedIn: "root" })
export class ShyftApiService {

  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _key = "7c89JUFN8-tljDsA";
  private readonly _header = { "x-api-key": this._key };


  /*  */
  mint(publicKey: string | undefined | null) {

    if (!publicKey) return of(null);

    const url = new URL('https://api.shyft.to/sol/v1/nft/create_detach');

    url.searchParams.set('network', 'devnet');
    url.searchParams.set('wallet', publicKey); // sender
    url.searchParams.set('master_nft_address', ''); // address of the NFT
    url.searchParams.set('receiver', publicKey);

    const res = this._httpClient.get<any>(url.toString(), { headers: this._header })
      .pipe(map((response) => response.result));

    return res;
  };

  /*  */
  getAllNFT(publicKey: string | undefined | null){

    if (!publicKey) return of(null);

    const url = new URL('https://api.shyft.to/sol/v1/nft/read_all');

    url.searchParams.set('network', 'devnet');
    url.searchParams.set('address', publicKey);
    // url.searchParams.set('update_authority', publicKey);

    const nfts = this._httpClient.get<NFTS>(url.toString(), { headers: this._header })
      .pipe(map((response) => response.result));

    return nfts;
  };

  /*  */
  getEndpoint() {
    const url = new URL("https://devnet-rpc.shyft.to");

    url.searchParams.set("api_key", this._key);

    return url.toString();
  };
};
