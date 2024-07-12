package com.rba.selection.card.manager.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PersonDto(
        @NotBlank(message = "Namecannot be empty!")String name,
        @NotBlank(message = "Last name name cannot be empty!")String lastName,
        @NotBlank(message = "OIB cannot be empty!")
        @Size(min = 11, message = "OIB is too short!")
        @Size(max = 11, message = "OIB is too long!")
        String OIB ,
        String status) {

    public PersonDto(String name, String lastName, String OIB, String status) {
        this.name = name;
        this.lastName = lastName;
        this.OIB = OIB;
        this.status = status;
    }
}
