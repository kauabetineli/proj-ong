package com.github.onganiza.controller.dto;

import com.github.onganiza.entity.Escolaridade;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

public record BeneficiarioCadastroDTO (
        String nome,
        String nomePai,
        String nomeMae,
        String cpf,
        LocalDate dataNascimento,
        Escolaridade escolaridade,
        String intolerancia,
        String observacao,
        MultipartFile fotoPerfil
){

}
