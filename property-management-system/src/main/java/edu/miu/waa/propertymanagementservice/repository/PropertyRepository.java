package edu.miu.waa.propertymanagementservice.repository;

import edu.miu.waa.propertymanagementservice.dto.PropertyViewsByLocationDto;
import edu.miu.waa.propertymanagementservice.entity.HomeType;
import edu.miu.waa.propertymanagementservice.entity.Property;
import edu.miu.waa.propertymanagementservice.entity.PropertyType;
import edu.miu.waa.propertymanagementservice.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Repository
public interface PropertyRepository extends CrudRepository<Property, Integer> {
    List<Property> findByPropertyTypeInAndLocationStreetLikeIgnoreCaseAndLocationCityLikeIgnoreCaseAndLocationZipCodeLikeIgnoreCaseAndListedAndDeleted(
            Collection<PropertyType> propertyTypes, String street, String city, String zipCode, Boolean listed, Boolean deleted);
    List<Property> findByPropertyTypeInAndHomeTypeInAndPriceBetweenAndNumOfRoomGreaterThanEqualAndLocationStreetLikeIgnoreCaseAndLocationCityLikeIgnoreCaseAndLocationZipCodeLikeIgnoreCaseAndListedAndDeleted(
            Collection<PropertyType> propertyTypes, Collection<HomeType> homeTypes, double minPrice, double maxPrice, int minRoomNumber, String street, String city, String zipCode, Boolean listed, Boolean deleted);

    List<Property> findByPropertyTypeInAndHomeTypeInAndLocationStreetLikeIgnoreCaseAndLocationCityLikeIgnoreCaseAndLocationZipCodeLikeIgnoreCase(
            Collection<PropertyType> propertyTypes, Collection<HomeType> homeTypes, String street, String city, String zipCode);

    List<Property> findFirst10ByOrderByCreatedDateDesc();

    @Query("SELECT SUM(price) FROM Property WHERE propertyType = 'SELL'")
    long getSumSellTypeProperties();

    @Query("SELECT SUM(price) FROM Property WHERE propertyType = 'RENT'")
    long getSumRentTypeProperties();

    @Query("SELECT new edu.miu.waa.propertymanagementservice.dto.PropertyViewsByLocationDto(location.city, SUM(views)) FROM Property GROUP BY location.city")
    List<PropertyViewsByLocationDto> getSumViewsByLocation();
    Set<Property> findByDeletedFalseAndOwner(User owner);
    Set<Property> findByDeletedFalse();
}
