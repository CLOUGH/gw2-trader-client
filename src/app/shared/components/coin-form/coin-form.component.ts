import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-coin-form',
  templateUrl: './coin-form.component.html',
  styleUrls: ['./coin-form.component.scss']
})
export class CoinFormComponent implements OnInit {
  public copper: Number = 0;
  public silver: Number = 0;
  public gold: Number = 0;
  public isNegative: Boolean = false;

  @Input()
  set coins(coins) {
    this.copper = this.getCopper(coins);
    this.silver = this.getSilver(coins);
    this.gold = this.getGold(coins);
    this.isNegative = coins < 0;
  }
  @Output() coinsChange = new EventEmitter<Number>();


  constructor() { }

  ngOnInit() {
  }

  getCopper(coins) {
    return Math.floor(Math.abs(coins) % 100);
  }

  getSilver(coins) {
    return Math.floor((Math.abs(coins) % 10000) / 100);
  }

  getGold(coins) {
    return Math.floor(Math.abs(coins) / 10000);
  }

}
