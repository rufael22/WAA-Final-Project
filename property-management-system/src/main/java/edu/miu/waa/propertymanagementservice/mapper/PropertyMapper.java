package edu.miu.waa.propertymanagementservice.mapper;

import edu.miu.waa.propertymanagementservice.dto.PropertyDto;
import edu.miu.waa.propertymanagementservice.entity.Property;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PropertyMapper {
    private final ModelMapper mapper;

    public PropertyDto toDto(Property property) {
        return mapper.map(property, PropertyDto.class);
    }

    public Set<PropertyDto> toDtos(Set<Property> properties) {
        return properties.stream().map(this::toDto).collect(Collectors.toSet());
    }

    public List<PropertyDto> toListDtos(List<Property> properties) {
        return properties.stream().map(this::toDto).collect(Collectors.toList());
    }

    public Property toEntity(PropertyDto propertyDto) {
        return mapper.map(propertyDto, Property.class);
    }

    public Set<Property> toEntities(Set<PropertyDto> propertyDtos) {
        return propertyDtos.stream().map(this::toEntity).collect(Collectors.toSet());
    }

    public List<Property> toEntityList(List<PropertyDto> propertyDtos) {
        return propertyDtos.stream().map(this::toEntity).collect(Collectors.toList());
    }
}
