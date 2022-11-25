package edu.miu.waa.propertymanagementservice.domain;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class ApplicationDetail {
    @NotEmpty(message = "Name is required")
    private String name;

    @NotEmpty(message = "Phone is required")
    private String phone;

    @NotEmpty(message = "Email is required")
    private String email;

    private String currentStreet;
    private String currentCity;
    private String currentZipCode;

    private String incomeMonthly;
    private String incomeSource;

    private String employmentCurrent;
    private String employmentSince;
    private String employmentPrevious;
    private String employmentDuration;

    private String referenceName;
    private String referenceAddress;
    private String referencePhone;

    private String signatureName;
    private String signatureDate;

    @NotNull(message = "OwnerEmail is required")
    private String ownerEmail;
}
