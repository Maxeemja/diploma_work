import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  constructor(private toaster: ToastrService) {}

  // Handling HTTP Errors using Toaster
  public handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
    }
    // The backend returned an unsuccessful response code.
    switch (err.status) {
      case 400:
        errorMessage = `${err.status}: Bad Request.`;
        this.toaster.error(errorMessage);
        break;
      case 401:
        errorMessage = `${err.status}: You are unauthorized to do this action.`;
        this.toaster.error(errorMessage);
        break;
      case 403:
        errorMessage = `${err.status}: You don't have permission to access the requested resource.`;
        this.toaster.error(errorMessage);
        break;
      case 404:
        errorMessage = `${err.status}: The requested resource does not exist.`;
        this.toaster.error(errorMessage);
        break;
      case 412:
        errorMessage = `${err.status}: Precondition Failed.`;
        this.toaster.error(errorMessage);
        break;
      case 500:
        errorMessage = `${err.status}: Internal Server Error.`;
        this.toaster.error(errorMessage);
        break;
      case 503:
        errorMessage = `${err.status}: The requested service is not available.`;
        this.toaster.error(errorMessage);
        break;
      default:
        errorMessage = `Something went wrong! Probably server is dead`;
        this.toaster.error(errorMessage);
    }
  }
}
