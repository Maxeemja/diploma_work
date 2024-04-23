import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const IsAuthenticatedGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (localStorage.getItem('token')) {
    return true;
  }
  router.navigate(['login']);
  return false;
};
