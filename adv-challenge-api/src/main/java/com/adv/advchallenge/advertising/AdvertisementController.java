package com.adv.advchallenge.advertising;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "*")
@RestController
public class AdvertisementController {

    @Autowired
    private AdvertisementService advService;

    @Autowired
    private AdvertisementRepository advRepository;

    @GetMapping(path = "/advertisements", produces = "application/json")
    public List<AdvertisementPerformance> listAdvertisements(
            @RequestParam(name = "datasources", required = false, defaultValue = "") Set<String> datasources,
            @RequestParam(name = "campaigns", required = false, defaultValue = "") Set<String> campaigns) {

        return advService.listAdvertisementPerformances(datasources, campaigns);
    }

    @GetMapping(path = "/datasources", produces = "application/json")
    public List<Datasource> listDataSources() {

        return advRepository.listDataSources();
    }

    @GetMapping(path = "/campaigns", produces = "application/json")
    public List<Campaign> listCampaigns(@RequestParam(name = "q", required = false, defaultValue = "") String campaignQuery) {

        return advRepository.listCampaigns(campaignQuery);
    }
}
