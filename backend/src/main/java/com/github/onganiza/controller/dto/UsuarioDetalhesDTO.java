package com.github.onganiza.controller.dto;

import com.github.onganiza.entity.Setor;
import com.github.onganiza.entity.TipoUsuario;
import org.hibernate.validator.constraints.br.CPF;

import java.time.LocalDate;

public record UsuarioDetalhesDTO(

     Integer id,

     String nome,

     @CPF
     String cpf,

     String endereco,

     Setor setor,

     TipoUsuario tipoUsuario,

     LocalDate dataNascimento,

     String fotoPerfilBase64

    ){
}
