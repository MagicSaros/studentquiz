package com.matsveyeu.studentquiz.controller;

import com.matsveyeu.studentquiz.converter.implementation.UserDtoConverter;
import com.matsveyeu.studentquiz.dto.UserDto;
import com.matsveyeu.studentquiz.entity.User;
import com.matsveyeu.studentquiz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserDtoConverter userDtoConverter;

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable String id) {
        User user = userService.findById(id);
        UserDto dto = userDtoConverter.fromEntityToDto(user);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Collection<UserDto>> getAllUsers() {
        Collection<UserDto> users = userService
                .findAll()
                .stream()
                .map(userDtoConverter::fromEntityToDto)
                .collect(Collectors.toSet());

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto dto) {
        User user = userDtoConverter.fromDtoToEntity(dto);
        user = userService.add(user);
        dto = userDtoConverter.fromEntityToDto(user);

        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable String id, @Valid @RequestBody UserDto dto) {
        userService.findById(id);

        User user = userDtoConverter.fromDtoToEntity(dto);
        user = userService.update(user);
        dto = userDtoConverter.fromEntityToDto(user);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UserDto> deleteUser(@PathVariable String id) {
        User user = userService.findById(id);
        userService.remove(user);

        UserDto dto = userDtoConverter.fromEntityToDto(user);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
