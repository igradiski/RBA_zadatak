package com.rba.selection.card.manager.controller;


import com.rba.selection.card.manager.consumers.CardConsumer;
import com.rba.selection.card.manager.domain.dto.PersonDto;
import com.rba.selection.card.manager.service.impl.CardService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.Map;
import java.util.concurrent.ForkJoinPool;

@RestController
@RequestMapping("/card")
public class CardController {

    private Logger log = LoggerFactory.getLogger(CardController.class);

    private final CardService cardService;

    private final CardConsumer cardConsumer;

    public CardController(CardService cardService, CardConsumer cardConsumer) {
        this.cardService = cardService;
        this.cardConsumer = cardConsumer;
    }

    @PostMapping
    public ResponseEntity<?> createCard(@RequestBody PersonDto personDto){
        log.info("Creating card for person: "+personDto.toString());
        return ResponseEntity.status(HttpStatus.CREATED).body(cardService.addCard(personDto));
    }

}
