import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObligatoryComponent } from '../pages/obligatory/obligatory.component';

const routes: Routes = [{ path: '', component: ObligatoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObligatoryRoutingModule {}
