package br.com.doug.loja.entities.dtos;

import br.com.doug.loja.entities.Product;

import java.io.Serial;
import java.io.Serializable;

public record ProductDto(
        Long id,
        String name,
        Float price,
        String description
) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1757434060589869261L;

    public ProductDto(Product product) {
        this(product.getId(), product.getName(), product.getPrice(), product.getDescription());
    }

}
