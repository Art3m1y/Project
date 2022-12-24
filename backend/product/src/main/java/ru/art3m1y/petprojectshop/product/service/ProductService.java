package ru.art3m1y.petprojectshop.product.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.art3m1y.petprojectshop.product.model.Product;
import ru.art3m1y.petprojectshop.product.repository.ProductRepository;
import ru.art3m1y.petprojectshop.product.exceptions.ProductNoFoundException;

import java.util.List;

@AllArgsConstructor
@Service
@Transactional(readOnly = true)
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product findById(long id) {
        return productRepository.findById(id).orElseThrow(ProductNoFoundException::new);
    }
}
