import { Routes } from '@angular/router';
import { CreateEditComponent } from './components/create-edit/create-edit.component';
import { HomeComponent } from './components/home/home.component';
import { LoginRegisterComponent } from './components/login-register-form/login-register-form.component';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { IsUserAdminGuard } from './shared/guards/is-user-admin.guard';
import { AdminEmailsComponent } from './components/admin-emails/admin-emails.component';

export const routes: Routes = [
  {
    path: '',
    canActivateChild: [IsAuthenticatedGuard],
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'create',
        component: CreateEditComponent,
      },
      {
        path: 'edit/:id',
        component: CreateEditComponent,
      },
      {
        path: 'admin-panel',
        component: AdminPageComponent,
        canActivate: [IsUserAdminGuard],
      },
      {
        path: 'admin-panel/emails',
        component: AdminEmailsComponent,
        canActivate: [IsUserAdminGuard],
      },
    ],
  },
  { path: 'login', component: LoginRegisterComponent },
  { path: 'register', component: LoginRegisterComponent },
];
