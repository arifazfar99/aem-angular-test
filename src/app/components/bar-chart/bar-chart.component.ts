import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { ChartItem } from 'src/app/core/dashboard.model'

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements AfterViewInit {
  @Input() data: ChartItem[] = [];
  @ViewChild('chart') chartRef!: ElementRef<SVGSVGElement>;

  private readonly width = 400;
  private readonly height = 220;
  private readonly margin = 10;

  ngAfterViewInit(): void {
    this.draw()
  }

  private draw(): void {
    const x = d3.scaleBand()
      .domain(this.data.map(d => d.name))
      .range([this.margin, this.width - this.margin])
      .padding(0.4);

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.data, d => d.value) ?? 0])
      .range([this.height - this.margin, this.margin]);

    const svg = d3.select(this.chartRef.nativeElement);

    svg.selectAll('rect')
      .data(this.data)
      .join('rect')
      .attr('x', d => x(d.name) ?? 0)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => this.height - this.margin - y(d.value))
      .attr('fill', '#9e9e9e');

    svg.append('path')
      .attr('d', `M${this.margin},${this.margin} V${this.height - this.margin} H${this.width - this.margin}`)
      .attr('fill', 'none')
      .attr('stroke', '#dddddd');
  }

}
