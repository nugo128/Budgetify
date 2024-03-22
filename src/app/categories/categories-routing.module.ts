import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from '../pages/categories/categories.component';
import { CategoryResolver } from '../services/category-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    resolve: {
      category: CategoryResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
