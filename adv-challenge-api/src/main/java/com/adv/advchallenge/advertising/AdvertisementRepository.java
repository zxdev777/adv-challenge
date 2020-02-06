package com.adv.advchallenge.advertising;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdvertisementRepository extends JpaRepository<AdvertisementPerformance, Integer> {

    /**
     * Returns lists of data sources
     *
     * @return
     */
    @Query(value = "SELECT distinct new com.adv.advchallenge.advertising.Datasource(ad.datasource) FROM AdvertisementPerformance ad order by ad.datasource")
    List<Datasource> listDataSources();

    /**
     * Performs trivial search on campaigns
     *
     * @return
     */
    @Query(value = "SELECT distinct new com.adv.advchallenge.advertising.Campaign(ad.campaign) FROM AdvertisementPerformance ad where ad.campaign LIKE '%'||:campaignQuery||'%' order by ad.campaign")
    List<Campaign> listCampaigns(@Param("campaignQuery") String campaignQuery);
}
