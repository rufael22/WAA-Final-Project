package edu.miu.waa.propertymanagementservice.domain;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class ContactDetail {

    @NotEmpty(message = "Name is required")
    private String name;

    @NotEmpty(message = "Phone is required")
    private String phone;

    @NotEmpty(message = "Email is required")
    private String email;

    @NotEmpty(message = "Message is required")
    private String message;

    @NotNull(message = "OwnerEmail is required")
    private String ownerEmail;
}
