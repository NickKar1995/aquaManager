import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cages',
    pathMatch: 'full',
  },
  {
    path: 'cages',
    // loadComponent: () =>
    //   import('./components/cage-management/cage-management.component').then(
    //     (m) => m.CageManagementComponent,
    //   ),
  },
];
