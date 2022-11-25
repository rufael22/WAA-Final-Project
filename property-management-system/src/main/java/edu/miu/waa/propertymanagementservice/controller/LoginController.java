package edu.miu.waa.propertymanagementservice.controller;

import edu.miu.waa.propertymanagementservice.domain.LoginRequest;
import edu.miu.waa.propertymanagementservice.domain.LoginResponse;
import edu.miu.waa.propertymanagementservice.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/login")
public class LoginController {

    private final LoginService loginService;

    @PostMapping
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        return loginService.login(loginRequest);
    }
}
