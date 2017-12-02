import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})
export class CoinComponent implements OnInit {

  @Input() public coins: Number;
  public copper: Number = 0;
  public silver: Number = 0;
  public gold: Number = 0;

  constructor() { }

  ngOnInit() {
    this.copper = this.getCopper(this.coins);
    this.silver = this.getSilver(this.coins);
    this.gold = this.getGold(this.coins);
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
