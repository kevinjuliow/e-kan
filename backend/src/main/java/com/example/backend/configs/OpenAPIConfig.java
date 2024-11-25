package com.example.backend.configs;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("e-kan API")
                        .version("1.0.0")
                        .description("This is a sample Spring Boot API with Swagger documentation")
                        .contact(new Contact()
                                .name("Kevin Julio")
                                .email("-")
                                .url("https://github.com/kevinjuliow"))
                        );
    }
}
