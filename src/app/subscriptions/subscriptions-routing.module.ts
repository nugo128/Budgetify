import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionsComponent } from '../pages/subscriptions/subscriptions.component';
import { AccountResolver } from '../services/account-resolver.service';
import { SubscriptionResolver } from '../services/subscription-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionsComponent,
    resolve: {
      account: AccountResolver,
      subscription: SubscriptionResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionsRoutingModule {}
