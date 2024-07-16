package com.rba.selection.card.manager.repository;


import com.rba.selection.card.manager.domain.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person,Long> {

    boolean existsByOIB(String OIB);

    @Query(value = "SELECT p FROM Person p WHERE p.OIB = ?1")
    Optional<Person> findPersonByOib(String oib);

    Person findPersonByOIB(String oib);
}
