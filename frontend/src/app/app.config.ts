import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { HandleErrorsInterceptor } from './shared/interceptors/handle-errors.interceptor';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { SpinnerInterceptor } from './shared/interceptors/spinner-loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
    provideToastr({ timeOut: 7000, positionClass: 'toast-bottom-left' }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandleErrorsInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
  ],
};
