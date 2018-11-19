package com.matsveyeu.studentquiz.controller;

import com.matsveyeu.studentquiz.converter.implementation.ResultDtoConverter;
import com.matsveyeu.studentquiz.converter.implementation.UserDtoConverter;
import com.matsveyeu.studentquiz.dto.ResultDto;
import com.matsveyeu.studentquiz.dto.UserDto;
import com.matsveyeu.studentquiz.entity.User;
import com.matsveyeu.studentquiz.service.ResultService;
import com.matsveyeu.studentquiz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.stream.Collectors;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserDtoConverter userDtoConverter;

    @Autowired
    private ResultService resultService;

    @Autowired
    private ResultDtoConverter resultDtoConverter;

    @GetMapping(value = "/{id}", produces = {"application/hal+json"})
    public Resource<UserDto> getUser(@PathVariable String id) {
        User user = userService.findById(id);
        UserDto dto = userDtoConverter.fromEntityToDto(user);

        Link selfLink = linkTo(methodOn(UserController.class).getUser(id)).withSelfRel().withType("GET");
        Link updateLink = linkTo(UserController.class).slash(dto.getUserId()).withRel("update").withType("PUT");
        Link deleteLink = linkTo(UserController.class).slash(dto.getUserId()).withRel("delete").withType("DELETE");
        dto.add(selfLink, updateLink, deleteLink);

        return new Resource<>(dto, selfLink, updateLink, deleteLink);
    }

    @GetMapping(produces = {"application/hal+json"})
    public Resources<UserDto> getAllUsers() {
        Collection<UserDto> users = userService
                .findAll()
                .stream()
                .map(userDtoConverter::fromEntityToDto)
                .peek(dto -> {
                    Link selfLink = linkTo(methodOn(UserController.class).getUser(dto.getUserId())).withSelfRel().withType("GET");
                    Link updateLink = linkTo(UserController.class).slash(dto.getUserId()).withRel("update").withType("PUT");
                    Link deleteLink = linkTo(UserController.class).slash(dto.getUserId()).withRel("delete").withType("DELETE");
                    dto.add(selfLink, updateLink, deleteLink);
                })
                .collect(Collectors.toSet());

        Link selfLink = linkTo(methodOn(UserController.class).getAllUsers()).withSelfRel().withType("GET");

        return new Resources<>(users, selfLink);
    }

    @PostMapping(produces = {"application/hal+json"})
    @ResponseStatus(HttpStatus.CREATED)
    public Resource<UserDto> createUser(@Valid @RequestBody UserDto dto) {
        User user = userDtoConverter.fromDtoToEntity(dto);
        user = userService.add(user);
        dto = userDtoConverter.fromEntityToDto(user);

        Link selfLink = linkTo(methodOn(UserController.class).getUser(dto.getUserId())).withSelfRel().withType("GET");
        Link updateLink = linkTo(UserController.class).slash(dto.getUserId()).withRel("update").withType("PUT");
        Link deleteLink = linkTo(UserController.class).slash(dto.getUserId()).withRel("delete").withType("DELETE");
        dto.add(selfLink, updateLink, deleteLink);

        return new Resource<>(dto, selfLink, updateLink, deleteLink);
    }

    @PutMapping(value = "/{id}", produces = {"application/hal+json"})
    public Resource<UserDto> updateUser(@PathVariable String id, @Valid @RequestBody UserDto dto) {
        userService.findById(id);

        User user = userDtoConverter.fromDtoToEntity(dto);
        user = userService.update(user);
        dto = userDtoConverter.fromEntityToDto(user);

        Link selfLink = linkTo(methodOn(UserController.class).getUser(id)).withSelfRel().withType("GET");
        Link updateLink = linkTo(UserController.class).slash(dto.getUserId()).withRel("update").withType("PUT");
        Link deleteLink = linkTo(UserController.class).slash(dto.getUserId()).withRel("delete").withType("DELETE");
        dto.add(selfLink, updateLink, deleteLink);

        return new Resource<>(dto, selfLink, updateLink, deleteLink);
    }

    @DeleteMapping(value = "/{id}", produces = {"application/hal+json"})
    public Resource<UserDto> deleteUser(@PathVariable String id) {
        User user = userService.findById(id);
        userService.remove(user);

        UserDto dto = userDtoConverter.fromEntityToDto(user);

        Link createLink = linkTo(UserController.class).withRel("create").withType("POST");
        dto.add(createLink);

        return new Resource<>(dto, createLink);
    }

    @GetMapping(value = "/me", produces = {"application/hal+json"})
    public Resource<UserDto> getMe() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userService.findByLogin(userDetails.getUsername());
        UserDto dto = userDtoConverter.fromEntityToDto(user);

        Link selfLink = linkTo(UserController.class).slash(dto.getUserId()).withSelfRel().withType("GET");
        dto.add(selfLink);

        return new Resource<>(dto, selfLink);
    }

    @GetMapping(value = "/{id}/results", produces = {"application/hal+json"})
    public Resources<ResultDto> getResultsByUser(@PathVariable String id) {
        User user = userService.findById(id);
        Collection<ResultDto> results = resultService
                .findByUser(user)
                .stream()
                .map(resultDtoConverter::fromEntityToDto)
                .collect(Collectors.toList());

        Link selfLink = linkTo(methodOn(UserController.class).getResultsByUser(id)).withSelfRel().withType("GET");
        Link userLink = linkTo(UserController.class).slash(id).withRel("user").withType("GET");

        return new Resources<>(results, selfLink, userLink);
    }
}
