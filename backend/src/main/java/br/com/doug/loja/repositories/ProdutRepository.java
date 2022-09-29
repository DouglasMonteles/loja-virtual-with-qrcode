package br.com.doug.loja.repositories;

import br.com.doug.loja.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutRepository extends JpaRepository<Product, Long> {
}
