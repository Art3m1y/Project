package ru.art3m1y.petprojectshop.product.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;


@Getter
public class ProductDto {
    @NotEmpty(message = "Название товара не может быть пустым")
    private String name;

    @Min(value = 0, message = "Цена должна быть больше 0 рублей")
    @Max(value = 10000000, message = "Цена не должна превышать 10000000 рублей")
    private int cost;
}
