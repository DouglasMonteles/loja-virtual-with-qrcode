package br.com.doug.loja.resources;

import br.com.doug.loja.entities.dtos.ProductDto;
import br.com.doug.loja.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping(value = "/products")
public class ProductResource {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<Page<ProductDto>> findAll(Pageable pageable) {
        var products = this.productService.findAll(pageable);
        return ResponseEntity.ok().body(products);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Void> receiveTheProductData(@PathVariable String userId, @RequestBody ProductDto productDto) {
        this.productService.notifyAboutInsertionOfProduct(userId, productDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody ProductDto productDto) {
        var productCreated = productService.insert(productDto);
        var uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(productCreated.id())
                .toUri();

        return ResponseEntity.created(uri).build();
    }

}
