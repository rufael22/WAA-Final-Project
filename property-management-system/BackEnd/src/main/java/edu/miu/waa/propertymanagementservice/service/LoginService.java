package edu.miu.waa.propertymanagementservice.service;

import edu.miu.waa.propertymanagementservice.domain.LoginRequest;
import edu.miu.waa.propertymanagementservice.domain.LoginResponse;

public interface LoginService {

    LoginResponse login(LoginRequest loginRequest);
}
