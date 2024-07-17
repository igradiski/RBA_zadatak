package com.rba.selection.card.manager.controller;


import com.rba.selection.card.manager.domain.dto.PersonDto;
import com.rba.selection.card.manager.service.impl.PersonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/person")
public class PersonController {

    private Logger log = LoggerFactory.getLogger(PersonController.class);

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @PostMapping()
    public ResponseEntity<PersonDto> createPerson(@RequestBody PersonDto personDto){
        log.info("Creating person: "+personDto.toString());
        return ResponseEntity.status(HttpStatus.CREATED).body(personService.addPerson(personDto));
    }

    @GetMapping("/all")
    public Page<PersonDto> getPersons(Pageable pageable){
        log.info("Fetching all persons for page"+pageable.toString());
        return personService.getPersonsPaged(pageable);
    }

    @GetMapping("/{oib}")
    public ResponseEntity<PersonDto> getPersonByOib(@PathVariable String oib){
        return ResponseEntity.status(HttpStatus.OK).body(personService.getPersonByOib(oib));
    }

    @DeleteMapping("/{oib}")
    public ResponseEntity<Object> deletePerson(@PathVariable String oib){
        return personService.deletePersonByOib(oib);
    }
}
