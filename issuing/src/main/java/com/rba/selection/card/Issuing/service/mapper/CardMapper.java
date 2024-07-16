package com.rba.selection.card.Issuing.service.mapper;

import com.rba.selection.card.Issuing.domain.Card;
import com.rba.selection.card.Issuing.domain.EStatus;
import com.rba.selection.card.Issuing.domain.dto.CardCreationDto;
import com.rba.selection.card.Issuing.repository.CardRepository;
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
