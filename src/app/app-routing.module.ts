import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ErrorComponent } from './pages/error/error.component';
import { MainPageComponent } from './layouts/main-page/main-page.component';
import { HeaderComponent } from './components/header/header.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import { ObligatoryComponent } from './pages/obligatory/obligatory.component';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AuthGuard } from './auth-guard';
import { DialogComponent } from './components/dialog/dialog.component';
import { EditTransactionDialogComponent } from './components/edit-transaction-dialog/edit-transaction-dialog.component';

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
        component: CategoriesComponent,
      },
      {
        path: 'subscriptions',
        component: SubscriptionsComponent,
      },
      {
        path: 'obligatory',
        component: ObligatoryComponent,
      },
      {
        path: 'statistic',
        component: StatisticComponent,
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
