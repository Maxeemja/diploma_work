import { Routes } from '@angular/router';
import { CreateEditComponent } from './components/create-edit/create-edit.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreateEditComponent },
  { path: 'edit/:id', component: CreateEditComponent },
];
