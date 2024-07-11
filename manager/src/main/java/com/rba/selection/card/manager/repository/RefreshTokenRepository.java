package com.rba.selection.card.manager.repository;

import com.rba.selection.card.manager.domain.RefreshToken;
import com.rba.selection.card.manager.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
	
	@Override
    Optional<RefreshToken> findById(Long id);

    Optional<RefreshToken> findByToken(String token);

    RefreshToken findByUser(User user);
}
