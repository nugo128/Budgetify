import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObligatoryComponent } from '../pages/obligatory/obligatory.component';
import { ObligatoryResolver } from '../services/obligatory-resolver.service';
import { AccountResolver } from '../services/account-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ObligatoryComponent,
    resolve: {
      obligatory: ObligatoryResolver,
      account: AccountResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObligatoryRoutingModule {}
