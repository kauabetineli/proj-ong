package com.github.onganiza.controller.dto;

import java.util.List;

public record DoacaoCadastroDTO(
        Integer doadorId,
        List<ItemDoacaoCadastroDTO> itens
) {
}
