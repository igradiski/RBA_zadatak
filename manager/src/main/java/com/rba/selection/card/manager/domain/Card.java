package com.rba.selection.card.manager.domain;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

@Entity
@Table(name="CARD")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
@Getter
@Setter
public class Card {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "SEQ_CARD")
    @SequenceGenerator(name="SEQ_CARD",allocationSize = 1)
    private Long id;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="PERSON_ID")
    @JsonBackReference
    private Person person;

    private String cardNumber;

    @CreatedDate
    private Instant createdDate;

    @LastModifiedDate
    @Column(name = "updated_date")
    private Instant updatedDate;

    private String status;
}
