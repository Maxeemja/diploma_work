import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Toast, ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  constructor(private toaster: ToastrService) {}
  // public handleError(err: HttpErrorResponse) {
  //   let errorMessage: string;
  //   if (err.error instanceof ErrorEvent) {
  //     errorMessage = `An error occurred: ${err.error.message}`;
  //   } else {
  //     // The backend returned an unsuccessful response.
  //     errorMessage = 'Something Went Wrong';
  //     this.toaster.error(errorMessage, 'Error');
  //   }
  // }

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
        break;
      case 401:
        errorMessage = `${err.status}: You are unauthorized to do this action.`;
        break;
      case 403:
        errorMessage = `${err.status}: You don't have permission to access the requested resource.`;
        break;
      case 404:
        errorMessage = `${err.status}: The requested resource does not exist.`;
        break;
      case 412:
        errorMessage = `${err.status}: Precondition Failed.`;
        break;
      case 500:
        errorMessage = `${err.status}: Internal Server Error.`;
        break;
      case 503:
        errorMessage = `${err.status}: The requested service is not available.`;
        break;
      default:
        errorMessage = `Something went wrong! Probably server is dead`;
        this.toaster.error(errorMessage);
    }
  }
}