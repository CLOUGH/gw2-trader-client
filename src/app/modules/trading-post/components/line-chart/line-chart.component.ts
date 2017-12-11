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
import * as moment from 'moment';

interface ChartData {
  timestamp: Date;
  sell: number;
  buy: number;
}



@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, AfterViewInit {

  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  private;
  @ViewChild('svgElement') svgElement: ElementRef;
  @Input()
  set data(data: Array<any>) {
    if (data.length) {
      const d3 = this.d3;
      const svg = d3.select(this.svgElement.nativeElement),
        margin = { top: 20, right: 20, bottom: 140, left: 40 },
        minChartmargin = { top: 500, right: 20, bottom: 30, left: 40 },
        width = +svg.attr('width') - margin.left - margin.right,
        height = +svg.attr('height') - margin.top - margin.bottom,
        height2 = +svg.attr('height') - minChartmargin.top - minChartmargin.bottom;

      const parseDate = d3.timeParse('%Q');

      const parsedData = data.map((d) => {
        return {
          timestamp: parseDate(d.timestamp),
          sell: +d.sell,
          buy: +d.buy
        };
      }).filter((d) => {
        const startOfDay = moment().subtract(1, 'year').toDate();
        return startOfDay <= d.timestamp;

      });

      const x = d3.scaleTime().range([0, width]),
        x2 = d3.scaleTime().range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        y2 = d3.scaleLinear().range([height2, 0]);

      const xAxis = d3.axisBottom(x),
        xAxis2 = d3.axisBottom(x2),
        yAxis = d3.axisLeft(y);

      const brush = d3.brushX()
        .extent([[0, 0], [width, height2]])
        .on('brush end', () => {
          if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') { return; } // ignore brush-by-zoom
          const s = d3.event.selection || x2.range();
          x.domain(s.map(x2.invert, x2));
          focus.select('.sellLine').attr('d', sellLine);
          focus.select('.buyLine').attr('d', buyLine);
          focus.select('.axis--x').call(xAxis);
          svg.select('.zoom').call(zoom.transform, d3.zoomIdentity
            .scale(width / (s[1] - s[0]))
            .translate(-s[0], 0));
        });

      const zoom = d3.zoom()
        .scaleExtent([1, Infinity])
        .translateExtent([[0, 0], [width, height]])
        .extent([[0, 0], [width, height]])
        .on('zoom', () => {
          if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') { return; } // ignore zoom-by-brush
          const t = d3.event.transform;
          x.domain(t.rescaleX(x2).domain());
          focus.select('.sellLine').attr('d', sellLine);
          focus.select('.buyLine').attr('d', buyLine);
          focus.select('.axis--x').call(xAxis);
          context.select('.brush').call(brush.move, x.range().map(t.invertX, t));
        });

      const sellLine = d3.line<ChartData>()
        .x(function (d) { return x(d.timestamp); })
        .y(function (d) { return y(d.sell); });

      const miniSellArea = d3.area<ChartData>()
        .x(function (d) { return x2(d.timestamp); })
        .y(function (d) { return y2(d.sell); });

      const buyLine = d3.line<ChartData>()
        .x(function (d) { return x(d.timestamp); })
        .y(function (d) { return y(d.buy); });

      svg.append('defs').append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('width', width)
        .attr('height', height);

      const focus = svg.append('g')
        .attr('class', 'focus')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      const context = svg.append('g')
        .attr('class', 'context')
        .attr('transform', 'translate(' + minChartmargin.left + ',' + minChartmargin.top + ')');

      x.domain(d3.extent(parsedData, function (d) { return d.timestamp; }));
      y.domain([0, d3.max(parsedData, (d) => {
        return Math.max(d.sell, d.buy);
      })]);
      x2.domain(x.domain());
      y2.domain(y.domain());

      focus.append('path')
        .datum(parsedData)
        .attr('class', 'sellLine')
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5)
        .attr('d', sellLine);

      focus.append('path')
        .datum(parsedData)
        .attr('class', 'buyLine')
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5)
        .attr('d', buyLine);

      focus.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

      focus.append('g')
        .attr('class', 'axis axis--y')
        .call(yAxis);


      context.append('path')
        .datum(parsedData)
        .attr('class', 'sellLine')
        .attr('fill', 'steelblue')
        .attr('stroke', 'steelblue')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5)
        .attr('d', miniSellArea);


      context.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + height2 + ')')
        .call(xAxis2);

      context.append('g')
        .attr('class', 'brush')
        .call(brush)
        .call(brush.move, x.range());

      svg.append('rect')
        .attr('class', 'zoom')
        .attr('width', width)
        .attr('height', height)
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .call(zoom);
    }

  }

  constructor(
    element: ElementRef,
    private ngZone: NgZone,
    d3Service: D3Service,
    private rd: Renderer2
  ) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }
  ngAfterViewInit() {
  }

  ngOnInit() {
    this.svgElement.nativeElement.focus();
  }


}
