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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
