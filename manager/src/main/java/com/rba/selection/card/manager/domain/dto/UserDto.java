package com.rba.selection.card.manager.domain.dto;

public record UserDto(String username,
					  String password
					 ) {

	public UserDto(String username,
				   String password
				  ) {
		this.username = username;
		this.password = password;
	}
}
