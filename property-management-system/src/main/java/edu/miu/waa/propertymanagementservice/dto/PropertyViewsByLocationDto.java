package edu.miu.waa.propertymanagementservice.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PropertyViewsByLocationDto {
    private String city;
    private long views;

    public PropertyViewsByLocationDto(String city, long views) {
        this.city = city;
        this.views = views;
    }
}
