package ru.art3m1y.petprojectshop.product.exceptions;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ErrorResponse {
    private String message;
    private int status;
}
