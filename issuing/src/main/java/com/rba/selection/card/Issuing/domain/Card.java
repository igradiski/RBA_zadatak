package com.rba.selection.card.Issuing.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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

    private String name;

    private String lastName;

    private String OIB;

    private String cardNumber;

    private String status;
}
