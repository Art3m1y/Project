package ru.art3m1y.petprojectshop.product.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
@Entity
@Table
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Название товара не может быть пустым")
    private String name;

    @Min(value = 1, message = "Цена должна быть больше 0 рублей")
    @Max(value = 10000000, message = "Цена не должна превышать 10000000 рублей")
    private double cost;

}
