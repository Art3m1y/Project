package ru.art3m1y.petprojectshop.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.art3m1y.petprojectshop.product.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
