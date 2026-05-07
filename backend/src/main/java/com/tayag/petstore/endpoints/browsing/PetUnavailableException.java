package com.tayag.petstore.endpoints.browsing;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
class PetUnavailableException extends RuntimeException {
    PetUnavailableException(String message) {
        super(message);
    }
}
