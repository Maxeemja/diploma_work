import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpErrorResponse,
  HttpHandlerFn,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { HandleErrorService } from '../../services/handle-error.service';

export const handleErrorsInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const errorService = inject(HandleErrorService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      console.log(err);
      errorService.handleError(err);
      return throwError(() => err);
    })
  );
};
