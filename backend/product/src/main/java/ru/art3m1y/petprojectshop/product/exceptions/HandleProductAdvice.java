package ru.art3m1y.petprojectshop.product.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class HandleProductAdvice {

    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(NumberFormatException.class)
    private ErrorResponse handlerException(NumberFormatException e) {
        return new ErrorResponse("Ошибка преобразования в число", 404);
    }

    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    @ExceptionHandler
    private ErrorResponse handlerException(ProductNoFoundException e) {
        return new ErrorResponse(e.getMessage(), 404);
    }

}
