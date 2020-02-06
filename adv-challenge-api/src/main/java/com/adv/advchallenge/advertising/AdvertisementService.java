package com.adv.advchallenge.advertising;

import java.util.List;
import java.util.Set;

public interface AdvertisementService {

    /**
     * Returns list of advertisement performances grouped by date
     *
     * Structure of returned entity:  [[date, clicks, impressions] ...]
     *
     * @param datasources
     * @param campaigns
     * @return
     */
    List<AdvertisementPerformance> listAdvertisementPerformances(Set<String> datasources, Set<String> campaigns);

}
