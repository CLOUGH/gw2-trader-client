import { Component, OnInit } from '@angular/core';
import { Item } from '../../../../shared/models/item';
import { ItemService } from '../../../../shared/services/item/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  public items: Array<Item> = [];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.syncItemPrices();
  }

  syncItemPrices() {
    this.itemService.syncItemPrices().subscribe(items => {
      this.items = items;
    });
  }
}
