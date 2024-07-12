package com.rba.selection.card.manager.controller;


import com.rba.selection.card.manager.domain.dto.PersonDto;
import com.rba.selection.card.manager.service.impl.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/person")
public class PersonController {


    private Logger log = LoggerFactory.getLogger(AuthController.class);

    public PersonController() {
    }

    @PostMapping()
    public ResponseEntity<?> createPerson(@RequestBody PersonDto personDto){
        log.info("Creating person: "+personDto.toString());
        return null;
    }
}
