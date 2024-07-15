package com.rba.selection.card.Issuing.domain;

public enum EStatus {

    SUBMITTED(1,"Submitted"),
    RECEIVED_FOR_CREATION(2,"Received for creation"),
    PERSONALIZED(3,"Personalized"),
    CREATED(4,"Created");

    private Integer id;
    private String name;

    EStatus(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
}
