import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/home',
  //   pathMatch: 'full'
  // }
  {path : '', component : DashboardComponent},
  {path : 'chart', component : ChartsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(
      routes,
      { enableTracing: true }
  )],
  exports: [RouterModule]
})

export class AppRoutingModule { }