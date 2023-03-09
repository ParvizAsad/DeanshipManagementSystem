package com.parvizasad.deanshipMS;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class DeanshipMsApplication {
	public static void main(String[] args) {
		SpringApplication.run(DeanshipMsApplication.class, args);
	}

}
