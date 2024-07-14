package com.rba.selection.card.Issuing.service.impl;


import com.rba.selection.card.Issuing.domain.Card;
import com.rba.selection.card.Issuing.domain.dto.CardCreationDto;
import com.rba.selection.card.Issuing.repository.CardRepository;
import com.rba.selection.card.Issuing.service.exception.ObjectAlreadyExists;
import com.rba.selection.card.Issuing.service.exception.PostFailureException;
import com.rba.selection.card.Issuing.service.mapper.CardMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class CardService {

    private Logger log = LoggerFactory.getLogger(CardService.class);

    private final CardMapper mapper;

    private final CardRepository cardRepository;

    public CardService(CardMapper mapper, CardRepository cardRepository) {
        this.mapper = mapper;
        this.cardRepository = cardRepository;
    }

    @Transactional
    public String addCard(CardCreationDto cardCreationDto) {
        if(cardRepository.existsByOIB(cardCreationDto.OIB())){
            throw new ObjectAlreadyExists("Card for user with OIB: "+cardCreationDto.OIB()+" already exists");
        }
        try{
            Card card = mapper.toEntity(cardCreationDto);
            cardRepository.save(card);
            return "Card is created";
        }catch (Exception e){
            log.error("Error inserting person");
            throw new PostFailureException("Error inserting person");
        }
    }
}
