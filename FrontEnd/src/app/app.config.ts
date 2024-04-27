import { ApplicationConfig } from '@angular/core';
import { provideRouter ,withComponentInputBinding, withViewTransitions} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(), provideAnimationsAsync(), provideAnimationsAsync()]
  // providers: [importProvidersFrom(HttpClientModule), provideRouter(routes,withComponentInputBinding(), withViewTransitions()),provideHttpClient()],
};
