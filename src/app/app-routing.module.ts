import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ErrorComponent } from './pages/error/error.component';
import { MainPageComponent } from './layouts/main-page/main-page.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthGuard } from './auth-guard';
import { DialogComponent } from './components/dialog/dialog.component';
import { EditTransactionDialogComponent } from './components/edit-transaction-dialog/edit-transaction-dialog.component';
import { TransactionResolver } from './services/transaction-resolver.service';
import { PiggyResolver } from './services/piggy-resolver.service';
import { AccountResolver } from './services/account-resolver.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: HeaderComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: MainPageComponent,
        resolve: {
          transaction: TransactionResolver,
          piggy: PiggyResolver,
          account: AccountResolver,
        },
        children: [
          {
            path: 'transaction/:id',
            component: DialogComponent,
            children: [
              { path: 'edit', component: EditTransactionDialogComponent },
            ],
          },
        ],
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: 'subscriptions',
        loadChildren: () =>
          import('./subscriptions/subscriptions.module').then(
            (m) => m.SubscriptionsModule
          ),
      },
      {
        path: 'obligatory',
        loadChildren: () =>
          import('./obligatory/obligatory.module').then(
            (m) => m.ObligatoryModule
          ),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'statistic',
        loadChildren: () =>
          import('./statistic/statistic.module').then((m) => m.StatisticModule),
      },
    ],
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
