import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ItemListComponent } from './pages/item-list/item-list.component';
import { ItemDetailComponent } from './pages/item-detail/item-detail.component';
import { ItemService } from '../../shared/services/item/item.service';
import { ItemResolverService } from './item-resolver.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ItemListComponent
      },
      {
        path: ':id',
        component: ItemDetailComponent,
        resolve: {
          'item': ItemResolverService
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradingPostRoutingModule { }
