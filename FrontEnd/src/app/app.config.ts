import { ApplicationConfig } from '@angular/core';
import { provideRouter ,withComponentInputBinding, withViewTransitions} from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';

import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';

export const appConfig: ApplicationConfig = {

  providers: [importProvidersFrom(HttpClientModule), provideAnimationsAsync(), provideRouter(routes, withComponentInputBinding(), withViewTransitions()), provideHttpClient(), CookieService,   {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '1049652413342-i4veuqrlme8lbd3lj0pf6o3iamtdbmrm.apps.googleusercontent.com'
          )
        },

      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],



}



