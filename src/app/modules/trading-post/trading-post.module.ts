import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';

import { TradingPostRoutingModule } from './trading-post-routing.module';
import { ItemDetailComponent } from './pages/item-detail/item-detail.component';
import { ItemComponent } from './components/item/item.component';
import { ItemListComponent } from './pages/item-list/item-list.component';
import { ItemService } from '../../shared/services/item/item.service';

@NgModule({
  imports: [
    CommonModule,
    TradingPostRoutingModule,
    NgbModule.forRoot(),
    HttpModule
  ],
  providers: [ItemService],
  declarations: [ItemComponent, ItemDetailComponent, ItemListComponent]
})
export class TradingPostModule { }
