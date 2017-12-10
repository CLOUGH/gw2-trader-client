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

interface ChartData {
  timestamp: Date;
  sell: number;
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
  @ViewChild('svgElement') svgElement: ElementRef;

  @Input()
  set data(data: Array<any>) {
    if (data.length) {
      const d3 = this.d3;
      const width = 960;
      const height = 500;
      const margins = { top: 20, right: 20, bottom: 20, left: 30 };

      const svg = d3.select(this.svgElement.nativeElement);
      const parseTime = d3.timeParse('%Q');

      const parsedData = data.map((d) => {
        return { timestamp: parseTime(d.timestamp), sell: +d.sell };
      });

      const yScale = d3.scaleLinear()
        .range([height - margins.top, margins.bottom]);

      const xScale = d3.scaleTime()
        .range([margins.left, width - margins.right]);

      const line = d3.line<ChartData>()
        .y((d: ChartData) => {
          // console.log(xScale(-d.sell));
          return yScale(d.sell);
        })
        .x((d: ChartData) => {
          // console.log(yScale(d.timestamp));
          return xScale(d.timestamp);
        });

      yScale.domain(d3.extent(parsedData, d => d.sell));
      xScale.domain(d3.extent(parsedData, d => d.timestamp));

      console.log(parsedData);

      svg.append('g')
        .attr('transform', `translate(0, ${height - margins.bottom})`)
        .call(d3.axisBottom(xScale));

      svg.append('g')
        .attr('transform', `translate(${margins.left},0)`)
        .call(d3.axisLeft(yScale))
        .append('text')
        .attr('fill', '#000')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('coin');

      svg.append('path')
        .datum(parsedData)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5)
        .attr('d', line);

      // console.log(d3.min(data, d => d.timestamp));

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
