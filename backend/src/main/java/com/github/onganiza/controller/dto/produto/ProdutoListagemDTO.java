package com.github.onganiza.controller.dto.produto;

public record ProdutoListagemDTO(
        Integer id,
        String nome,
        String classificacao,
        String unidadeMedida
) {
}
