package edu.miu.waa.propertymanagementservice.dto;

import edu.miu.waa.propertymanagementservice.entity.Address;
import edu.miu.waa.propertymanagementservice.entity.HomeType;
import edu.miu.waa.propertymanagementservice.entity.PropertyType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PropertyDto {
    private int id;
    private double price;
    private int numOfRoom;
    private PropertyType propertyType;
    private HomeType homeType;
    private Address location;
    private Set<String> pictures;
    private Set<String> presignPictures;
    private String overview;
    private LocalDate availableDate;
    private boolean listed = true;
    private boolean deleted = false;
    private UserDto owner;
    private String deletedBy;
    private LocalDate createdDate;
    private int views;
}


