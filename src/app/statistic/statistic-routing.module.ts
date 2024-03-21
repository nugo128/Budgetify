import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsPageComponent } from '../pages/statistics-page/statistics-page.component';
import { StatisticComponent } from '../pages/statistic/statistic.component';
import { MonthlyStatisticsComponent } from '../pages/monthly-statistics/monthly-statistics.component';

const routes: Routes = [
  {
    path: '',
    component: StatisticsPageComponent,
    children: [
      { path: 'category', component: StatisticComponent },
      { path: 'monthly', component: MonthlyStatisticsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticRoutingModule {}
