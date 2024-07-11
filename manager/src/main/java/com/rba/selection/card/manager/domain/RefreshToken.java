package com.rba.selection.card.manager.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

/**
 * The persistent class for the user database table.
 * 
 */
@Entity
@Table(name = "REFRESH_TOKEN")
@Getter
@Setter
@NoArgsConstructor
public class RefreshToken {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "SEQ_REFTOK")
	@SequenceGenerator(name="SEQ_REFTOK",allocationSize = 1)
	private Long id;

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User user;

	@Column(nullable = false, unique = true)
	private String token;

	@Column(name="expire")
	private Instant expire;

}
