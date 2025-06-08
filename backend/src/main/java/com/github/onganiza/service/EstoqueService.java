package com.github.onganiza.service;

import com.github.onganiza.entity.Estoque;
import com.github.onganiza.entity.produto.Produto;
import com.github.onganiza.repository.EstoqueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EstoqueService {

    private final EstoqueRepository repository;

    public void criarEstoque(Produto produto) {
        Estoque estoque = new Estoque();
        estoque.setProduto(produto);
        estoque.setQuantidade(0.0);
        repository.save(estoque);
    }

    public void atualizarEstoque(Integer idProduto, Double quantidade) {

    }

}
