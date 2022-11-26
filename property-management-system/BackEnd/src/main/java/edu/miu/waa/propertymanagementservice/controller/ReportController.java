package edu.miu.waa.propertymanagementservice.controller;

import edu.miu.waa.propertymanagementservice.dto.PropertyDto;
import edu.miu.waa.propertymanagementservice.dto.PropertyViewsByLocationDto;
import edu.miu.waa.propertymanagementservice.service.ApplicationService;
import edu.miu.waa.propertymanagementservice.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/reports")
public class ReportController {

    private final ApplicationService applicationService;
    private final PropertyService propertyService;
    private final CacheManager cacheManager;

    @Scheduled(fixedDelay = 10000)
    public void evictAllCaches() {
        cacheManager.getCacheNames().forEach(cacheName -> Objects.requireNonNull(cacheManager.getCache(cacheName)).clear());
    }

    @GetMapping("/applications/total")
    @Cacheable(value = "totalApplication")
    public long getTotalApplication() {
        return applicationService.getTotalApplication();
    }

    @GetMapping("/properties/sumSellTypes")
    @Cacheable(value = "sumSellTypeProperties")
    public long getSumSellTypeProperties() {
        return propertyService.getSumSellTypeProperties();
    }

    @GetMapping("/properties/sumRentType")
    @Cacheable(value = "sumRentTypeProperties")
    public long getSumRentTypeProperties() {
        return propertyService.getSumRentTypeProperties();
    }

    @GetMapping("/properties/latest")
    @Cacheable(value = "latestProperties")
    public List<PropertyDto> get10LatestProperties() {
        return propertyService.findFirst10();
    }

    @GetMapping()
    @Cacheable(value = "fullReport", key = "{#propertyType,#homeType,#street,#city,#zipCode,#year}")
    public List<PropertyDto> search(@RequestParam(defaultValue = "SELL") String propertyType,
                                    @RequestParam(defaultValue = "") List<String> homeType,
                                    @RequestParam(defaultValue = "%") String street,
                                    @RequestParam(defaultValue = "%") String city,
                                    @RequestParam(defaultValue = "%") String zipCode,
                                    @RequestParam(defaultValue = "0") int year) {
        return propertyService.report(propertyType, homeType, street, city, zipCode);
    }

    @GetMapping("/properties/views")
    @Cacheable(value = "viewsPerLocation")
    public List<PropertyViewsByLocationDto> getViewsPerLocation() {
        return propertyService.getViewsPerLocation();
    }
}
