import {
  Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewInit, Input
} from '@angular/core';

import { TradeHistory } from '../../../../shared/models/trade-history';
import * as Plotly from 'plotly.js';
import * as moment from 'moment';

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

  constructor() {
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
  }

  plotChart() {
    const chartData = this.getChartData();
    const layout: any = {
      title: '',
      xaxis: {
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
              count: 1,
              label: '1w',
              step: 'week',
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
        },
        rangeslider: {
          range: [moment().subtract(1, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
        },
      },
      yaxis1: {
        title: 'Volume',
        domain: [0, 0.1],
        // side: 'right',
        autorange: true,
        showgrid: false,
      },
      yaxis2: {
        title: 'Value',
        domain: [0.1, 1],
        autorange: true,
        // side: 'right',
      },
      whoSpike: true,
    };
    Plotly.newPlot(this.chartElement.nativeElement, chartData, layout, { scrollZoom: true });
  }

  getChartData(): Array<any> {
    const chartData = [];

    const buy = {
      x: [],
      y: [],
      type: 'scatter',
      name: 'Buy',
      yaxis: 'y2',
    };
    const sell = {
      x: [],
      y: [],
      type: 'scatter',
      name: 'Sell ',
      yaxis: 'y2',
    };

    const supply = {
      x: [],
      y: [],
      name: 'Supply',
      type: 'bar',
    };

    const demand = {
      x: [],
      y: [],
      name: 'Demand',
      type: 'bar',

    };

    this.tradeData.forEach(d => {
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
      // supply
      demand.y.push(d.demand);
      demand.x.push(moment(+d.timestamp).format('YYYY-MM-DD HH:mm:ss'));
    });

    return [buy, sell, supply, demand];
  }

}
