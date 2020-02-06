import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AdvertisementModel} from '../advertisement.model';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {BaseChartDirective, Label} from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() advertisements: AdvertisementModel[];

  impressions: number[] = [];
  clicks: number[] = [];

  public lineChartData: ChartDataSets[] = [
    {data: this.clicks, label: 'Clicks'},
    {data: this.impressions, label: 'Impressions'}
  ];

  public lineChartLabels: Label[] = [];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'month'
        }
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          scaleLabel: {
            display: true,
            labelString: 'Clicks'
          }
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          scaleLabel: {
            display: true,
            labelString: 'Impressions'
          }
        }
      ]
    },
    annotation: {}
  };

  public lineChartLegend = true;
  public lineChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() {
  }

  ngOnInit() {
  }

  refresh(advertisements: AdvertisementModel[]) {

    if (advertisements) {
      this.impressions = [];
      this.clicks = [];

      advertisements.forEach(el => {
        this.impressions.push(el.impressions);
        this.clicks.push(el.clicks);
        this.lineChartLabels.push(el.date.toString());
      });

      this.lineChartData = [
        {data: this.clicks, label: 'Clicks'},
        {data: this.impressions, label: 'Impressions', yAxisID: 'y-axis-1'}
      ]
      this.chart.update();
    }
  }
}
