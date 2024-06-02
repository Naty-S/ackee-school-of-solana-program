import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

import { injectPublicKey } from "@heavy-duty/wallet-adapter";

import { StartComponent } from "../features/start-section.component";
import { ContinueComponent } from "../features/continue-section.component";
import { TreasuresComponent } from "../features/treasures-section.component";


@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
      CommonModule
    , MatAnchor
    , MatButtonModule
    , MatGridListModule
    , MatCardModule
    , StartComponent
    , ContinueComponent
    , TreasuresComponent
  ],
  template: `
    <section>
      <h2 class="text-center text-3xl">Home</h2>
      
      @if (!this._publicKey()) {
      
        <mat-card>
          <mat-card-header>
            <mat-card-title>Connect Wallet</mat-card-title>
          </mat-card-header>
        </mat-card>
      
      } @else {

        <mat-grid-list cols="3" rowHeight="2:1">
          <mat-grid-tile>
            <button mat-raised-button color="primary" type="button" (click)="onStart()">
              Start
            </button>
          </mat-grid-tile>
          <mat-grid-tile>
            <button mat-raised-button color="primary" type="button" (click)="onContinue()">
              Continue
            </button>
          </mat-grid-tile>
          <mat-grid-tile>
            <button mat-raised-button color="primary" type="button" (click)="onTreasures()">
              Treasures
            </button>
          </mat-grid-tile>
        </mat-grid-list>
      
        @if (start) { <app-start /> }
        @else if (continue) { <app-continue /> }
        @else if (treasures) { <app-treasures /> }
      }
    </section>
  `
})
export class HomeComponent {
  
  readonly _publicKey = injectPublicKey();

  start = false;
  continue = false;
  treasures = false;

  onStart() {
    this.start = true;
    this.continue = false;
    this.treasures = false;
  };

  onContinue() {
    this.start = false;
    this.continue = true;
    this.treasures = false;
  };

  onTreasures() {
    this.start = false;
    this.continue = false;
    this.treasures = true;
  };
};
