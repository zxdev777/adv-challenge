import {Component, OnInit} from '@angular/core';
import {DatasourceModel} from '../datasource.model';
import {concat, Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {AdvertisementService} from '../advertisement.service';
import {CampaignModel} from '../campaign.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  selectedDatasources: DatasourceModel[];
  selectedCampaigns: CampaignModel[];

  private debounce = 500;

  datasources$: Observable<DatasourceModel[]>;
  datasourcesLoading = false;
  datasourcesInput$ = new Subject<string>();

  campaigns$: Observable<CampaignModel[]>;
  campaignsLoading = false;
  campaignsInput$ = new Subject<string>();

  validate: boolean;

  constructor(
    private adService: AdvertisementService
  ) {
  }

  ngOnInit() {
    this.loadDatasourceModel();
    this.loadCampaignModel();
  }

  private loadDatasourceModel() {
    this.datasources$ = concat(
      of([]),
      this.datasourcesInput$.pipe(
        debounceTime(this.debounce),
        distinctUntilChanged(),
        tap(() => this.datasourcesLoading = true),
        switchMap(term => this.adService
          .listDatasources()
          .pipe(
            catchError(() => of([])),
            map((res: DatasourceModel[]) => {
              const r = new Array();
              res.forEach(s => {
                r.push(new DatasourceModel(s.text, s.text))
              }); // not needed with normalized model
              return r;
            }),
            tap(() => this.datasourcesLoading = false)
          ))
      )
    );
  }

  private loadCampaignModel() {
    this.campaigns$ = concat(
      of([]),
      this.campaignsInput$.pipe(
        debounceTime(this.debounce),
        distinctUntilChanged(),
        tap(() => this.campaignsLoading = true),
        switchMap(term => this.adService
          .listCampaigns(term)
          .pipe(
            catchError(() => of([])),
            map((res: CampaignModel[]) => {
              const r = new Array();
              res.forEach(s => {
                r.push(new CampaignModel(s.text, s.text))
              }); // not needed with normalized model
              return r;
            }),
            tap(() => this.campaignsLoading = false)
          ))
      )
    );
  }

}
