package com.rba.selection.card.manager.service.impl;

import com.rba.selection.card.manager.domain.Card;
import com.rba.selection.card.manager.domain.EStatus;
import com.rba.selection.card.manager.domain.Person;
import com.rba.selection.card.manager.domain.dto.CardCreationDto;
import com.rba.selection.card.manager.domain.dto.CardDto;
import com.rba.selection.card.manager.domain.dto.PersonDto;
import com.rba.selection.card.manager.repository.CardRepository;
import com.rba.selection.card.manager.repository.PersonRepository;
import com.rba.selection.card.manager.service.exception.NoSuchElementException;
import com.rba.selection.card.manager.service.exception.PostFailureException;
import com.rba.selection.card.manager.service.mapper.CardMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Random;

@Component
public class CardService {

    private Logger log = LoggerFactory.getLogger(CardService.class);

    private final CardRepository cardRepository;

    private final PersonRepository personRepository;

    private final RestTemplate restTemplate;

    private final CardMapper mapper;



    @Value("${issuing.uri}")
    private String url;


    public CardService(CardRepository cardRepository, PersonRepository personRepository, RestTemplate restTemplate, CardMapper mapper) {
        this.cardRepository = cardRepository;
        this.personRepository = personRepository;
        this.restTemplate = restTemplate;
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
            CardCreationDto cardForCreationDto = mapper.toCardCreationDto(card);
            log.info("Sending card : "+ cardForCreationDto.toString());
            sendCardToIssuingServer(cardForCreationDto);
        }
    }

    private void sendCardToIssuingServer(CardCreationDto cardForCreationDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String fullUrl = url+"/card";
        HttpEntity<CardCreationDto> requestEntity = new HttpEntity<>(cardForCreationDto, headers);
        log.info(fullUrl);
        ResponseEntity<String> response = restTemplate.exchange(
                fullUrl,
                HttpMethod.POST,
                requestEntity,
                String.class);

        // Handle response if needed
        HttpStatusCode statusCode = response.getStatusCode();
        if (statusCode == HttpStatus.CREATED) {
            String responseBody = response.getBody();
            System.out.println("Response: " + responseBody.toString());
        } else {
            System.err.println("POST request failed with status: " + statusCode);
        }
    }


    @Transactional
    public void changeCardStatus(Map<String, String> cardDataMap) {
        String oib = cardDataMap.get("oib");
        String status = cardDataMap.get("status");
        Person person = personRepository.findPersonByOib(oib)
                .orElseThrow(() -> new NoSuchElementException("Person with oib: "+ oib + " does not exist!"));
        Card personsCard = person.getCards().iterator().next();
        personsCard.setStatus(status);
        try{
            cardRepository.save(personsCard);
        }catch (Exception e){
            log.error("Error updating card");
            throw new PostFailureException("Error updating card");
        }
    }


}
