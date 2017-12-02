import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { ToasterModule, ToasterService } from 'angular2-toaster';

import { TradingPostRoutingModule } from './trading-post-routing.module';
import { ItemDetailComponent } from './pages/item-detail/item-detail.component';
import { ItemComponent } from './components/item/item.component';
import { ItemListComponent } from './pages/item-list/item-list.component';
import { ItemService } from '../../shared/services/item/item.service';
import { CoinComponent } from '../../shared/components/coin/coin.component';

@NgModule({
  imports: [
    CommonModule,
    TradingPostRoutingModule,
    NgbModule.forRoot(),
    HttpModule,
    ToasterModule

  ],
  providers: [ItemService],
  declarations: [ItemComponent, ItemDetailComponent, ItemListComponent, CoinComponent]
})
export class TradingPostModule { }
