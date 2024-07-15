package com.rba.selection.card.manager.service.mapper;

import com.rba.selection.card.manager.domain.Card;
import com.rba.selection.card.manager.domain.Person;
import com.rba.selection.card.manager.domain.dto.CardCreationDto;
import com.rba.selection.card.manager.domain.dto.CardDto;
import org.springframework.stereotype.Component;

@Component
public class CardMapper {

    public Card toEntity(CardDto cardDto){

        return null;
    }

    public CardDto toDto(Card card) {
        CardDto cardDto = new CardDto(card.getId(),card.getCardNumber(),card.getStatus());
        return cardDto;
    }

    public CardCreationDto toCardCreationDto(Card card) {
        Person cardOwner = card.getPerson();
        CardCreationDto cardForCreationDto = new CardCreationDto(
                cardOwner.getName(),
                cardOwner.getLastName(),
                cardOwner.getOIB(),
                card.getStatus(),
                card.getCardNumber());
        return cardForCreationDto;
    }
}
