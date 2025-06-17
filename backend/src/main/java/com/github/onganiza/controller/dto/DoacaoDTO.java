package com.github.onganiza.controller.dto;

import java.time.LocalDateTime;
import java.util.List;

public record DoacaoDTO (
        Integer id,
        Long idDoador,
        String doador,
        String documento,
        LocalDateTime data,
        List<ItemDoacaoDTO> itens
) {
}
