package com.rba.selection.card.manager.schedulers;


import com.rba.selection.card.manager.service.impl.CardService;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
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

    @Scheduled(fixedRate = 15000)
    //@SchedulerLock(name = "cardCreationScheduler", lockAtMostFor = "5m", lockAtLeastFor = "1m")
    public void sendCardToCreation(){
        LOGGER.info("Scheduler for sending cards to creation");
        cardService.sendCardsToCreation();
    }
}
