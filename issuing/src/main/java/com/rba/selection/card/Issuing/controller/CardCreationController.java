package com.rba.selection.card.Issuing.controller;

import com.rba.selection.card.Issuing.domain.dto.CardCreationDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/card")
public class CardCreationController {

    private Logger log = LoggerFactory.getLogger(CardCreationController.class);

    public CardCreationController() {
    }

    @PostMapping
    public ResponseEntity<CardCreationDto> createCard(@RequestBody CardCreationDto cardCreationDto){
        log.info("received card: "+cardCreationDto.toString());
        return ResponseEntity.status(HttpStatus.CREATED).body(cardCreationDto);
    }
}
