package com.rba.selection.card.manager.schedulers;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class SchedulerTasks {

    private final Logger LOGGER = LoggerFactory.getLogger(SchedulerTasks.class);


    @Scheduled(fixedRate = 50000)
    public void sendCardToCreation(){
        LOGGER.info("Scheduler for sending cards to creation");
    }
}
