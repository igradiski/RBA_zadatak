package com.rba.selection.card.manager.controller;

import com.rba.selection.card.manager.domain.dto.UserDto;
import com.rba.selection.card.manager.service.impl.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private final UserService userService;
	private Logger log = LoggerFactory.getLogger(AuthController.class);

	public AuthController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/echo")
	public ResponseEntity<String> echo() {

		log.info("Echo test request");
		return ResponseEntity.status(HttpStatus.OK).body("API radi!");
	}


	@PostMapping("/signup")
	public ResponseEntity<UserDto> registerUser(@RequestBody UserDto userDto) {

		log.info("User register request");
		return userService.registerUser(userDto);
	}

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody UserDto userDto) {

		log.info("Login request for user: "+userDto.username());
		return userService.loginUser(userDto);
	}
}
