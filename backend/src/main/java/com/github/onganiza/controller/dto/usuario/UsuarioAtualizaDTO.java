package com.github.onganiza.controller.dto.usuario;

import com.github.onganiza.entity.Setor;
import com.github.onganiza.entity.TipoUsuario;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.br.CPF;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

public record UsuarioAtualizaDTO(

        Integer id,

        @NotNull(message = "Nome não deve ser nulo")
        @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
        String nome,

        @NotBlank(message = "CPF é obrigatório")
        @CPF(message = "CPF em formato incorreto")
        String cpf,

        String senha,

        @NotNull(message = "Endereço é obrigatório")
        String endereco,

        @NotNull(message = "Setor é obrigatório")
        Setor setor,

        @NotNull(message = "Tipo de usuário é obrigatório")
        TipoUsuario tipoUsuario,

        @NotNull
        @Past(message = "Não pode ser data futura")
        LocalDate dataNascimento,

        MultipartFile fotoPerfil

){
}
