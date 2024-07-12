package com.rba.selection.card.manager.service.mapper;

import com.rba.selection.card.manager.domain.User;
import com.rba.selection.card.manager.domain.dto.UserDto;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {


    private final PasswordEncoder encoder;

    public UserMapper(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    public User userDtoToUser(UserDto dto){
        User user = new User();
        user.setUsername(dto.username());
        user.setPassword(encoder.encode(dto.password()));
        return user;
    }


    public Object toDto(User savedUser) {
        UserDto dto = new UserDto(savedUser.getUsername(),savedUser.getPassword());
        return dto;
    }
}
