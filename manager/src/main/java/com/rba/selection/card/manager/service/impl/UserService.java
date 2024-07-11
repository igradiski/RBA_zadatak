package com.rba.selection.card.manager.service.impl;

import com.rba.selection.card.manager.domain.RefreshToken;
import com.rba.selection.card.manager.domain.User;
import com.rba.selection.card.manager.domain.dto.UserDto;
import com.rba.selection.card.manager.repository.UserRepository;
import com.rba.selection.card.manager.security.jwt.JwtUtils;
import com.rba.selection.card.manager.security.jwt.payload.response.JwtResponseToken;
import com.rba.selection.card.manager.security.servicesImpl.UserDetailsSecurityImpl;
import com.rba.selection.card.manager.service.exception.ObjectAlreadyExists;
import com.rba.selection.card.manager.service.mapper.UserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class UserService {

    private final UserRepository userRepository;

    private final JwtUtils jwtUtils;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder encoder;

    private final UserMapper userMapper;

    private final com.rba.selection.card.manager.security.services.refreshTokenService refreshTokenService;

    private Logger log = LoggerFactory.getLogger(UserService.class);

    public UserService(UserRepository userRepository, JwtUtils jwtUtils, AuthenticationManager authenticationManager, PasswordEncoder encoder, UserMapper userMapper, com.rba.selection.card.manager.security.services.refreshTokenService refreshTokenService) {
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        this.encoder = encoder;
        this.userMapper = userMapper;
        this.refreshTokenService = refreshTokenService;
    }

    @Transactional
    public ResponseEntity<?> registerUser(UserDto userDto) {
        if (userRepository.existsByUsername(userDto.username())) {
            throw new ObjectAlreadyExists("User with this username already exists!");
        }
        User newUser = userMapper.userDtoToUser(userDto);
        userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body("User created!");
    }

    public ResponseEntity<?> loginUser(UserDto userDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDto.username(), userDto.password()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsSecurityImpl userDetails = (UserDetailsSecurityImpl) authentication.getPrincipal();
        String jwt = jwtUtils.generateJwtToken(userDetails);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());
        return ResponseEntity.ok(new JwtResponseToken(jwt,refreshToken.getToken(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getAuthorities()));
    }
}
