import { Routes } from '@angular/router';
import { CagesComponent } from './features/cages/cages.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cages',
    pathMatch: 'full',
  },
  {
    path: 'cages',
    component: CagesComponent,
  },
  {
    path: 'fish-stocking',
    loadComponent: () =>
      import('./features/fish-stocking/fish-stocking.component').then((m) => m.FishStockingComponent),
  },
  {
    path: 'mortalities',
    loadComponent: () =>
      import('./features/mortalities/mortalities.component').then((m) => m.MortalitiesComponent),
  },
];
