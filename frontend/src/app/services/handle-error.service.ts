import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  private toastr = inject(ToastrService);

  public handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error.message) {
      this.toastr.error(err.error.message);
      return;
    }

    if (err.error instanceof ErrorEvent) {
      errorMessage = `Виникла помилка: ${err.error.message}`;
    } else {
      switch (err.status) {
        case 400:
          errorMessage = `${err.status}: Поганий запит.`;
          this.toastr.error(errorMessage);
          break;
        case 401:
          errorMessage = `${err.status}: Ви не авторизовані для виконання цієї дії.`;
          this.toastr.error(errorMessage);
          break;
        case 403:
          errorMessage = `${err.status}: У вас немає дозволу на доступ до потрібного ресурсу.`;
          this.toastr.error(errorMessage);
          break;
        case 404:
          errorMessage = `${err.status}: Потрібний ресурс не існує.`;
          this.toastr.error(errorMessage);
          break;
        case 412:
          errorMessage = `${err.status}: Попередня умова не виконана.`;
          this.toastr.error(errorMessage);
          break;
        case 500:
          errorMessage = `${err.status}: Внутрішня помилка сервера.`;
          this.toastr.error(errorMessage);
          break;
        case 503:
          errorMessage = `${err.status}: Потрібна послуга недоступна.`;
          this.toastr.error(errorMessage);
          break;
        default:
          errorMessage = `Щось пішло не так :( Можливо сервер вмер`;
          this.toastr.error(errorMessage);
      }
    }
  }
}
