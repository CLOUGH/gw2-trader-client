import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { D3Service } from 'd3-ng2-service';

import { TradingPostRoutingModule } from './trading-post-routing.module';
import { ItemDetailComponent } from './pages/item-detail/item-detail.component';
import { ItemComponent } from './components/item/item.component';
import { ItemListComponent } from './pages/item-list/item-list.component';
import { ItemService } from '../../shared/services/item/item.service';
import { CoinComponent } from '../../shared/components/coin/coin.component';
import { FilterComponent } from './components/filter/filter.component';
import { ItemResolverService } from './item-resolver.service';
import { D3graphComponent } from '../../shared/components/d3graph/d3graph.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';

@NgModule({
  imports: [
    CommonModule,
    TradingPostRoutingModule,
    NgbModule.forRoot(),
    HttpModule,
    ToasterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ItemService, ItemResolverService, D3Service],
  declarations: [ItemComponent, ItemDetailComponent, ItemListComponent, CoinComponent, FilterComponent, D3graphComponent, LineChartComponent]
})
export class TradingPostModule { }
