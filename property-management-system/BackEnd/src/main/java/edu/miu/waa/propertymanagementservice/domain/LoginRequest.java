package edu.miu.waa.propertymanagementservice.domain;

import lombok.Data;

@Data
public class LoginRequest {

    private String email;

    private String password;

}