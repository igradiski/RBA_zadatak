package com.rba.selection.card.Issuing.schedulers;


import com.rba.selection.card.Issuing.service.impl.CardService;
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

    @Scheduled(fixedRate = 3000)
    public void sendCardToPersonalization(){
        LOGGER.info("Scheduler for sending cards to creation");
        cardService.sendCardsToPersonalization();
    }

    @Scheduled(fixedRate = 2000)
    public void sendCardToCreation(){
        LOGGER.info("Scheduler for sending cards to creation");
        cardService.sendCardsToCreation();
    }
}
