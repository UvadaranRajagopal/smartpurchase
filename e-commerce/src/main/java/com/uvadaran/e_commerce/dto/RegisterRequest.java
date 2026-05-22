package com.uvadaran.e_commerce.dto;

import lombok.Data;

@Data
public class RegisterRequest {

    private String username;

    private String password;

    private String role;
}