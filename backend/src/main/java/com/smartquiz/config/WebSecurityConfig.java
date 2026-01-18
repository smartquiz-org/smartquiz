package com.smartquiz.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

/**
 * Base Web Security configuration - enables WebSecurity for the application.
 * Actual security rules are defined in SecurityConfig or SecurityDisabledConfig
 * based on the app.security.enabled property.
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
}
