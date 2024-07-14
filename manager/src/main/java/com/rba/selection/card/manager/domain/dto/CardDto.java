package com.rba.selection.card.manager.domain.dto;

public record CardDto(Long id, String cardNumber,String status) {

    public CardDto(Long id, String cardNumber, String status) {
        this.id = id;
        this.cardNumber = cardNumber;
        this.status = status;
    }
}
