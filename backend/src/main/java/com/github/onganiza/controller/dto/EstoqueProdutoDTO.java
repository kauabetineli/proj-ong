package com.github.onganiza.controller.dto;

import com.github.onganiza.controller.dto.produto.ProdutoDTO;

public record EstoqueProdutoDTO(
        ProdutoDTO produto,
        Double quantidade
) {
}
