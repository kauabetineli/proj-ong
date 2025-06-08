package com.github.onganiza.controller.dto;

import java.time.LocalDateTime;
import java.util.List;

public record DoacaoDTO (
        Integer id,
        String doador,
        LocalDateTime data,
        List<ItemDoacaoDTO> itens
) {
}
