package com.rba.selection.card.Issuing.service.impl;


import com.rba.selection.card.Issuing.domain.Card;
import com.rba.selection.card.Issuing.domain.dto.CardCreationDto;
import com.rba.selection.card.Issuing.repository.CardRepository;
import com.rba.selection.card.Issuing.service.exception.ObjectAlreadyExists;
import com.rba.selection.card.Issuing.service.exception.PostFailureException;
import com.rba.selection.card.Issuing.service.mapper.CardMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class CardService {

    private Logger log = LoggerFactory.getLogger(CardService.class);

    private final CardMapper mapper;

    private final CardRepository cardRepository;

    private final KafkaTemplate<String,String> template;

    public CardService(CardMapper mapper, CardRepository cardRepository, KafkaTemplate<String, String> template) {
        this.mapper = mapper;
        this.cardRepository = cardRepository;
        this.template = template;
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

    public void sendCardsToCreation() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String timestamp = now.format(formatter);

        log.info("creation at {}", timestamp);
        template.send("card_issuing", "creation at " + timestamp);
    }

    public void sendCardsToPersonalization() {
        //template.send("card_issuing","personalization");


    }
}
