import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { RegisterComponent } from './pages/register/register.component';
import { ErrorComponent } from './pages/error/error.component';
import { MainPageComponent } from './layouts/main-page/main-page.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { PiggyBankComponent } from './components/piggy-bank/piggy-bank.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import { ObligatoryComponent } from './pages/obligatory/obligatory.component';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AuthGuard } from './auth-guard';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PasswordInputComponent,
    RegisterComponent,
    ErrorComponent,
    MainPageComponent,
    HeaderComponent,
    CardComponent,
    SearchComponent,
    TransactionComponent,
    AddButtonComponent,
    PiggyBankComponent,
    SubscriptionsComponent,
    ObligatoryComponent,
    StatisticComponent,
    CategoriesComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatDialogModule,
  ],
  providers: [AuthGuard, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
