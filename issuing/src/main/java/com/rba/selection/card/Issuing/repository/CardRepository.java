package com.rba.selection.card.Issuing.repository;

import com.rba.selection.card.Issuing.domain.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card,Long> {

    boolean existsByOIB(String oib);
}
