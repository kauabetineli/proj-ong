package com.github.onganiza.controller.dto;

public record ItemDoacaoDTO(
        Integer produtoId,
        String nomeProduto,
        Double quantidade,
        String unidadeMedida
) {
}
