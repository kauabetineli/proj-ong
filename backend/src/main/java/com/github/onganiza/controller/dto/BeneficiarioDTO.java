package com.github.onganiza.controller.dto;

import com.github.onganiza.entity.Escolaridade;

import java.time.LocalDate;

public record BeneficiarioDTO(
        Integer id,
        String nome,
        String cpf,
        LocalDate dataNascimento,
        Escolaridade escolaridade
){

}
