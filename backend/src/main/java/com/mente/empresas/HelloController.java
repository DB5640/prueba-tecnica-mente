package com.mente.empresas;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping("/")
    public String home() {
        return "¡Hola, Spring Boot está corriendo en mi PC! 🚀";
    }
}
