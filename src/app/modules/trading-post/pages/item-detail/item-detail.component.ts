import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../../shared/services/item/item.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  public item;
  public sellPage: number;
  public buyPage: number;
  public paginationSize: number;
  public activeSellPrice: number;
  public activeBuyPrice: number;
  public buyAtProfit: number;
  public sellAtProfit: number;

  constructor(private itemService: ItemService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.data);
    this.item = this.activatedRoute.snapshot.data['item'];
    this.sellPage = 0;
    this.buyPage = 0;
    this.paginationSize = 20;
    this.activeSellPrice = this.item.sell;
    this.activeBuyPrice = this.item.buy;
  }

  startRange(page, paginationSize) {
    return (page * paginationSize) - paginationSize;
  }
  endRange(page, paginationSize) {
    return page * paginationSize;
  }

  calculateProfit(buy, sell) {
    return this.itemService.calculateProfit(buy, sell);
  }
  calculateROI(buy, sell) {
    return this.itemService.calculateROI(buy, sell);
  }

  setActiveBuyPrice(price) {
    this.activeBuyPrice = price;
  }
  setActiveSellPrice(price) {
    this.activeSellPrice = price;
  }

}
