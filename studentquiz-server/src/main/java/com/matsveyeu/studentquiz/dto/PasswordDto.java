package com.matsveyeu.studentquiz.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class PasswordDto {

    private String userId;
    private String oldPassword;
    private String newPassword;

    @NotNull
    public String getUserId() {
        return userId;
    }

    @NotNull
    @Size(min = 6, max = 30)
    public String getOldPassword() {
        return oldPassword;
    }

    @NotNull
    @Size(min = 6, max = 30)
    public String getNewPassword() {
        return newPassword;
    }
}
