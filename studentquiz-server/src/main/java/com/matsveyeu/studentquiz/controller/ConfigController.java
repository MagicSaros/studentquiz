package com.matsveyeu.studentquiz.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/api/config")
@CrossOrigin
public class ConfigController {

    @GetMapping("/countries")
    public ResponseEntity<?> getAllowedCountries() {
        String[] countryCodes = Locale.getISOCountries();
        Map<String, String> countries = new HashMap<>();
        for (String countryCode : countryCodes) {
            Locale locale = new Locale("", countryCode);
            countries.put(locale.getCountry(), locale.getDisplayName());
        }
        return new ResponseEntity<>(countries, HttpStatus.OK);
    }
}
