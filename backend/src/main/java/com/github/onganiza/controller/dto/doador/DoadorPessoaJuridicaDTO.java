package com.github.onganiza.controller.dto.doador;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.br.CNPJ;

public record DoadorPessoaJuridicaDTO(
        Long id,
        @NotBlank String razaoSocial,
        @NotBlank @CNPJ String cnpj
) {}
