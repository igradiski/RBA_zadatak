package com.rba.selection.card.manager.configuration;


import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.IntegerSerializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.*;

import java.util.Map;

import static org.apache.kafka.clients.CommonClientConfigs.GROUP_ID_CONFIG;
import static org.apache.kafka.clients.CommonClientConfigs.SESSION_TIMEOUT_MS_CONFIG;
import static org.apache.kafka.clients.consumer.ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG;
import static org.apache.kafka.clients.producer.ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG;
import static org.apache.kafka.clients.producer.ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG;

@Configuration
public class KafkaConsumerConfig {

    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

    @Bean
    public Map<String,Object> consumerProperties(){
        return Map.of(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,bootstrapServers,
                GROUP_ID_CONFIG,"spring-ccloud",
                ENABLE_AUTO_COMMIT_CONFIG,false,
                SESSION_TIMEOUT_MS_CONFIG,1500,
                ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringSerializer.class,
                ConsumerConfig.VALUE_DESERIALIZER_CLASS_DOC,StringSerializer.class

        );
    }

    @Bean
    public ConsumerFactory<String,String> consumerFactory(){
        return new DefaultKafkaConsumerFactory<>(consumerProperties());
    }
}
