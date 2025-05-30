import { Routes } from '@angular/router';
import { TransactionListComponent } from './components/home/components/transactions/components/transaction-list/transaction-list.component';
import { TransactionComponent } from './components/home/components/transactions/components/transaction/transaction.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './core/auth/auth.guard';

export const MAIN_PATHS = {
  DEFAULT: '',
  LOGIN: 'login',
  TRANSACTIONS: 'transactions',
};

export const routes: Routes = [
  {
    path: MAIN_PATHS.DEFAULT,
    redirectTo: MAIN_PATHS.TRANSACTIONS,
    pathMatch: 'full',
  },
  {
    path: MAIN_PATHS.TRANSACTIONS,
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: TransactionListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        component: TransactionComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  {
    path: MAIN_PATHS.LOGIN,
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: MAIN_PATHS.LOGIN,
  },
];
