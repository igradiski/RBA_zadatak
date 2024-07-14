package com.rba.selection.card.manager.service.impl;


import com.rba.selection.card.manager.domain.Person;
import com.rba.selection.card.manager.domain.dto.PersonDto;
import com.rba.selection.card.manager.repository.PersonRepository;
import com.rba.selection.card.manager.service.exception.DeleteFailureException;
import com.rba.selection.card.manager.service.exception.NoSuchElementException;
import com.rba.selection.card.manager.service.exception.ObjectAlreadyExists;
import com.rba.selection.card.manager.service.exception.PostFailureException;
import com.rba.selection.card.manager.service.mapper.PersonMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class PersonService {

    private Logger log = LoggerFactory.getLogger(PersonService.class);

    private final PersonRepository personRepository;

    private final PersonMapper personMapper;

    public PersonService(PersonRepository personRepository, PersonMapper personMapper) {
        this.personRepository = personRepository;
        this.personMapper = personMapper;
    }

    @Transactional
    public ResponseEntity<?> addPerson(PersonDto personDto) {
        if(personRepository.existsByOIB(personDto.OIB())){
            throw new ObjectAlreadyExists("User with this username already exists!");
        }
        try{
            Person person = personMapper.toEntity(personDto);
            Person savedPerson = personRepository.save(person);
            return ResponseEntity.status(HttpStatus.CREATED).body(personMapper.toDto(savedPerson));
        }catch (Exception e){
            log.error("Error inserting person");
            throw new PostFailureException("Error inserting person");
        }

    }

    @Transactional(readOnly = true)
    public Page<PersonDto> getPersonsPaged(Pageable pageable) {
        return personRepository.findAll(pageable).map(personMapper::toDto);
    }

    @Transactional(readOnly = true)
    public PersonDto getPersonByOib(String oib) {
        log.info("Getting person with oib: "+oib);
        Person person = personRepository.findPersonByOib(oib)
                .orElseThrow(() -> new NoSuchElementException("Person with oib: "+ oib + " does not exist!"));
        return personMapper.toDto(person);
    }

    @Transactional
    public ResponseEntity<Object> deletePersonByOib(String oib) {
        Person person = personRepository.findPersonByOib(oib)
                .orElseThrow(() -> new DeleteFailureException("Person with oib: "+ oib + " cannot be deleted because it does not exist!"));
        try{
            personRepository.delete(person);
            return ResponseEntity.status(HttpStatus.OK).body("Person is deleted!");
        }catch (Exception e){
            log.error("Person with oib: "+ oib + "cannot be deleted");
            throw new DeleteFailureException(e.getMessage());
        }
    }
}
