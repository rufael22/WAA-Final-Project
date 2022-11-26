package edu.miu.waa.propertymanagementservice.service;

import edu.miu.waa.propertymanagementservice.dto.PropertyDto;
import edu.miu.waa.propertymanagementservice.dto.PropertyViewsByLocationDto;

import java.util.List;
import java.util.Set;

public interface PropertyService {
    PropertyDto save(PropertyDto property);
    Set<PropertyDto> findAll();
    PropertyDto findById(int id);

    List<PropertyDto> search(String propertyType, List<String> homeType,
                             int minPrice, int maxPrice,
                             int minRoomNumber, String street,
                             String city, String zipCode,
                             Boolean listed,
                             Boolean deleted,
                             Boolean onlyLocation);

    List<PropertyDto> report(String propertyType, List<String> homeType, String street, String city, String zipCode);

    List<PropertyDto> findFirst10();
    long getSumSellTypeProperties();
    long getSumRentTypeProperties();

    void increaseView(int id);

    List<PropertyViewsByLocationDto> getViewsPerLocation();

    PropertyDto updateListedProperty(int id, Boolean value);
    void deleteProperty(int id);
    PropertyDto updateProperty(int id, PropertyDto property);

}
