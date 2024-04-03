import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpHandlerFn,
} from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, tap } from 'rxjs/operators';

export const spinnerLoadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const spinner = inject(NgxSpinnerService);
  const start = performance.now();

  showLoader();

  return next(req).pipe(
    tap(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          onEnd();
        }
      },
      (err: any) => {
        onEnd();
      }
    ),
    finalize(() => {
      onEnd();
    })
  );

  function onEnd(): void {
    hideLoader();
  }

  function showLoader(): void {
    spinner.show();
  }

  function hideLoader(): void {
    spinner.hide();
  }
};
