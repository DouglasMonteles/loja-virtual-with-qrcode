package br.com.doug.loja.services;

import br.com.doug.loja.entities.dtos.ProductDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {

    public ProductDto insert(ProductDto productDto);

    public void notifyAboutInsertionOfProduct(String userId, ProductDto productDto);

    Page<ProductDto> findAll(Pageable pageable);
}
