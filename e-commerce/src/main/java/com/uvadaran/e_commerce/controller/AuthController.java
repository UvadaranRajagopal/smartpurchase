package com.uvadaran.e_commerce.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.uvadaran.e_commerce.dto.LoginRequest;
import com.uvadaran.e_commerce.dto.RegisterRequest;
import com.uvadaran.e_commerce.entity.User;
import com.uvadaran.e_commerce.repository.UserRepository;
import com.uvadaran.e_commerce.util.JwtUtil;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {

        Optional<User> existingUser =
                userRepository.findByUsername(
                        request.getUsername()
                );

        if(existingUser.isPresent()) {

            throw new RuntimeException("Username already exists");
        }

        User user = new User();

        user.setUsername(request.getUsername());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        // Default role
        user.setRole("USER");

        return userRepository.save(user);
    }

    @PostMapping("/login")
    public Map<String, String> login(
            @RequestBody LoginRequest request
    ) {

        Optional<User> optionalUser =
                userRepository.findByUsername(
                        request.getUsername()
                );

        if(optionalUser.isEmpty()) {

            throw new RuntimeException("User not found");
        }

        User user = optionalUser.get();

        boolean passwordMatch =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if(!passwordMatch) {

            throw new RuntimeException("Invalid password");
        }

        String token =
        jwtUtil.generateToken(
                user.getUsername(),
                user.getRole()
        );

        Map<String, String> response =
                new HashMap<>();

        response.put("token", token);

        response.put("role", user.getRole());

        response.put("username", user.getUsername());

        return response;
    }
}