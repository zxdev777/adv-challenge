# adv-challenge-client

## Intro
This angular application visualizes advertising data like clicks and impressions grouped by date in chart.
It allows to filter according to multiple datasources and campaigns. Application consumes data from REST API.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9. All libs were upgraded to latest versions.

## Start development server

#### Prerequisites

* Installed agnular cli
```bash 
npm install -g @angular/cli
``` 

* Installed all dependencies


## Start application
Run
```bash 
npm start
``` 
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Web app

Web application consists of four components: home, dashboard, filter and chart.

### Home
It is entry point of the application. It displays welcome message and advertising menu with link to dashboard.

### Dashboard
This component should display reusable widgets. For brevity, it contains directly embedded filter and chart components. 
It acts as coordinator. It obtains selected criteria from filter component, performs REST API call and populates
chart with calculated data.

### Filter
User can choose multiple datasources and campaigns.

### Chart
Visualisation component for displaying two time series - clicks and impressions. 

