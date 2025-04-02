import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'rep',
    loadComponent: () =>
      import('./rep/repositories-list/repositories-list.component').then(m => m.RepositoriesListComponent),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'rep',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
