package com.rba.selection.card.manager.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories("com.rba.selection.card.manager.repository")
@EnableJpaAuditing
@EnableTransactionManagement
public class JpaConfiguration {
}
