package com.github.onganiza.controller.dto.produto;

public record ProdutoDTO (
        Integer id,
        String nome,
        String classificacao,
        String unidadeMedida
) {
}
