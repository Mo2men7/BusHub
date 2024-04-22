import { ApplicationConfig } from '@angular/core';
import { provideRouter ,withComponentInputBinding, withViewTransitions} from '@angular/router';

import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
// !
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
// !

export const appConfig: ApplicationConfig = {
  // providers: [provideRouter(routes)]
  providers: [importProvidersFrom(HttpClientModule), provideRouter(routes),withComponentInputBinding(), withViewTransitions()),provideHttpClient()],
  providers: [provideRouter(routes),provideHttpClient()]
};
