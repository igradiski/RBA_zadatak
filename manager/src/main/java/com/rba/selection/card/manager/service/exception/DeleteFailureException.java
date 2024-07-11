package com.rba.selection.card.manager.service.exception;

public class DeleteFailureException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;

	public DeleteFailureException(String exception) {
        super(exception);
    }

}
