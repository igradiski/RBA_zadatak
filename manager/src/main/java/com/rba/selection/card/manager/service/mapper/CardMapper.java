package com.rba.selection.card.manager.service.mapper;

import com.rba.selection.card.manager.domain.Card;
import com.rba.selection.card.manager.domain.Person;
import com.rba.selection.card.manager.domain.dto.CardCreationDto;
import com.rba.selection.card.manager.domain.dto.CardDto;
import org.springframework.stereotype.Component;

@Component
public class CardMapper {

    public CardDto toDto(Card card) {
        return new CardDto(card.getId(),card.getCardNumber(),card.getStatus());
    }

    public CardCreationDto toCardCreationDto(Card card) {
        Person cardOwner = card.getPerson();
        return new CardCreationDto(
                cardOwner.getName(),
                cardOwner.getLastName(),
                cardOwner.getOIB(),
                card.getStatus(),
                card.getCardNumber());
    }
}
