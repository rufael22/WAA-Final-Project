package edu.miu.waa.propertymanagementservice.service.impl;

import edu.miu.waa.propertymanagementservice.dto.PropertyDto;
import edu.miu.waa.propertymanagementservice.entity.Property;
import edu.miu.waa.propertymanagementservice.entity.User;
import edu.miu.waa.propertymanagementservice.mapper.PropertyMapper;
import edu.miu.waa.propertymanagementservice.repository.UserRepository;
import edu.miu.waa.propertymanagementservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PropertyMapper propertyMapper;


    @Override
    public Set<PropertyDto> favouritePropertyByEmail(String customerEmail){
        User user = userRepository.findByEmail(customerEmail);
        Set<Property> properties= user.getFavoriteProperties();
        return propertyMapper.toDtos(properties);
    }

    @Override
    public void addFavoriteProperty(String userEmail, PropertyDto propertyDto) {
        User user = userRepository.findByEmail(userEmail);
        Property property = propertyMapper.toEntity(propertyDto);
        Set<Property> properties = user.getFavoriteProperties();
        properties.add(property);
        user.setFavoriteProperties(properties);
        userRepository.save(user);
    }
}
