package com.rba.selection.card.manager.service.impl;

import com.rba.selection.card.manager.domain.Card;
import com.rba.selection.card.manager.domain.EStatus;
import com.rba.selection.card.manager.domain.Person;
import com.rba.selection.card.manager.domain.dto.CardCreationDto;
import com.rba.selection.card.manager.domain.dto.CardDto;
import com.rba.selection.card.manager.domain.dto.PersonDto;
import com.rba.selection.card.manager.repository.CardRepository;
import com.rba.selection.card.manager.repository.PersonRepository;
import com.rba.selection.card.manager.service.exception.DeleteFailureException;
import com.rba.selection.card.manager.service.exception.NoSuchElementException;
import com.rba.selection.card.manager.service.exception.PostFailureException;
import com.rba.selection.card.manager.service.mapper.CardMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;

@Component
public class CardService {

    private Logger log = LoggerFactory.getLogger(CardService.class);

    private final CardRepository cardRepository;

    private final PersonRepository personRepository;

    private final CardMapper mapper;


    public CardService(CardRepository cardRepository, PersonRepository personRepository, CardMapper mapper) {
        this.cardRepository = cardRepository;
        this.personRepository = personRepository;
        this.mapper = mapper;
    }

    @Transactional
    public CardDto addCard(PersonDto personDto) {
        Person person = personRepository.findPersonByOib(personDto.OIB())
                .orElseThrow(() -> new NoSuchElementException("Person with oib: "+ personDto.OIB() + " does not exist!"));
        if(!person.getCards().isEmpty()){
            throw new PostFailureException("Person with oib: "+ personDto.OIB() + " already owns a card!");
        }
        Card card =  new Card();
        card.setPerson(person);
        card.setCardNumber(generateRandom14LetterString());
        card.setStatus(EStatus.SUBMITTED.name());
        try{
            cardRepository.save(card);
            return mapper.toDto(card);
        }catch (Exception e){
            log.error("Error inserting card");
            throw new PostFailureException("Error inserting card");
        }
    }

    private String generateRandom14LetterString() {
        String prefix = "CRD_";
        int length = 14;
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        Random random = new Random();
        StringBuilder stringBuilder = new StringBuilder(prefix);

        // Generate the remaining 11 characters
        for (int i = 0; i < length - prefix.length(); i++) {
            int index = random.nextInt(characters.length());
            stringBuilder.append(characters.charAt(index));
        }

        return stringBuilder.toString();
    }

    @Transactional(readOnly = true)
    public void sendCardsToCreation() {

        List<Card> cardsForCreation = cardRepository.findCardsByStatus(EStatus.SUBMITTED.name());
        log.info("Scheduled creation for: "+ cardsForCreation.size() +" cards");
        for(Card card : cardsForCreation){
            log.info("Sendind card with card number: "+card.getCardNumber()+" to production");
            Person cardOwner = card.getPerson();
            CardCreationDto cardForCreationDto = mapper.toCardCreationDto(card);
            log.info("Sending card : "+ cardForCreationDto.toString());
        }
    }
}
