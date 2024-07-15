package com.rba.selection.card.Issuing.service.impl;


import com.rba.selection.card.Issuing.domain.Card;
import com.rba.selection.card.Issuing.domain.EStatus;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class CardService {

    private Logger log = LoggerFactory.getLogger(CardService.class);

    private final CardMapper mapper;

    private final CardRepository cardRepository;

    private final KafkaTemplate<String,Map<String,String>> template;

    public CardService(CardMapper mapper, CardRepository cardRepository, KafkaTemplate<String, Map<String,String>> template) {
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
    @Transactional
    public void sendCardsToCreation() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String timestamp = now.format(formatter);

        //log.info("creation at {}", timestamp);
        //template.send("card_issuing", "creation at " + timestamp);
    }

    @Transactional
    public void sendCardsToPersonalization() {
        List<Card> cardForPersonalization = cardRepository.findCardsByStatus(EStatus.RECEIVED_FOR_CREATION.name());
        for(Card card : cardForPersonalization){
            card.setStatus(EStatus.RECEIVED_FOR_CREATION.name());
            try{
                Card savedCard = cardRepository.save(card);
                Map<String,String> cardData = new HashMap<>();
                cardData.put("oib",savedCard.getOIB());
                cardData.put("status",savedCard.getStatus());
                template.send("card_issuing",cardData);
            }catch (Exception e){
                log.error("Error sendind card data");
                throw new PostFailureException("Error sendind card data");
            }
        }
    }
}
