import { ApplicationConfig } from '@angular/core';
import { provideRouter ,withComponentInputBinding, withViewTransitions} from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';

import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routes } from './app.routes';
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptorService } from './services/token-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(HttpClientModule), provideRouter(routes,withComponentInputBinding(), withViewTransitions()),provideHttpClient(),CookieService],
};




