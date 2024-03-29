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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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

import { DialogComponent } from './components/dialog/dialog.component';
import { EditTransactionDialogComponent } from './components/edit-transaction-dialog/edit-transaction-dialog.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { ChipsComponent } from './components/chips/chips.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TokenInterceptor } from './token.interceptor';
import { DeleteTransactionDialogComponent } from './components/delete-transaction-dialog/delete-transaction-dialog.component';
import { PiggyDialogComponent } from './components/piggy-dialog/piggy-dialog.component';
import { EditPiggyDialogComponent } from './components/edit-piggy-dialog/edit-piggy-dialog.component';
import { AddMoneyToPiggyDialogComponent } from './components/add-money-to-piggy-dialog/add-money-to-piggy-dialog.component';
import { DeletePiggyDialogComponent } from './components/delete-piggy-dialog/delete-piggy-dialog.component';
import { AccountDialogComponent } from './components/account-dialog/account-dialog.component';
import { EditAccountDialogComponent } from './components/edit-account-dialog/edit-account-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { SubscriptionDialogComponent } from './components/subscription-dialog/subscription-dialog.component';
import { EditSubscriptionComponent } from './components/edit-subscription/edit-subscription.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { ObligatoryComponentComponent } from './components/obligatory-component/obligatory-component.component';
import { ObligatoryDialogComponent } from './components/obligatory-dialog/obligatory-dialog.component';
import { EditObligatoryDialogComponent } from './components/edit-obligatory-dialog/edit-obligatory-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MonthlyStatisticsComponent } from './pages/monthly-statistics/monthly-statistics.component';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { CategoryComponent } from './components/category/category.component';
import { AddCategoryDialogComponent } from './components/add-category-dialog/add-category-dialog.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { AdminComponent } from './pages/admin/admin.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerInterceptor } from './services/spinner-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
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
    EditTransactionDialogComponent,
    FormInputComponent,
    ChipsComponent,
    DeleteTransactionDialogComponent,
    PiggyDialogComponent,
    EditPiggyDialogComponent,
    AddMoneyToPiggyDialogComponent,
    DeletePiggyDialogComponent,
    AccountDialogComponent,
    EditAccountDialogComponent,
    SubscriptionComponent,
    SubscriptionDialogComponent,
    EditSubscriptionComponent,
    DatePickerComponent,
    ObligatoryComponentComponent,
    ObligatoryDialogComponent,
    EditObligatoryDialogComponent,
    MonthlyStatisticsComponent,
    StatisticsPageComponent,
    CategoryComponent,
    AddCategoryDialogComponent,
    AdminComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
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
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgxDropzoneModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatTableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    AuthGuard,
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
