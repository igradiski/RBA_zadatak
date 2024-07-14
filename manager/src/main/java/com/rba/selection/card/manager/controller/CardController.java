package com.rba.selection.card.manager.controller;


import com.rba.selection.card.manager.domain.dto.PersonDto;
import com.rba.selection.card.manager.service.impl.CardService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/card")
public class CardController {

    private Logger log = LoggerFactory.getLogger(CardController.class);

    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping
    public ResponseEntity<?> createCard(@RequestBody PersonDto personDto){
        log.info("Creating card for person: "+personDto.toString());
        return ResponseEntity.status(HttpStatus.CREATED).body(cardService.addCard(personDto));
    }
}
