import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../../shared/services/item/item.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  constructor(private itemService: ItemService, private activatedRoute: ActivatedRoute) { }
  public item;

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.data);
    this.item = this.activatedRoute.snapshot.data['item'];
  }

}
