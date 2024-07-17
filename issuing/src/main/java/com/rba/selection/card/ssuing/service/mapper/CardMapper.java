package com.rba.selection.card.ssuing.service.mapper;

import com.rba.selection.card.ssuing.domain.Card;
import com.rba.selection.card.ssuing.domain.EStatus;
import com.rba.selection.card.ssuing.domain.dto.CardCreationDto;
import org.springframework.stereotype.Component;

@Component
public class CardMapper {

    public CardMapper() {
    }
    
    public Card toEntity(CardCreationDto dto){
        Card card = new Card();
        card.setName(dto.name());
        card.setLastName(dto.lastName());
        card.setOIB(dto.OIB());
        card.setStatus(EStatus.RECEIVED_FOR_CREATION.name());
        card.setCardNumber(dto.cardNumber());
        card.setInProduction(Boolean.FALSE);
        return card;
    }
}
