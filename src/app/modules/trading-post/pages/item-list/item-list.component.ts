import { Component, OnInit } from '@angular/core';
import { Item } from '../../../../shared/models/item';
import { ItemService } from '../../../../shared/services/item/item.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  public items: Array<Item> = [];
  public itemSync;
  public filter = {
    limit: 20
  };

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemSync = {
      running: false
    };

    this.itemService.getSyncMessages().subscribe(data => {
      this.itemSync = data;
      if (this.itemSync.running === false) {
        // this.toasterService.pop('success', 'Done updating items');
        this.getItems();
      }
    });

    this.getItems();
  }

  syncItemPrices() {
    this.itemService.excuteSync().subscribe(data => {
      console.log(data);
    });
  }

  getItems() {
    this.filter.limit = 20;
    this.itemService.getItems(this.filter).subscribe(items => {
      this.items = items;
    });
  }

  onFilterUpdated(event) {
    this.filter = event;
    this.getItems();
  }
}
