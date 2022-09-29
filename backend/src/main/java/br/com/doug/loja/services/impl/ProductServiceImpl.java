package br.com.doug.loja.services.impl;

import br.com.doug.loja.entities.Product;
import br.com.doug.loja.entities.dtos.ProductDto;
import br.com.doug.loja.repositories.ProdutRepository;
import br.com.doug.loja.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProdutRepository produtRepository;

    @Override
    @Transactional
    public ProductDto insert(ProductDto productDto) {
        var product = new Product(productDto);
        product = produtRepository.save(product);

        return new ProductDto(product);
    }

}