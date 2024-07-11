package com.rba.selection.card.manager.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;


/**
 * The persistent class for the role database table.
 * 
 */
@Entity
@Table(name="ROLE")
@NoArgsConstructor
@Getter
@Setter
public class Role implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "SEQ_ROLE")
	@SequenceGenerator(name="SEQ_ROLE",allocationSize = 1)
	private Long id;

	@OneToMany(mappedBy="role")
	private List<UserRole> userRoles;

	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private ERole name;


}