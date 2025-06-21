package com.github.onganiza.repository;

import com.github.onganiza.entity.Estoque;
import com.github.onganiza.entity.produto.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EstoqueRepository extends JpaRepository<Estoque, Integer> {
    Optional<Estoque> findByProduto(Produto produto);

    List<Estoque> findByProdutoNomeContainingIgnoreCase(String nome);

}
