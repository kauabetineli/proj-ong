package com.github.onganiza.service;

import com.github.onganiza.controller.dto.EstoqueProdutoDTO;
import com.github.onganiza.controller.dto.produto.ProdutoDTO;
import com.github.onganiza.entity.Estoque;
import com.github.onganiza.entity.produto.Produto;
import com.github.onganiza.repository.EstoqueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EstoqueService {

    private final EstoqueRepository repository;
    private final ProdutoService produtoService;

    public void criarEstoque(Produto produto) {
        Estoque estoque = new Estoque();
        estoque.setProduto(produto);
        estoque.setQuantidade(0.0);
        repository.save(estoque);
    }

    public List<EstoqueProdutoDTO> listarEstoques() {
        List<Estoque> estoques = repository.findAll();
        List<EstoqueProdutoDTO> lista = new ArrayList<>();

        for (Estoque estoque : estoques) {
            ProdutoDTO produtoDTO = produtoService.buscarPorId(estoque.getProduto().getId());
            lista.add(new EstoqueProdutoDTO(produtoDTO, estoque.getQuantidade()));
        }

        return lista;
    }

    public void removerEstoque(Integer idEstoque) {
        repository.deleteById(idEstoque);
    }

}
