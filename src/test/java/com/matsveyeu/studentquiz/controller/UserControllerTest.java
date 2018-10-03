package com.matsveyeu.studentquiz.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.matsveyeu.studentquiz.converter.implementation.UserDtoConverter;
import com.matsveyeu.studentquiz.dto.UserDto;
import com.matsveyeu.studentquiz.entity.User;
import com.matsveyeu.studentquiz.enums.UserRole;
import com.matsveyeu.studentquiz.exception.EntityNotFoundException;
import com.matsveyeu.studentquiz.service.UserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.LinkedList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    private static final String URL_PREFIX = "/api/users";
    private static final String CONTENT_TYPE = "application/hal+json;charset=UTF-8";
    private List<User> users;
    private List<UserDto> usersDto;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private UserDtoConverter userDtoConverter;

    @Before
    public void init() {
        User userOne = new User.Builder()
                .setId("1")
                .setFirstName("FirstOne")
                .setLastName("LastOne")
                .setEmail("one@mail.com")
                .setRole(UserRole.STUDENT)
                .setLogin("One")
                .setPassword("one")
                .build();

        User userTwo = new User.Builder()
                .setId("2")
                .setFirstName("FirstTwo")
                .setLastName("LastTwo")
                .setEmail("two@mail.com")
                .setRole(UserRole.TEACHER)
                .setLogin("Two")
                .setPassword("two")
                .build();

        users = new LinkedList<>();
        users.add(userOne);
        users.add(userTwo);

        UserDtoConverter converter = new UserDtoConverter();
        UserDto userDtoOne = converter.fromEntityToDto(userOne);
        UserDto userDtoTwo = converter.fromEntityToDto(userTwo);

        usersDto = new LinkedList<>();
        usersDto.add(userDtoOne);
        usersDto.add(userDtoTwo);
    }

    @Test
    public void getUserTest() throws Exception {
        final String url = URL_PREFIX + "/{id}";

        User user = users.get(0);
        UserDto dto = usersDto.get(0);

        BDDMockito.given(userService.findById(user.getId())).willReturn(user);
        BDDMockito.given(userDtoConverter.fromEntityToDto(user)).willReturn(dto);

        mockMvc
                .perform(get(url, "1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(CONTENT_TYPE))
                .andExpect(jsonPath("$.userId").value("1"))
                .andExpect(jsonPath("$.firstName").value("FirstOne"))
                .andExpect(jsonPath("$.lastName").value("LastOne"));

        BDDMockito.given(userService.findById("0")).willThrow(new EntityNotFoundException("User not found"));

        mockMvc
                .perform(get(url, "0"))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(CONTENT_TYPE))
                .andExpect(jsonPath("$.title").value("Entity not found"))
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.message").value("User not found"));
    }

    @Test
    public void createUser() throws Exception {
        final String url = URL_PREFIX;

        User user = users.get(0);
        UserDto dto = usersDto.get(0);

        ObjectMapper mapper = new ObjectMapper();
        String userJson = mapper.writeValueAsString(user);

        BDDMockito.given(userDtoConverter.fromDtoToEntity(dto)).willReturn(user);
        BDDMockito.given(userService.add(user)).willReturn(user);
        BDDMockito.given(userDtoConverter.fromEntityToDto(user)).willReturn(dto);

        mockMvc
                .perform(post(url)
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(userJson))
                .andExpect(content().contentType(CONTENT_TYPE))
                .andExpect(jsonPath("$.userId").value(dto.getUserId()))
                .andExpect(jsonPath("$.firstName").value(dto.getFirstName()))
                .andExpect(jsonPath("$.lastName").value(dto.getLastName()));
    }

    @Test
    public void updateUser() throws Exception {
        final String url = URL_PREFIX + "/{id}";

        User user = users.get(0);
        user.setFirstName("FirstFirstOne");
        user.setLastName("LastLastOne");

        UserDto dto = usersDto.get(0);
        dto.setFirstName("FirstFirstOne");
        dto.setLastName("LastLastOne");

        ObjectMapper mapper = new ObjectMapper();
        String userJson = mapper.writeValueAsString(user);

        BDDMockito.given(userService.findById(user.getId())).willReturn(user);
        BDDMockito.given(userDtoConverter.fromDtoToEntity(dto)).willReturn(user);
        BDDMockito.given(userService.update(user)).willReturn(user);
        BDDMockito.given(userDtoConverter.fromEntityToDto(user)).willReturn(dto);

        mockMvc
                .perform(put(url, user.getId())
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(userJson))
                .andExpect(content().contentType(CONTENT_TYPE))
                .andExpect(jsonPath("$.firstName").value(dto.getFirstName()))
                .andExpect(jsonPath("$.lastName").value(dto.getLastName()));

        BDDMockito.given(userService.findById("0")).willThrow(new EntityNotFoundException("No such id"));

        mockMvc
                .perform(get(url, "0"))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(CONTENT_TYPE))
                .andExpect(jsonPath("$.title").value("Entity not found"))
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.message").value("No such id"));
    }

    @Test
    public void deleteUserTest() throws Exception {
        final String url = URL_PREFIX + "/{id}";

        User user = users.get(0);
        UserDto dto = usersDto.get(0);

        BDDMockito.given(userService.findById(user.getId())).willReturn(user);
        BDDMockito.given(userDtoConverter.fromEntityToDto(user)).willReturn(dto);

        mockMvc
                .perform(get(url, user.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(CONTENT_TYPE))
                .andExpect(jsonPath("$.userId").value(dto.getUserId()))
                .andExpect(jsonPath("$.firstName").value(dto.getFirstName()))
                .andExpect(jsonPath("$.lastName").value(dto.getLastName()));
    }
}
