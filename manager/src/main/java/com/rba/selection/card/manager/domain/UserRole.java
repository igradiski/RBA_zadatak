package com.rba.selection.card.manager.domain;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

/**
 * The persistent class for the user_role database table.
 * 
 */
@Entity
@Table(name="user_role")
@NoArgsConstructor
@Getter
@Setter
public class UserRole implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "SEQ_USER_ROLE")
	@SequenceGenerator(name="SEQ_USER_ROLE",allocationSize = 1)
	private Long id;

	@Temporal(TemporalType.TIMESTAMP)
	private Date datetime;

	@ManyToOne
	private Role role;

	@ManyToOne
	private User user;


	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}