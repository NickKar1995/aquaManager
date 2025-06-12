import { Routes } from '@angular/router';
import { CagesComponent } from './features/cages/cages/cages.component';

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
];
