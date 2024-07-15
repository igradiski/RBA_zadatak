package com.rba.selection.card.Issuing.repository;

import com.rba.selection.card.Issuing.domain.Card;
import com.rba.selection.card.Issuing.domain.EStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card,Long> {

    boolean existsByOIB(String oib);

    @Query(value = "SELECT c from Card c WHERE c.status = ?1")
    List<Card> findCardsByStatus(String receivedForCreation);
}
