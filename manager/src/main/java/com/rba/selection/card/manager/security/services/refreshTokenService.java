package com.rba.selection.card.manager.security.services;


import com.rba.selection.card.manager.domain.RefreshToken;

import java.util.Optional;

public interface refreshTokenService {

	RefreshToken createRefreshToken(Long id);

	Optional<RefreshToken> findByToken(String requestRefreshToken);

	RefreshToken verifyExpiration(RefreshToken tok);

}
