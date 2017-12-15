import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  Renderer2,
  AfterViewInit,
  Input
} from '@angular/core';
import {
  D3Service,
  D3,
  Axis,
  BrushBehavior,
  BrushSelection,
  D3BrushEvent,
  ScaleLinear,
  ScaleOrdinal,
  Selection,
  Transition
} from 'd3-ng2-service';

import { TradeHistory } from '../../../../shared/models/trade-history';

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
  private d3: D3;
  private parentNativeElement: any;
  private _data: Array<TradeHistory>;
  private svg: Selection<SVGSVGElement, any, null, undefined>;
  private margins: Margin;
  private width: number;
  private height: number;
  private miniChartMargins: Margin;
  private miniChartHeight: number;
  private parseTime: (string) => Date;
  private plot;
  private xScale;
  private yScale;
  private lineColor: string;
  private focus;
  private bisect;

  @ViewChild('svgElement') svgElement: ElementRef;

  @Input()
  set data(data: Array<TradeHistory>) {
    if (this.svgElement) {
      this.svgElement.nativeElement.focus();
      data.sort((a: TradeHistory, b: TradeHistory) => {
        return +a.timestamp - +b.timestamp;
      });

      const newData = data.filter(d => moment().subtract(3, 'month') < moment(+d.timestamp));
      this.setData(newData);
      this.setColor('steelblue');
    }
    // if (false) {
    //   const d3 = this.d3;
    //   const svg = d3.select(this.svgElement.nativeElement),
    //     margin = { top: 20, right: 20, bottom: 140, left: 40 },
    //     minChartmargin = { top: 500, right: 20, bottom: 30, left: 40 },
    //     width = +svg.attr('width') - margin.left - margin.right,
    //     height = +svg.attr('height') - margin.top - margin.bottom,
    //     height2 = +svg.attr('height') - minChartmargin.top - minChartmargin.bottom;

    //   const parseDate = d3.timeParse('%Q');

    //   const parsedData = data.map((d) => {
    //     return {
    //       timestamp: parseDate(d.timestamp),
    //       sell: +d.sell,
    //       buy: +d.buy
    //     };
    //   }).filter((d) => {
    //     const startOfDay = moment().subtract(1, 'year').toDate();
    //     return startOfDay <= d.timestamp;

    //   });

    //   const x = d3.scaleTime().range([0, width]),
    //     x2 = d3.scaleTime().range([0, width]),
    //     y = d3.scaleLinear().range([height, 0]),
    //     y2 = d3.scaleLinear().range([height2, 0]);

    //   const xAxis = d3.axisBottom(x),
    //     xAxis2 = d3.axisBottom(x2),
    //     yAxis = d3.axisLeft(y);

    //   const brush = d3.brushX()
    //     .extent([[0, 0], [width, height2]])
    //     .on('brush end', () => {
    //       if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') { return; } // ignore brush-by-zoom
    //       const s = d3.event.selection || x2.range();
    //       x.domain(s.map(x2.invert, x2));
    //       focus.select('.sellLine').attr('d', sellLine);
    //       focus.select('.buyLine').attr('d', buyLine);
    //       focus.select('.axis--x').call(xAxis);
    //       svg.select('.zoom').call(zoom.transform, d3.zoomIdentity
    //         .scale(width / (s[1] - s[0]))
    //         .translate(-s[0], 0));
    //     });

    //   const zoom = d3.zoom()
    //     .scaleExtent([1, Infinity])
    //     .translateExtent([[0, 0], [width, height]])
    //     .extent([[0, 0], [width, height]])
    //     .on('zoom', () => {
    //       if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') { return; } // ignore zoom-by-brush
    //       const t = d3.event.transform;
    //       x.domain(t.rescaleX(x2).domain());
    //       focus.select('.sellLine').attr('d', sellLine);
    //       focus.select('.buyLine').attr('d', buyLine);
    //       focus.select('.axis--x').call(xAxis);
    //       context.select('.brush').call(brush.move, x.range().map(t.invertX, t));
    //     });

    //   const sellLine = d3.line<TradeHistory>()
    //     .x(function (d) { return x(d.timestamp); })
    //     .y(function (d) { return y(d.sell); });

    //   const miniSellArea = d3.area<TradeHistory>()
    //     .x(function (d) { return x2(d.timestamp); })
    //     .y(function (d) { return y2(d.sell); });

    //   const buyLine = d3.line<TradeHistory>()
    //     .x(function (d) { return x(d.timestamp); })
    //     .y(function (d) { return y(d.buy); });

    //   svg.append('defs').append('clipPath')
    //     .attr('id', 'clip')
    //     .append('rect')
    //     .attr('width', width)
    //     .attr('height', height);

    //   const focus = svg.append('g')
    //     .attr('class', 'focus')
    //     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    //   const context = svg.append('g')
    //     .attr('class', 'context')
    //     .attr('transform', 'translate(' + minChartmargin.left + ',' + minChartmargin.top + ')');

    //   x.domain(d3.extent(parsedData, function (d) { return d.timestamp; }));
    //   y.domain([0, d3.max(parsedData, (d) => {
    //     return Math.max(d.sell, d.buy);
    //   })]);
    //   x2.domain(x.domain());
    //   y2.domain(y.domain());

    //   focus.append('path')
    //     .datum(parsedData)
    //     .attr('class', 'sellLine')
    //     .attr('fill', 'none')
    //     .attr('stroke', 'steelblue')
    //     .attr('stroke-linejoin', 'round')
    //     .attr('stroke-linecap', 'round')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', sellLine);

    //   focus.append('path')
    //     .datum(parsedData)
    //     .attr('class', 'buyLine')
    //     .attr('fill', 'none')
    //     .attr('stroke', 'red')
    //     .attr('stroke-linejoin', 'round')
    //     .attr('stroke-linecap', 'round')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', buyLine);

    //   focus.append('g')
    //     .attr('class', 'axis axis--x')
    //     .attr('transform', 'translate(0,' + height + ')')
    //     .call(xAxis);

    //   focus.append('g')
    //     .attr('class', 'axis axis--y')
    //     .call(yAxis);


    //   context.append('path')
    //     .datum(parsedData)
    //     .attr('class', 'sellLine')
    //     .attr('fill', 'steelblue')
    //     .attr('stroke', 'steelblue')
    //     .attr('stroke-linejoin', 'round')
    //     .attr('stroke-linecap', 'round')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', miniSellArea);


    //   context.append('g')
    //     .attr('class', 'axis axis--x')
    //     .attr('transform', 'translate(0,' + height2 + ')')
    //     .call(xAxis2);

    //   context.append('g')
    //     .attr('class', 'brush')
    //     .call(brush)
    //     .call(brush.move, x.range());

    //   svg.append('rect')
    //     .attr('class', 'zoom')
    //     .attr('width', width)
    //     .attr('height', height)
    //     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    //     .call(zoom);
    // }
  }

  constructor(
    element: ElementRef,
    private ngZone: NgZone,
    d3Service: D3Service,
    private rd: Renderer2
  ) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
    this._data = [];
  }

  ngAfterViewInit() {
    this.svgElement.nativeElement.focus();
  }

  ngOnInit() {
  }

  draw() {
    this.initChart();

    // create the other stuff
    this.createScales();
    this.addAxes();
    this.addSellLine();
    this.addBuyLine();
    this.addTooltip();
  }

  initChart() {
    this.svg = this.d3.select(this.svgElement.nativeElement);
    this.margins = { top: 20, right: 20, bottom: 140, left: 40 };
    this.miniChartMargins = { top: 500, right: 20, bottom: 30, left: 40 };
    this.width = this.svgElement.nativeElement.clientWidth - this.margins.left - this.margins.right;
    this.height = +this.svg.attr('height') - this.margins.top - this.margins.bottom;
    this.miniChartHeight = +this.svg.attr('height') - this.miniChartMargins.top - this.miniChartMargins.bottom;
    this.parseTime = this.d3.timeParse('%Q');
    this.bisect = this.d3.bisector((d: TradeHistory) => this.parseTime(+d.timestamp)).left;

    // we'll actually be appending to a <g> element
    this.plot = this.svg.append('g')
      .attr('transform', `translate(${this.margins.left},${this.margins.top})`);
  }

  createScales() {
    // calculate max and min for data
    const xExtent = this.d3.extent(this._data, (d: TradeHistory) => this.parseTime(+d.timestamp));
    const yExtent = this.d3.extent(this._data, (d: TradeHistory) => {
      return Math.max(+d.sell, +d.buy);
    });

    // force zero baseline if all data points are positive
    if (yExtent[0] > 0) { yExtent[0] = 0; }

    this.xScale = this.d3.scaleTime()
      .range([0, this.width - this.margins.right])
      .domain(xExtent);

    this.yScale = this.d3.scaleLinear()
      .range([this.height - (this.margins.top + this.margins.bottom), 0])
      .domain(yExtent);
  }

  addAxes() {
    // create and append axis elements
    // this is all pretty straightforward D3 stuff
    const xAxis = this.d3.axisBottom(this.xScale);

    const yAxis = this.d3.axisLeft(this.yScale)
      .tickFormat(this.d3.format('d'));

    this.plot.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${this.height - (this.margins.top + this.margins.bottom)})`)
      .call(xAxis);

    this.plot.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    this.focus = this.plot.append('g')
      .style('display', 'none');
  }

  addSellLine() {
    const line = this.d3.line<TradeHistory>()
      .x((d: TradeHistory) => +this.xScale(this.parseTime(+d.timestamp)))
      .y((d: TradeHistory) => +this.yScale(d.sell));

    this.plot.append('path')
      // use data stored in `this`
      .datum(this._data)
      .classed('line', true)
      .attr('d', line)

      // set stroke to specified color, or default to red
      .style('stroke', this.lineColor || 'red')
      .style('fill', 'none');
  }

  addBuyLine() {
    const line = this.d3.line<TradeHistory>()
      .x((d: TradeHistory) => +this.xScale(this.parseTime(+d.timestamp)))
      .y((d: TradeHistory) => +this.yScale(d.buy));

    this.plot.append('path')
      // use data stored in `this`
      .datum(this._data)
      .classed('line', true)
      .attr('d', line)

      // set stroke to specified color, or default to red
      .style('stroke', 'red')
      .style('fill', 'none');
  }

  addTooltip() {

    this.focus.append('circle')
      .attr('class', 'sellCircle')
      .style('fill', 'none')
      .style('stroke', 'blue')
      .attr('r', 4);
    this.focus.append('circle')
      .attr('class', 'buyCircle')
      .style('fill', 'none')
      .style('stroke', 'red')
      .attr('r', 4);

    // place the value at the intersection
    this.focus.append('text')
      .attr('class', 'y1')
      .style('stroke', 'white')
      .style('stroke-width', '3.5px')
      .style('opacity', 0.8)
      .attr('dx', 8)
      .attr('dy', '-.3em');
    this.focus.append('text')
      .attr('class', 'y2')
      .attr('dx', 8)
      .attr('dy', '-.3em');

    // place the date at the intersection
    this.focus.append('text')
      .attr('class', 'y3')
      .style('stroke', 'white')
      .style('stroke-width', '3.5px')
      .style('opacity', 0.8)
      .attr('dx', 8)
      .attr('dy', '1em');
    this.focus.append('text')
      .attr('class', 'y4')
      .attr('dx', 8)
      .attr('dy', '1em');

    // append the rectangle to capture mouse
    this.plot.append('rect')
      .attr('width', this.width)
      .attr('height', this.height)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .on('mouseover', () => { this.focus.style('display', null); })
      .on('mouseout', () => { this.focus.style('display', 'none'); })
      .on('mousemove', () => {
        const timestamp = this.xScale.invert(this.d3.mouse(this.plot.select('g').node())[0]);

        let index = this.bisect(this._data, timestamp);
        index = index > this._data.length - 1 ? this._data.length - 1 : index;
        const startDatum = this._data[index - 1];
        const endDatum = this._data[index];
        const d = timestamp - startDatum.timestamp > endDatum.timestamp - timestamp ? endDatum : startDatum;


        this.focus.select('circle.sellCircle')
          .attr('transform', `translate(${this.xScale(d.timestamp)}, ${this.yScale(d.sell)})`);
        this.focus.select('text.y1')
          .attr('transform', `translate(${this.xScale(d.timestamp)}, ${this.yScale(d.sell)})`)
          .text(d.sell);
        this.focus.select('text.y2')
          .attr('transform', `translate(${this.xScale(d.timestamp)}, ${this.yScale(d.sell)})`)
          .text(d.sell);
        this.focus.select('text.y3')
          .attr('transform', `translate(${this.xScale(d.timestamp)}, ${this.yScale(d.sell)})`)
          .text(moment(this.parseTime(d.timestamp)).format('dddd, MMM D YYYY, h:mm a'));
        this.focus.select('text.y4')
          .attr('transform', `translate(${this.xScale(d.timestamp)}, ${this.yScale(d.sell)})`)
          .text(moment(this.parseTime(d.timestamp)).format('dddd, MMM D YYYY, h:mm a'));
      });
  }

  // the following are "public methods"
  // which can be used by code outside of this file

  public setColor(newColor) {
    this.plot.select('.line')
      .style('stroke', newColor);

    // store for use when redrawing
    this.lineColor = newColor;
  }

  public setData(newData: Array<TradeHistory>) {
    this._data = newData;
    // full redraw needed
    this.draw();
  }

}
