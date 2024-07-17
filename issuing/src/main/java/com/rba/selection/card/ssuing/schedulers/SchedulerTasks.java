package com.rba.selection.card.ssuing.schedulers;


import com.rba.selection.card.ssuing.service.impl.CardService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class SchedulerTasks {

    private final Logger LOGGER = LoggerFactory.getLogger(SchedulerTasks.class);

    private final CardService cardService;

    public SchedulerTasks(CardService cardService) {
        this.cardService = cardService;
    }


    @Scheduled(fixedRate = 1000)
    public void sendCardReceived(){
        LOGGER.info("Scheduler for received creation");
        cardService.sendCardReceived();
    }

    @Scheduled(fixedRate = 40000)
    public void sendCardToPersonalization(){
        LOGGER.info("Scheduler for sending cards to creation");
        cardService.sendCardsToPersonalization();
    }

    @Scheduled(fixedRate = 60000)
    public void sendCardToCreation(){
        LOGGER.info("Scheduler for sending cards to creation");
        cardService.sendCardsToCreation();

    }
}
