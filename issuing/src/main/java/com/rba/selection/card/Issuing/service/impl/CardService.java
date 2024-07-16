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
            Card savedCard = cardRepository.save(card);
            return savedCard.getCardNumber();
        }catch (Exception e){
            log.error("Error inserting person");
            throw new PostFailureException("Error inserting person");
        }
    }
    @Transactional
    public void sendCardsToCreation() {
        List<Card> cardsForCreation = cardRepository.findCardsByStatus(EStatus.PERSONALIZED.name());
        for(Card card : cardsForCreation){
            card.setStatus(EStatus.CREATED.name());
            try{
                Card savedCard = cardRepository.save(card);
                Map<String,String> cardData = new HashMap<>();
                cardData.put("oib",savedCard.getOIB());
                cardData.put("status",savedCard.getStatus());
                template.send("card_issuing",cardData);
            }catch (Exception e){
                log.error("Error sending created card data");
                throw new PostFailureException("Error sending created card data");
            }
        }
    }

    @Transactional
    public void sendCardsToPersonalization() {
        List<Card> cardsForPersonalization = cardRepository.findCardsByStatusAndProduction(EStatus.RECEIVED_FOR_CREATION.name(),Boolean.TRUE);
        for(Card card : cardsForPersonalization){
            card.setStatus(EStatus.PERSONALIZED.name());
            try{
                Card savedCard = cardRepository.save(card);
                Map<String,String> cardData = new HashMap<>();
                cardData.put("oib",savedCard.getOIB());
                cardData.put("status",savedCard.getStatus());
                template.send("card_issuing",cardData);
            }catch (Exception e){
                log.error("Error sending personalized card data");
                throw new PostFailureException("Error sending personalized card data");
            }
        }
    }

    @Transactional
    public void sendCardReceived() {
        List<Card> cardsReceived = cardRepository.findCardsByStatusAndProduction(EStatus.RECEIVED_FOR_CREATION.name(),Boolean.FALSE);
        log.info(String.valueOf(cardsReceived.size()));
        for(Card card : cardsReceived){
            card.setInProduction(Boolean.TRUE);
            try{
                cardRepository.save(card);
                Map<String,String> cardData = new HashMap<>();
                cardData.put("oib",card.getOIB());
                cardData.put("status",card.getStatus());
                template.send("card_issuing",cardData);
            }catch (Exception e){
                log.error("Error sending personalized card data");
                throw new PostFailureException("Error sending personalized card data");
            }
        }
    }
}
