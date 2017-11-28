import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'trading-post', loadChildren: './modules/trading-post/trading-post.module#TradingPostModule' },
  { path: '', loadChildren: './modules/home/home.module#HomePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
