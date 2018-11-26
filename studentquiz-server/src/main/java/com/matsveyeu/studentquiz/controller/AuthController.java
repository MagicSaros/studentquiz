package com.matsveyeu.studentquiz.controller;

import com.matsveyeu.studentquiz.converter.implementation.UserDtoConverter;
import com.matsveyeu.studentquiz.dto.PasswordDto;
import com.matsveyeu.studentquiz.dto.UserDetailsDto;
import com.matsveyeu.studentquiz.dto.UserDto;
import com.matsveyeu.studentquiz.entity.User;
import com.matsveyeu.studentquiz.exception.IllegalOperationException;
import com.matsveyeu.studentquiz.service.AuthService;
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
    private AuthService authService;

    @Autowired
    private UserDtoConverter userDtoConverter;

    @Autowired
    private PasswordEncoder encoder;

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@Valid @RequestBody UserDetailsDto dto) {
        User user = new User.Builder()
                .setLogin(dto.getLogin())
                .setEmail(dto.getEmail())
                .setPassword(encoder.encode(dto.getPassword()))
                .build();
        user = userService.add(user);
        UserDto userDto = userDtoConverter.fromEntityToDto(user);

        return new ResponseEntity<>(userDto, HttpStatus.CREATED);
    }

    @PostMapping("/change_password")
    public ResponseEntity<Void> changePassword(@Valid @RequestBody PasswordDto dto) {
        authService.changePassword(dto.getUserId(), dto.getOldPassword(), dto.getNewPassword());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
