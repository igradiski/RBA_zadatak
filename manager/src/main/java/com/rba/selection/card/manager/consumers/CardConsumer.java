package com.rba.selection.card.manager.consumers;

import com.rba.selection.card.manager.service.impl.CardService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class CardConsumer {

    private Logger log = LoggerFactory.getLogger(CardConsumer.class);

    private final CardService cardService;

    public CardConsumer(CardService cardService) {
        this.cardService = cardService;
    }

    @KafkaListener(topics = {"card_issuing"}, groupId = "groupId")
    public void consume(Map<String,String> cardDataMap){
        log.info("Received message from card issuing");
        cardService.changeCardStatus(cardDataMap);
    }

}
