package com.matsveyeu.studentquiz.converter.implementation;

import com.matsveyeu.studentquiz.converter.DtoConverter;
import com.matsveyeu.studentquiz.dto.UserDto;
import com.matsveyeu.studentquiz.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserDtoConverter implements DtoConverter<User, UserDto> {

    @Override
    public UserDto fromEntityToDto(User user) {
        if (user == null) {
            return null;
        }

        return new UserDto.Builder()
                .setId(user.getId())
                .setFirstName(user.getFirstName())
                .setLastName(user.getLastName())
                .setEmail(user.getEmail())
                .setRole(user.getRole())
                .setLogin(user.getLogin())
                .setPassword(user.getPassword())
                .build();
    }

    @Override
    public User fromDtoToEntity(UserDto dto) {
        if (dto == null) {
            return null;
        }

        return new User.Builder()
                .setId(dto.getUserId())
                .setFirstName(dto.getFirstName())
                .setLastName(dto.getLastName())
                .setEmail(dto.getEmail())
                .setRole(dto.getRole())
                .setLogin(dto.getLogin())
                .setPassword(dto.getPassword())
                .build();
    }
}
