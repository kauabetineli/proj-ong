package com.github.onganiza.controller.mapper;

import com.github.onganiza.controller.dto.UsuarioCadastroDTO;
import com.github.onganiza.controller.dto.UsuarioDTO;
import com.github.onganiza.controller.dto.UsuarioDetalhesDTO;
import com.github.onganiza.entity.Usuario;
import com.github.onganiza.util.ConversorImagem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = ConversorImagem.class)
public interface UsuarioMapper {

    @Mapping(source = "nome", target = "nome")
    @Mapping(source = "cpf", target = "cpf")
    @Mapping(source = "senha", target = "senha")
    @Mapping(source = "endereco", target = "endereco")
    @Mapping(source = "setor", target = "setor")
    @Mapping(source = "tipoUsuario", target = "tipoUsuario")
    @Mapping(source = "dataNascimento", target = "dataNascimento")
    @Mapping(source = "fotoPerfil", target = "fotoPerfil", qualifiedByName = "converterImagemParaByte")
    Usuario toEntity(UsuarioCadastroDTO usuarioCadastroDTO);

    @Mapping(source = "fotoPerfil", target = "fotoPerfilBase64", qualifiedByName = "converterByteParaBase64")
    UsuarioDetalhesDTO toDetalhesDto(Usuario usuario);

    UsuarioDTO toDto(Usuario usuario);

    Usuario toEntity(UsuarioDetalhesDTO usuarioDetalhesDTO);

}


