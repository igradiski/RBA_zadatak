package com.rba.selection.card.manager.domain.dto;

public record CardCreationDto(String name,String lastName, String OIB, String status, String cardNumber) {


    public CardCreationDto(String name, String lastName, String OIB, String status, String cardNumber) {
        this.name = name;
        this.lastName = lastName;
        this.OIB = OIB;
        this.status = status;
        this.cardNumber = cardNumber;
    }
}
