package com.github.onganiza.controller.dto;

import com.github.onganiza.entity.Escolaridade;

import java.time.LocalDate;

public record BeneficiarioDetalhesDTO(
        Integer id,
        String nome,
        String nomePai,
        String nomeMae,
        String cpf,
        LocalDate dataNascimento,
        Escolaridade escolaridade,
        String intolerancia,
        String observacao,
        String fotoPerfilBase64
){

}
