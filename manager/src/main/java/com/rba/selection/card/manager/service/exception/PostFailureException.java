package com.rba.selection.card.manager.service.exception;

public class PostFailureException  extends RuntimeException {
	
	private static final long serialVersionUID = 1L;

	public PostFailureException(String exception) {
        super(exception);
    }

}
