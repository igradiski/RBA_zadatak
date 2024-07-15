package com.rba.selection.card.manager.consumers;

import com.rba.selection.card.manager.controller.PersonController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class CardConsumer {

    private Logger log = LoggerFactory.getLogger(CardConsumer.class);


    public CardConsumer() {
    }

    @KafkaListener(topics = {"card_issuing"}, groupId = "groupId")
    public void consume(Map<String,String> quote){
        log.info("received = "+ quote.get("oib")+ " "+ quote.get("status"));

    }
}
