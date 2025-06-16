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
      import('./features/fish-stocking/fish-stocking.component').then(
        (m) => m.FishStockingComponent,
      ),
  },
  {
    path: 'mortalities',
    loadComponent: () =>
      import('./features/mortalities/mortalities.component').then((m) => m.MortalitiesComponent),
  },
  {
    path: 'fish-transfers',
    loadComponent: () =>
      import('./features/fish-transfers/fish-transfers.component').then(
        (m) => m.FishTransfersComponent,
      ),
  },
  {
    path: 'daily-stock-balance',
    loadComponent: () =>
      import('./features/daily-stock-balance/daily-stock-balance.component').then(
        (m) => m.DailyStockBalanceComponent,
      ),
  },
  {
    path: 'pivot-analysis',
    loadComponent: () =>
      import('./features/pivot-analysis/pivot-analysis.component').then(
        (m) => m.PivotAnalysisComponent,
      ),
  },
];
