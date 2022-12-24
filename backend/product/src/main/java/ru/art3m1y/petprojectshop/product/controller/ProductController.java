package ru.art3m1y.petprojectshop.product.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.art3m1y.petprojectshop.product.model.Product;
import ru.art3m1y.petprojectshop.product.service.ProductService;
import ru.art3m1y.petprojectshop.product.exceptions.ProductNoFoundException;

import java.util.List;

@RestController
@RequestMapping("/product")
@AllArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/products")
    @ResponseStatus(code = HttpStatus.OK)
    public List<Product> getProducts() {
        List<Product> productsFromDb = productService.findAll();

        if(productsFromDb.isEmpty()){
            throw new ProductNoFoundException();
        }
        return productService.findAll();
    }

    @GetMapping("/products/{id}")
    public Product getProduct(@PathVariable String id) {
        return productService.findById(Long.parseLong(id));
    }
}
