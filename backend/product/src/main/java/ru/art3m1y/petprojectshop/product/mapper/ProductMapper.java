package ru.art3m1y.petprojectshop.product.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.art3m1y.petprojectshop.product.dto.ProductDto;
import ru.art3m1y.petprojectshop.product.model.Product;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(target = "id", ignore = true)
    Product toDto(ProductDto productDto);

    ProductDto toEntity(Product product);
}
