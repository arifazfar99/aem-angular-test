import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { ChartItem } from 'src/app/core/dashboard.model'

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements AfterViewInit {
  @Input() data: ChartItem[] = [];
  @ViewChild('chart') chartRef!: ElementRef<SVGSVGElement>;

  private readonly size = 200;
  private readonly colors = ['#cccccc', '#9e9e9e', '#b0b0b0', '#bdbdbd']

  ngAfterViewInit(): void {
    this.draw()
  }

  private draw(): void {
    const radius = this.size / 2;
    const pie = d3.pie<ChartItem>().value(d => d.value).sort(null);
    const arc = d3.arc<d3.PieArcDatum<ChartItem>>()
      .innerRadius(radius * 0.5)
      .outerRadius(radius);

    d3.select(this.chartRef.nativeElement)
      .append('g')
      .attr('transform', `translate(${radius}, ${radius})`)
      .selectAll('path')
      .data(pie(this.data))
      .join('path')
      .attr('d', arc)
      .attr('fill', (d, i) => this.colors[i % this.colors.length]);
  }
}
