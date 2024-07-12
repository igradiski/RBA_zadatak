package com.rba.selection.card.manager.service.mapper;


import com.rba.selection.card.manager.domain.Person;
import com.rba.selection.card.manager.domain.dto.PersonDto;
import org.springframework.stereotype.Component;

@Component
public class PersonMapper {
    public Person toEntity(PersonDto personDto) {
        Person person = new Person();
        person.setName(personDto.name());
        person.setLastName(personDto.lastName());
        person.setOIB(personDto.OIB());

        return person;
    }

    public PersonDto toDto(Person savedPerson) {

        PersonDto dto = new PersonDto(savedPerson.getName(),savedPerson.getLastName(),savedPerson.getOIB(),savedPerson.getStatus());
        return dto;
    }
}
