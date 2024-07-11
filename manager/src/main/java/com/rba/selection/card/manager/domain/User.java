package com.rba.selection.card.manager.domain;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="USER_ACC")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
public class User {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "SEQ_USER")
    @SequenceGenerator(name="SEQ_USER",allocationSize = 1)
    private Long id;

    private String username;

    private String password;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="LAST_LOGIN")
    private Date lastLogin;

    @CreatedDate
    private Instant createdDate;

    @LastModifiedDate
    @Column(name = "updated_date")
    private Instant updatedDate;

    @OneToMany(mappedBy = "user")
    private Set<RefreshToken> refreshToken;

    @OneToMany(mappedBy="user")
    private List<UserRole> userRoles;

}
