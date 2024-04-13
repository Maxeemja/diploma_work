import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { spinnerLoadingInterceptor } from './shared/interceptors/spinner-loading.interceptor';
import { handleErrorsInterceptor } from './shared/interceptors/handle-errors.interceptor';
import { authInterceptor } from './shared/interceptors/auth-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr({ timeOut: 7000, positionClass: 'toast-bottom-left' }),
    provideHttpClient(
      withInterceptors([
        spinnerLoadingInterceptor,
        handleErrorsInterceptor,
        authInterceptor,
      ])
    ),
  ],
};
