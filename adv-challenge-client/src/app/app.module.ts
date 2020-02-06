import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterComponent } from './advertisement/filter/filter.component';
import { ChartComponent } from './advertisement/chart/chart.component';
import { HomeComponent } from './home/home.component';
import {AdvertisementService} from './advertisement/advertisement.service';
import {NgSelectModule} from '@ng-select/ng-select';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FilterComponent,
    ChartComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
  ],
  providers: [
    AdvertisementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
