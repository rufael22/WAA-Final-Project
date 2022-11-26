package edu.miu.waa.propertymanagementservice.service.impl;

import edu.miu.waa.propertymanagementservice.domain.UserDetailsAdapter;
import edu.miu.waa.propertymanagementservice.dto.PropertyDto;
import edu.miu.waa.propertymanagementservice.dto.PropertyViewsByLocationDto;
import edu.miu.waa.propertymanagementservice.dto.UserDto;
import edu.miu.waa.propertymanagementservice.entity.HomeType;
import edu.miu.waa.propertymanagementservice.entity.Property;
import edu.miu.waa.propertymanagementservice.entity.PropertyType;
import edu.miu.waa.propertymanagementservice.entity.User;
import edu.miu.waa.propertymanagementservice.exception.NotFoundException;
import edu.miu.waa.propertymanagementservice.mapper.PropertyMapper;
import edu.miu.waa.propertymanagementservice.repository.PropertyRepository;
import edu.miu.waa.propertymanagementservice.repository.UserRepository;
import edu.miu.waa.propertymanagementservice.service.PropertyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PropertyServiceImpl implements PropertyService {
    private final PropertyRepository propertyRepo;
    private final UserRepository userRepo;
    private final PropertyMapper propertyMapper;
    private final ModelMapper mapper;

    @Override
    @PreAuthorize("hasRole('ROLE_OWNER')")
    public PropertyDto save(PropertyDto property) {
        Set<String> pictureNames = property.getPictures();
        property.setPictures(pictureNames);
        UserDetailsAdapter owner = (UserDetailsAdapter) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String email = owner.getUsername();
        User ownerObj = userRepo.findByEmail(email);
        property.setOwner(mapper.map(ownerObj, UserDto.class));
        Property result = propertyRepo.save(propertyMapper.toEntity(property));
        PropertyDto propertyDto = propertyMapper.toDto(result);
        return propertyDto;
    }

    @Override
    @PreAuthorize("hasRole('ROLE_OWNER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_CUSTOMER')")
    public Set<PropertyDto> findAll() {
        Set<Property> properties = new HashSet<>();

        UserDetailsAdapter owner = (UserDetailsAdapter) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String email = owner.getUsername();
        if(owner.getAuthorities().contains("ROLE_OWNER")) {
            //find user
            User ownerObj = userRepo.findByEmail(email);
            properties.addAll(propertyRepo.findByDeletedFalseAndOwner(ownerObj));
        } else {
            properties.addAll(propertyRepo.findByDeletedFalse());
        }
        return propertyMapper.toDtos(properties);
    }

    @Override
    public PropertyDto findById(int id) {
        return propertyRepo.findById(id)
                .map(propertyMapper::toDto)
                .orElseThrow(() -> new NotFoundException("Cannot find property: " + id));
    }

    @Override
    public List<PropertyDto> search(String propertyType, List<String> homeTypes,
                                    int minPrice, int maxPrice, int minRoomNumber,
                                    String street, String city, String zipCode,
                                    Boolean listed, Boolean deleted,
                                    Boolean onlyLocation) {
        // Property type
        List<PropertyType> enumPropertyTypes = new ArrayList<>();
        for (PropertyType pt : PropertyType.values()) {
            if (pt.toString().equalsIgnoreCase(propertyType)) {
                enumPropertyTypes.add(pt);
            }
        }
        if (enumPropertyTypes.isEmpty()) {
            enumPropertyTypes.addAll(Arrays.stream(PropertyType.values()).toList());
        }

        // Home Type
        List<HomeType> enumHomeTypes = new ArrayList<>();
        for (String homeType : homeTypes) {
            for (HomeType ht : HomeType.values()) {
                if (ht.toString().equalsIgnoreCase(homeType)) {
                    enumHomeTypes.add(ht);
                }
            }
        }
        if (enumHomeTypes.isEmpty()) {
            enumHomeTypes.addAll(Arrays.stream(HomeType.values()).toList());
        }

        // Location
        String streetPattern = street;
        if (!street.equals("%")) {
            streetPattern = "%" + street + "%";
        }

        String cityPattern = city;
        if (!city.equals("%")) {
            cityPattern = "%" + city + "%";
        }

        String zipCodePattern = zipCode;
        if (!zipCode.equals("%")) {
            zipCodePattern = "%" + zipCode + "%";
        }

        List<Property> properties;
        if (!onlyLocation) {
            properties = propertyRepo.findByPropertyTypeInAndHomeTypeInAndPriceBetweenAndNumOfRoomGreaterThanEqualAndLocationStreetLikeIgnoreCaseAndLocationCityLikeIgnoreCaseAndLocationZipCodeLikeIgnoreCaseAndListedAndDeleted(
                    enumPropertyTypes, enumHomeTypes, minPrice, maxPrice, minRoomNumber, streetPattern, cityPattern, zipCodePattern, listed, deleted);
        } else {
            properties = propertyRepo.findByPropertyTypeInAndLocationStreetLikeIgnoreCaseAndLocationCityLikeIgnoreCaseAndLocationZipCodeLikeIgnoreCaseAndListedAndDeleted(
                    enumPropertyTypes, streetPattern, cityPattern, zipCodePattern, listed, deleted);
        }
        return propertyMapper.toListDtos(properties);
    }

    @Override
    public List<PropertyDto> report(String propertyType, List<String> homeTypes, String street, String city, String zipCode) {
        List<PropertyType> enumPropertyTypes = PreparePropertyType(propertyType);
        List<HomeType> enumHomeTypes = PrepareHomeType(homeTypes);
        List<String> location = PrepareLocation(street, city, zipCode);

        String streetPattern = location.get(0);
        String cityPattern = location.get(1);
        String zipCodePattern = location.get(2);

        List<Property> properties = propertyRepo.findByPropertyTypeInAndHomeTypeInAndLocationStreetLikeIgnoreCaseAndLocationCityLikeIgnoreCaseAndLocationZipCodeLikeIgnoreCase(
                enumPropertyTypes, enumHomeTypes, streetPattern, cityPattern, zipCodePattern);

        return propertyMapper.toListDtos(properties);
    }

    @Override
    public List<PropertyDto> findFirst10() {
        List<Property> properties = propertyRepo.findFirst10ByOrderByCreatedDateDesc();

        return propertyMapper.toListDtos(properties);
    }

    @Override
    public long getSumSellTypeProperties() {
        return propertyRepo.getSumSellTypeProperties();
    }

    @Override
    public long getSumRentTypeProperties() {
        return propertyRepo.getSumRentTypeProperties();
    }

    @Override
    public void increaseView(int id) {
        Property property = propertyRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Cannot find property: " + id));

        property.setViews(property.getViews() + 1);
        propertyRepo.save(property);
    }

    @Override
    public List<PropertyViewsByLocationDto> getViewsPerLocation() {
        return propertyRepo.getSumViewsByLocation();
    }

    private List<PropertyType> PreparePropertyType(String propertyType) {
        List<PropertyType> enumPropertyTypes = new ArrayList<>();

        for (PropertyType pt : PropertyType.values()) {
            if (pt.toString().equalsIgnoreCase(propertyType)) {
                enumPropertyTypes.add(pt);
            }
        }
        if (enumPropertyTypes.isEmpty()) {
            enumPropertyTypes.addAll(Arrays.stream(PropertyType.values()).toList());
        }

        return enumPropertyTypes;
    }

    private List<HomeType> PrepareHomeType(List<String> homeTypes) {
        List<HomeType> enumHomeTypes = new ArrayList<>();

        for (String homeType : homeTypes) {
            for (HomeType ht : HomeType.values()) {
                if (ht.toString().equalsIgnoreCase(homeType)) {
                    enumHomeTypes.add(ht);
                }
            }
        }
        if (enumHomeTypes.isEmpty()) {
            enumHomeTypes.addAll(Arrays.stream(HomeType.values()).toList());
        }

        return enumHomeTypes;
    }

    private List<String> PrepareLocation(String street, String city, String zipCode) {
        String streetPattern = street;

        if (!street.equals("%")) {
            streetPattern = "%" + street + "%";
        }

        String cityPattern = city;
        if (!city.equals("%")) {
            cityPattern = "%" + city + "%";
        }

        String zipCodePattern = zipCode;
        if (!zipCode.equals("%")) {
            zipCodePattern = "%" + zipCode + "%";
        }

        List<String> result = new ArrayList<>();
        result.add(streetPattern);
        result.add(cityPattern);
        result.add(zipCodePattern);

        return result;
    }

    @Override
    @PreAuthorize("hasRole('ROLE_OWNER')")
    public PropertyDto updateListedProperty(int id, Boolean value) {
        Property property = propertyRepo.findById(id).get();
        if(property != null) {
            property.setListed(value);
            propertyRepo.save(property);
            return propertyMapper.toDto(property);
        } else throw new IllegalArgumentException("Request parameter is invalid!");
    }

    @Override
    @PreAuthorize("hasRole('ROLE_OWNER') or hasRole('ROLE_ADMIN')")
    public void deleteProperty(int id) {
        Property property = propertyRepo.findById(id).get();
        if(property != null) {
            property.setDeleted(true);
            propertyRepo.save(property);
        } else throw new IllegalArgumentException("Request parameter is invalid!");
    }

    @Override
    @PreAuthorize("hasRole('ROLE_OWNER')")
    public PropertyDto updateProperty(int id, PropertyDto property) {
        Property prop = propertyRepo.findById(id).get();
        if(prop != null) {
            String awsBaseUrl = "";

            property.setId(id);
            Set<String> oldPictures = prop.getPictures();

            Set<String> pictures = property.getPictures();
            Set<String> pictureUrls = new HashSet<>();
            if(pictures.size() > 0) {
                Set<String> newPictures = new HashSet<>();
                Set<String> basePictureUrls = pictures.stream().map(name -> {
                    if(!name.contains(awsBaseUrl)) {
                        newPictures.add(name);
                        return awsBaseUrl + "/" +name;
                    } else {
                        return name;
                    }
                }).collect(Collectors.toSet());
                property.setPictures(basePictureUrls);

                //pictureUrls.addAll(s3FileService.getPresignedUrls(newPictures));
            }
            Property result = propertyRepo.save(propertyMapper.toEntity(property));
            PropertyDto propertyDto = propertyMapper.toDto(result);
            if(pictureUrls.size() > 0) {
                propertyDto.setPresignPictures(pictureUrls);
            }
            return propertyDto;
        } else throw new IllegalArgumentException("Request parameter is invalid!");
    }
}