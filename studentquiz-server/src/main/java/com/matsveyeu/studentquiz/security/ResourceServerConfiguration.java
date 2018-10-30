package com.matsveyeu.studentquiz.security;

import com.matsveyeu.studentquiz.enums.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;

@Configuration
@EnableResourceServer
public class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {

    private final String admin = UserRole.ADMIN.toString();
    private final String teacher = UserRole.TEACHER.toString();
    private final String student = UserRole.STUDENT.toString();

    @Value("${security.oauth2.resource.id")
    private String resourceId;

    @Autowired
    private AccessDeniedHandler accessDeniedHandler;

    @Autowired
    private AuthenticationEntryPoint authenticationEntryPoint;

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) {
        resources
                .resourceId(resourceId)
                .stateless(false);
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .antMatcher("/api/**")
                .anonymous().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/users/**").hasRole(admin)
                .antMatchers("/api/users/**").hasAnyRole(admin, teacher, student)
                .antMatchers("/api/**").hasAnyRole(admin, teacher, student)
                .antMatchers("/api/config/**").permitAll()
                .and()
                .exceptionHandling()
                .accessDeniedHandler(accessDeniedHandler)
                .authenticationEntryPoint(authenticationEntryPoint);
    }
}
