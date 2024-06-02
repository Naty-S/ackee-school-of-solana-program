import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { MatAnchor, MatButtonModule } from '@angular/material/button';

import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { ConnectionStore } from '@heavy-duty/wallet-adapter';

import { ShyftApiService } from './core/services/shyft-api.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
      RouterLink
    , RouterOutlet
    , HdWalletMultiButtonComponent
    , MatAnchor
    , MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _connectionStore = inject(ConnectionStore);

  
  ngOnInit() {
    this._connectionStore.setEndpoint(this._shyftApiService.getEndpoint());
  }

};
