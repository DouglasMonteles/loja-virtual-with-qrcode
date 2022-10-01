package br.com.doug.loja.services;

import br.com.doug.loja.entities.dtos.ProductDto;

public interface ProductService {

    public ProductDto insert(ProductDto productDto);

    public void notifyAboutInsertionOfProduct(String userId, ProductDto productDto);

}
