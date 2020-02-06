import {Component, OnInit, ViewChild} from '@angular/core';
import {AdvertisementService} from '../advertisement/advertisement.service';
import {FilterComponent} from '../advertisement/filter/filter.component';
import {AdvertisementModel} from '../advertisement/advertisement.model';
import {ChartComponent} from '../advertisement/chart/chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('filter', {static: false}) filter: FilterComponent;
  @ViewChild('chart', {static: false}) chart: ChartComponent;

  advertisements: AdvertisementModel[];

  constructor(
    private adService: AdvertisementService
  ) {
  }

  ngOnInit() {
  }

  searchAdvertisements() {
    const datasources = this.filter.selectedDatasources ? this.filter.selectedDatasources.map(e => e.text) : null;
    const campaigns = this.filter.selectedCampaigns ? this.filter.selectedCampaigns.map(e => e.text) : null;

    this.adService.listAdvertisements(datasources, campaigns)
      .subscribe(r => {
        this.advertisements = r;
        this.chart.refresh(this.advertisements);
      });
  }

}
