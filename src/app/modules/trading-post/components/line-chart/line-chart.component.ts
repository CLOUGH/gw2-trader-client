import {
  Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewInit, Input
} from '@angular/core';

import { TradeHistory } from '../../../../shared/models/trade-history';
import * as Plotly from 'plotly.js';
import * as moment from 'moment';
import { ItemService } from '../../../../shared/services/item/item.service';

interface Margin {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, AfterViewInit {
  private tradeData: Array<TradeHistory>;

  @ViewChild('chartElement') chartElement: ElementRef;

  @Input('data')
  set data(data: Array<TradeHistory>) {
    this.tradeData = data;

    if (this.chartElement && data.length > 0) {
      this.plotChart();
    }
  }

  constructor(private itemService: ItemService) {
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
  }

  plotChart() {
    const chartData = this.getChartData();
    const layout: any = {
      title: '',
      dragmode: 'pan',
      xaxis: {
        tickformat: ' %a %b %e %Y %I:%M %p',
        nticks: 5,
        range: [moment().subtract(1, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        rangeselector: {
          buttons: [
            {
              count: 1,
              label: '1d',
              step: 'day',
              stepmode: 'backward'
            },
            {
              count: 7,
              label: '1w',
              step: 'day',
              stepmode: 'backward'
            },
            {
              count: 1,
              label: '1m',
              step: 'month',
              stepmode: 'backward'
            },
            {
              count: 3,
              label: '3m',
              step: 'month',
              stepmode: 'backward'
            },
            {
              count: 1,
              label: '1y',
              step: 'year',
              stepmode: 'backward'
            },
            { step: 'all' }
          ]
        }
      },
      yaxis1: {
        title: 'Value',
        domain: [0.4, 1],
        autorange: true,
      },
      yaxis2: {
        title: 'Volume',
        showgrid: false,
        nticks: 2,
        domain: [0, 0.1],
        autorange: true,
      },
      yaxis3: {
        domain: [0.2, 0.3],
        title: 'Analysis',
        showgrid: false,
        autorange: true,
      }
    };

    Plotly.newPlot(this.chartElement.nativeElement, chartData, layout, {});
    this.chartElement.nativeElement.on('plotly_hover', (eventData) => {
      if (eventData.xvals) {
        Plotly.Fx.hover(this.chartElement.nativeElement, {
          xval: eventData.xvals[0]
        }, ['xy', 'xy2', 'xy3']);
      }
    });

  }

  getChartData(): Array<any> {
    const duration = 'week';
    const unitsAgo = 1;
    const chartData = [];

    const buy = {
      x: [],
      y: [],
      name: 'Buy',
    };
    const sell = {
      x: [],
      y: [],
      type: 'scatter',
      name: 'Sell',
    };
    const bestBuy = {
      x: [],
      y: [],
      name: `Best Buy in ${unitsAgo} ${duration}`,
    };

    const supply = {
      x: [],
      y: [],
      name: 'Supply',
      type: 'scatter',
      yaxis: 'y2',
    };

    const demand = {
      x: [],
      y: [],
      name: 'Demand',
      type: 'scatter',
      yaxis: 'y2',
    };
    const profit = {
      x: [],
      y: [],
      name: 'Profit',
      type: 'scatter',
      yaxis: 'y3',
    };

    const roi = {
      x: [],
      y: [],
      name: '% ROI',
      type: 'scatter',
      yaxis: 'y3',
    };
    const profitAgo = {
      x: [],
      y: [],
      name: `Most Profit in ${unitsAgo} ${duration}`,
      type: 'scatter',
      yaxis: 'y3',
    };

    const roiAgo = {
      x: [],
      y: [],
      name: `Most % ROI in ${unitsAgo} ${duration}`,
      type: 'scatter',
      yaxis: 'y3',
    };

    this.tradeData.forEach((d, index) => {
      // buy
      buy.y.push(d.buy);
      buy.x.push(moment(+d.timestamp).format('YYYY-MM-DD HH:mm:ss'));

      // sell
      sell.y.push(d.sell);
      sell.x.push(moment(+d.timestamp).format('YYYY-MM-DD HH:mm:ss'));

      // supply
      supply.y.push(d.supply);
      supply.x.push(moment(+d.timestamp).format('YYYY-MM-DD HH:mm:ss'));
      // demand
      demand.y.push(d.demand);
      demand.x.push(moment(+d.timestamp).format('YYYY-MM-DD HH:mm:ss'));

      // ago
      profit.y.push(this.itemService.calculateProfit(d.buy, d.sell));
      profit.x.push(moment(+d.timestamp).format('YYYY-MM-DD HH:mm:ss'));

      // roi
      roi.y.push(this.itemService.calculateROI(d.buy, d.sell));
      roi.x.push(moment(+d.timestamp).format('YYYY-MM-DD HH:mm:ss'));

      const dataAgo = this.dataTimeAgo(unitsAgo, duration, index);
      if (dataAgo) {
        // profit
        profitAgo.y.push(this.itemService.calculateProfit(d.buy, dataAgo.sell));
        profitAgo.x.push(moment(+d.timestamp).format('YYYY-MM-DD HH:mm:ss'));

        // roi
        roiAgo.y.push(this.itemService.calculateROI(d.buy, dataAgo.sell));
        roiAgo.x.push(moment(+d.timestamp).format('YYYY-MM-DD HH:mm:ss'));

        bestBuy.y.push(dataAgo.buy);
        bestBuy.x.push(moment(+d.timestamp).format('YYYY-MM-DD HH:mm:ss'));
      }

    });

    return [supply, demand, sell, buy, profit, roi, profitAgo, roiAgo, bestBuy];
  }

  dataTimeAgo(unitsAgo: number, duration: moment.unitOfTime.DurationConstructor, startAt: number): TradeHistory {
    const time = moment(+this.tradeData[startAt].timestamp);
    let mostProfitableIndex = startAt;
    let mostProfit = this.itemService.calculateProfit(this.tradeData[startAt].buy, this.tradeData[startAt].sell);
    for (let index = startAt; index < this.tradeData.length; index++) {
      const xTime = moment(+this.tradeData[index].timestamp);
      const currentProfit = this.itemService.calculateProfit(this.tradeData[index].buy, this.tradeData[startAt].sell);
      if (currentProfit > mostProfit) {
        mostProfit = currentProfit;
        mostProfitableIndex = index;
      }

      if (time.diff(xTime, duration) > unitsAgo) {
        return this.tradeData[mostProfitableIndex];
      }
    }

    return this.tradeData[mostProfitableIndex];

  }

}
