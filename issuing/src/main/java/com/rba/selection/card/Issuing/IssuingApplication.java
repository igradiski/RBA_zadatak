package com.rba.selection.card.Issuing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class IssuingApplication {

	public static void main(String[] args) {
		SpringApplication.run(IssuingApplication.class, args);
	}

}
