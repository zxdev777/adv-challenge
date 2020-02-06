package com.adv.advchallenge.advertising;

import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.Set;

@Component
public class AdvertisementServiceImpl implements AdvertisementService {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<AdvertisementPerformance> listAdvertisementPerformances(Set<String> datasources, Set<String> campaigns) {

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<AdvertisementPerformance> query = cb.createQuery(AdvertisementPerformance.class);

        Root<AdvertisementPerformance> adv = query.from(AdvertisementPerformance.class);

        query.multiselect(
                adv.get(AdvertisementPerformance_.date),
                cb.sum(adv.get(AdvertisementPerformance_.clicks)),
                cb.sum(adv.get(AdvertisementPerformance_.impressions)));

        Predicate datasourcePredicate = null;
        if (!datasources.isEmpty()) {
            datasourcePredicate = adv.get(AdvertisementPerformance_.datasource).in(datasources);
        }

        Predicate campaignPredicate = null;
        if (!campaigns.isEmpty()) {
            campaignPredicate = adv.get(AdvertisementPerformance_.campaign).in(campaigns);
        }

        Predicate allPredicates = (datasourcePredicate != null && campaignPredicate != null) ?
                cb.and(datasourcePredicate, campaignPredicate) :
                (datasourcePredicate != null ? datasourcePredicate : campaignPredicate);

        if (allPredicates != null) {
            query.where(allPredicates);
        }

        query.groupBy(adv.get(AdvertisementPerformance_.date));
        query.orderBy(cb.asc(adv.get(AdvertisementPerformance_.date)));

        TypedQuery<AdvertisementPerformance> typedQuery = entityManager.createQuery(query);
        List<AdvertisementPerformance> resultList = typedQuery.getResultList();

        return resultList;
    }
}
