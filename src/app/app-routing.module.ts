import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SentimentComponent } from './pages/sentiment/sentiment.component';

const routes: Routes = [
  {
    path: 'sentiment/:symbol',
    component: SentimentComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
