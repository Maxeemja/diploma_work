import { Routes } from '@angular/router';
import { CreateEditComponent } from './components/create-edit/create-edit.component';
import { HomeComponent } from './components/home/home.component';
import { LoginRegisterComponent } from './components/login-register-form/login-register-form.component';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { IsUserAdminGuard } from './shared/guards/is-user-admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'create',
    component: CreateEditComponent,
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: 'edit/:id',
    component: CreateEditComponent,
    canActivate: [IsAuthenticatedGuard],
  },
  { path: 'login', component: LoginRegisterComponent },
  { path: 'register', component: LoginRegisterComponent },
  {
    path: 'admin-panel',
    component: AdminPageComponent,
    canActivate: [IsAuthenticatedGuard, IsUserAdminGuard],
  },
];
