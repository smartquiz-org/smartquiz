package com.smartquiz.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Security configuration when security is disabled (dev mode).
 * All endpoints are public when app.security.enabled=false
 */
@Configuration
@ConditionalOnProperty(name = "app.security.enabled", havingValue = "false")
public class SecurityDisabledConfig {

    @Bean
    @Primary
    public SecurityFilterChain disabledFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
        return http.build();
    }
}
