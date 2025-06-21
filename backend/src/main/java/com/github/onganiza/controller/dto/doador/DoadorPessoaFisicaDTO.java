package com.github.onganiza.controller.dto.doador;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.br.CPF;

public record DoadorPessoaFisicaDTO(
        Long id,
        @NotBlank String nome,
        @NotBlank @CPF String cpf
) {}
