package edu.miu.waa.propertymanagementservice.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;

@Embeddable
@Getter
@Setter
public class Address {

    private String street;

    private String city;

    private String zipCode;
}
