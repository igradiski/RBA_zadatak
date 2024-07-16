package com.rba.selection.card.manager.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.Instant;
import java.util.Set;

@Entity
@Table(name="PERSON")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
@Getter
@Setter
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "SEQ_PERSON")
    @SequenceGenerator(name="SEQ_PERSON",allocationSize = 1)
    private Long id;

    private String name;

    private String lastName;

    private String OIB;

    @CreatedDate
    private Instant createdDate;

    @LastModifiedDate
    @Column(name = "updated_date")
    private Instant updatedDate;

    @OneToMany(mappedBy = "person", orphanRemoval = true)
    private Set<Card> cards;


}
