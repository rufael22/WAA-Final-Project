package edu.miu.waa.propertymanagementservice.service.impl;

import edu.miu.waa.propertymanagementservice.domain.LoginRequest;
import edu.miu.waa.propertymanagementservice.domain.LoginResponse;
import edu.miu.waa.propertymanagementservice.security.JwtHelper;
import edu.miu.waa.propertymanagementservice.service.LoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@Slf4j
public class LoginServiceImpl implements LoginService {

    private final AuthenticationManager authenticationManager;

    private final JwtHelper jwtHelper;

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        try {
            var usernamePasswordAuthenticationToken =  new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                    loginRequest.getPassword());
            authenticationManager.authenticate(usernamePasswordAuthenticationToken);
        } catch(BadCredentialsException e) {
            log.error("Bad Credentials: ", e);
        }

        final String accessToken = jwtHelper.generateToken(loginRequest.getEmail());
        final String refreshToken = jwtHelper.generateRefreshToken(loginRequest.getEmail());
        var loginResponse = new LoginResponse(accessToken, refreshToken, loginRequest.getEmail());
        return loginResponse;
    }
}
