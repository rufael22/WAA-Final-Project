package edu.miu.waa.propertymanagementservice.service;

import edu.miu.waa.propertymanagementservice.dto.PropertyDto;

import java.util.Set;

public interface UserService {

    Set<PropertyDto> favouritePropertyByEmail(String userEmail);

    void addFavoriteProperty(String userEmail, PropertyDto propertyDto);
}
