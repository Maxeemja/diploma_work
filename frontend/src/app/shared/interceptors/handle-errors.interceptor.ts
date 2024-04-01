import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HandleErrorService } from '../../services/handle-error.service';

@Injectable()
export class HandleErrorsInterceptor implements HttpInterceptor {
  constructor(private errorService: HandleErrorService) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return new Observable((observer) => {
      next.handle(req).subscribe(
        (res: HttpEvent<any>) => {
          if (res instanceof HttpResponse) {
            observer.next(res);
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          this.errorService.handleError(err);
        }
      );
    });
  }
}
