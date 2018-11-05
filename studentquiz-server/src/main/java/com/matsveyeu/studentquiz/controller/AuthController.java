package com.matsveyeu.studentquiz.controller;

import com.matsveyeu.studentquiz.converter.implementation.UserDtoConverter;
import com.matsveyeu.studentquiz.dto.UserDto;
import com.matsveyeu.studentquiz.entity.User;
import com.matsveyeu.studentquiz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/oauth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserDtoConverter userDtoConverter;

    @Autowired
    private PasswordEncoder encoder;

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@Valid @RequestBody UserDto dto) {
        User user = userDtoConverter.fromDtoToEntity(dto);
        user.setPassword(encoder.encode(user.getPassword()));
        user = userService.add(user);
        dto = userDtoConverter.fromEntityToDto(user);

        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }
}
