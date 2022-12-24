package ru.art3m1y.petprojectshop.product.exceptions;

public class ProductNoFoundException extends RuntimeException {

    public ProductNoFoundException() {
        super("Продукт с таким идентификатором не найден");
    }
}
