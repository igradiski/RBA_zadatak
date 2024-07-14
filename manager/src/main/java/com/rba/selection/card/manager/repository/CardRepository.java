package com.rba.selection.card.manager.repository;

import com.rba.selection.card.manager.domain.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card,Long> {


    @Query(value = "SELECT c from Card c WHERE c.status = ?1")
    List<Card> findCardsByStatus(String status);
}
