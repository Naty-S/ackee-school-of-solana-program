import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';

import { provideWalletAdapter } from '@heavy-duty/wallet-adapter';
import { HdWalletAdapterMaterialModule } from '@heavy-duty/wallet-adapter-material';

import { appRoutes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideWalletAdapter(),
    provideHttpClient(),
    importProvidersFrom([MatDialogModule, HdWalletAdapterMaterialModule])
  ],
};
