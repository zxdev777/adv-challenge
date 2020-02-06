# adv-challenge

Simple REST API with Spring boot, Spring Data JPA. It uses file-based version of H2 database with already populated advertising data.


## How to run

#### Prerequisites

* Installed JDK 1.8 and Maven 3.x

Run spring boot app

```bash 
mvn spring-boot:run
``` 

As there is no authentication you can access services directly from browser `http://localhost:8080/` or via curl from commandline

## Rest services

### Data sources

`GET /datasources`

Returns lists of datasources

```json 
[{
 "text": "Facebook Ads"
}, ...]
``` 

### Campaigns

`GET /campaigns?q=<criteria>`

Performs trivial search with like on campaign text

```json 
[{
 "text": "2nd Edition EuroSciCon Heart Diseases- Paris - Conference"
}, ...]
``` 

### Advertisements

`GET /advertisements?campaigns=<campaigns1, ...>&datasources=<datasource1, ...>`

Returns list of advertisements according to search criteria

```json 
[{
 "date":"2019-05-18T22:00:00.000+0000",
 "clicks":24091,
 "impressions":1724052
}, ...]
``` 

## Place for improvements

* Data normalization - extract datasources and campaigns to its own tables and make references form AdvertisementPerformance, which reduces data redundancy

* Choose better entity naming according to convention in Advertising domain

* Add more search criteria for service like `paging (page, pageSize)`, `start/end dates` and allows user to specify range to see weekly, monthly, quarterly or yearly statistics

* Analyze all queries and add indexes to speed up search. Create benchmark in the case of fulltext search for concrete DB engine (e.g. B-tree vs GIN), which performs the best

* Better error handling

* API versioning

* Caching data


## Data

Data is available via H2 console

`http://localhost:8080/h2-console/` 

## Troubleshooting

In the case of corrupted data, delete file `data/db.mv.db` and import data again:

```bash 
java -cp data/h2-1.4.200.jar org.h2.tools.RunScript -url "jdbc:h2:file:./data/db" -user sa -password password -script data/scripts.sql
``` 
