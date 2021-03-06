import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})
export class CoinComponent implements OnInit {

  public copper: Number = 0;
  public silver: Number = 0;
  public gold: Number = 0;
  public isNegative: Boolean = false;

  @Input()
  set coins(coins: Number) {
    this.copper = this.getCopper(coins);
    this.silver = this.getSilver(coins);
    this.gold = this.getGold(coins);
    this.isNegative = coins < 0;
  }

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
