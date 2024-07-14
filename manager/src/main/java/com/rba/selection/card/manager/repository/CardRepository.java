package com.rba.selection.card.manager.repository;

import com.rba.selection.card.manager.domain.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends JpaRepository<Card,Long> {


}
