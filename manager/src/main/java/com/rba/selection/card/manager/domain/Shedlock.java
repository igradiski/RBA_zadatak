package com.rba.selection.card.manager.domain;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "shedlock")
@NoArgsConstructor
@Data
/**
 * Potrebno je okinuti SQL skriptu, jer nije zgodno sa ddl-om kreirat tablice za shedlock
 */
public class Shedlock {

    @Id
    @Column(name = "name", columnDefinition = "VARCHAR(60)",nullable = false)
    private String name;

    @Column(name = "lock_until", columnDefinition = "datetime2",nullable = false)
    private Date lock_until;

    @Column(name = "locked_at", columnDefinition = "datetime2",nullable = false)
    private Date locked_at;

    @Column(name= "locked_by", columnDefinition = "VARCHAR(255",nullable = false)
    private String locked_by;
}
