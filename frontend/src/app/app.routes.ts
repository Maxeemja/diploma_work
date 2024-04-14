import { Routes } from '@angular/router';
import { CreateEditComponent } from './components/create-edit/create-edit.component';
import { HomeComponent } from './components/home/home.component';
import { LoginRegisterComponent } from './components/login-register-form/login-register-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreateEditComponent },
  { path: 'edit/:id', component: CreateEditComponent },
  { path: 'login', component: LoginRegisterComponent },
  { path: 'register', component: LoginRegisterComponent },
];
