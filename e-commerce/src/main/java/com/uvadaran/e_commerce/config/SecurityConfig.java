package com.uvadaran.e_commerce.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:5173")
        );

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "PATCH",
                        "DELETE",
                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of("*")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }

    @Bean
    SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

            .cors(cors ->
                    cors.configurationSource(
                            corsConfigurationSource()
                    )
            )

            .csrf(csrf -> csrf.disable())

            .sessionManagement(session ->
                    session.sessionCreationPolicy(
                            SessionCreationPolicy.STATELESS
                    )
            )

            .httpBasic(basic -> basic.disable())

            .formLogin(form -> form.disable())

            .authorizeHttpRequests(auth -> auth

                // Public APIs
                .requestMatchers("/auth/**")
                .permitAll()

                // Product Viewing
                .requestMatchers(
                        HttpMethod.GET,
                        "/products/**"
                )
                .permitAll()

                // ADMIN ONLY APIs
                .requestMatchers(
                        HttpMethod.POST,
                        "/products/**"
                )
                .hasRole("ADMIN")

                .requestMatchers(
                        HttpMethod.PUT,
                        "/products/**"
                )
                .hasRole("ADMIN")

                .requestMatchers(
                        HttpMethod.PATCH,
                        "/products/**"
                )
                .hasRole("ADMIN")

                .requestMatchers(
                        HttpMethod.DELETE,
                        "/products/**"
                )
                .hasRole("ADMIN")

                // Any other request
                .anyRequest()
                .authenticated()
            );

        http.addFilterBefore(
                jwtFilter,
                UsernamePasswordAuthenticationFilter.class
        );

        return http.build();
    }
}