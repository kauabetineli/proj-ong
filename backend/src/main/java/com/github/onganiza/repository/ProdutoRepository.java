package com.github.onganiza.repository;

import com.github.onganiza.entity.produto.ClassificacaoProduto;
import com.github.onganiza.entity.produto.Produto;
import com.github.onganiza.entity.produto.UnidadeMedida;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Integer> {

    List<Produto> findAllByClassificacao(ClassificacaoProduto classificacao);

    List<Produto> findAllByUnidadeMedida(UnidadeMedida unidadeMedida);

    List<Produto> findAllByNomeContainingIgnoreCase(String nome);

}
