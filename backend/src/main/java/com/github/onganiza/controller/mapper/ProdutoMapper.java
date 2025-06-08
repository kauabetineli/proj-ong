package com.github.onganiza.controller.mapper;

import com.github.onganiza.controller.dto.produto.ProdutoCadastroDTO;
import com.github.onganiza.controller.dto.produto.ProdutoDTO;
import com.github.onganiza.controller.dto.produto.ProdutoListagemDTO;
import com.github.onganiza.entity.produto.Produto;
import com.github.onganiza.entity.produto.UnidadeMedida;
import com.github.onganiza.entity.produto.ClassificacaoProduto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProdutoMapper {

    @Mapping(target = "classificacao", source = "classificacao")
    @Mapping(target = "unidadeMedida", source = "unidadeMedida")
    Produto toEntity(ProdutoDTO produtoDTO);

    @Mapping(target = "classificacao", source = "classificacao")
    @Mapping(target = "unidadeMedida", source = "unidadeMedida")
    Produto toEntity(ProdutoCadastroDTO produtoCadastroDTO);

    ProdutoDTO toDto(Produto produto);

    ProdutoCadastroDTO toDtoCadastro(Produto produto);

    ProdutoListagemDTO toListagemDto(Produto produto);

    default ClassificacaoProduto mapClassificacao(String classificacao) {
        return ClassificacaoProduto.valueOf(classificacao.toUpperCase());
    }

    default UnidadeMedida mapUnidade(String unidade) {
        return UnidadeMedida.valueOf(unidade.toUpperCase());
    }

}
