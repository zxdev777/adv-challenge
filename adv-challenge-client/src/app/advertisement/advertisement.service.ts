import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AdvertisementModel} from './advertisement.model';
import {CampaignModel} from './campaign.model';
import {DatasourceModel} from './datasource.model';

@Injectable()
export class AdvertisementService {

  apiUrl = 'http://localhost:8080';

  constructor(
    protected http: HttpClient,
  ) {
  }

  protected createHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  listDatasources() {
    const httpHeaders = this.createHttpHeaders();
    return this.http.get<DatasourceModel[]>(this.apiUrl + '/datasources', {headers: httpHeaders});
  }

  listCampaigns(q: string) {
    const httpHeaders = this.createHttpHeaders();

    let params = new HttpParams();
    if (q !== undefined && q !== null) {
      params = params.append('q', q.toString());
    }

    return this.http.get<CampaignModel[]>(this.apiUrl + '/campaigns', (params.keys().length > 0) ? {
      headers: httpHeaders,
      params: params
    } : {headers: httpHeaders});
  }

  listAdvertisements(datasources: string[], campaigns: string[]) {
    const httpHeaders = this.createHttpHeaders();

    let params = new HttpParams();
    if (datasources !== undefined && datasources !== null) {
      params = params.append('datasources', datasources.join(','));
    }
    if (campaigns !== undefined && campaigns !== null) {
      params = params.append('campaigns', campaigns.join(','));
    }

    return this.http.get<AdvertisementModel[]>(this.apiUrl + '/advertisements', (params.keys().length > 0) ? {
      headers: httpHeaders,
      params: params
    } : {headers: httpHeaders});
  }
}
