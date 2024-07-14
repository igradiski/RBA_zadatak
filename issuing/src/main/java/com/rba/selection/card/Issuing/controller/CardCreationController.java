package com.rba.selection.card.Issuing.controller;

import com.rba.selection.card.Issuing.domain.dto.CardCreationDto;
import com.rba.selection.card.Issuing.service.impl.CardService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/card")
public class CardCreationController {

    private Logger log = LoggerFactory.getLogger(CardCreationController.class);

    private final CardService cardService;

    public CardCreationController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping
    public ResponseEntity<String> createCard(@RequestBody CardCreationDto cardCreationDto){
        log.info("received card: "+cardCreationDto.toString());
        return ResponseEntity.status(HttpStatus.CREATED).body(cardService.addCard(cardCreationDto));
    }
}
