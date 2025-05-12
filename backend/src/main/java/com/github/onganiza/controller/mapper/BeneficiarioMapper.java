package com.github.onganiza.controller.mapper;

import com.github.onganiza.controller.dto.BeneficiarioAtualizaDTO;
import com.github.onganiza.controller.dto.BeneficiarioCadastroDTO;
import com.github.onganiza.controller.dto.BeneficiarioDTO;
import com.github.onganiza.controller.dto.BeneficiarioDetalhesDTO;
import com.github.onganiza.entity.Beneficiario;
import com.github.onganiza.util.ConversorImagem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = ConversorImagem.class)
public interface BeneficiarioMapper {

    @Mapping(source = "nome", target = "nome")
    @Mapping(source = "nomePai", target = "nomePai")
    @Mapping(source = "nomeMae", target = "nomeMae")
    @Mapping(source = "cpf", target = "cpf")
    @Mapping(source = "dataNascimento", target = "dataNascimento")
    @Mapping(source = "escolaridade", target = "escolaridade")
    @Mapping(source = "intolerancia", target = "intolerancia")
    @Mapping(source = "observacao", target = "observacao")
    @Mapping(source = "fotoPerfil", target = "fotoPerfil", qualifiedByName = "converterImagemParaByte")
    Beneficiario toEntity(BeneficiarioCadastroDTO beneficiarioCadastroDTO);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "nome", target = "nome")
    @Mapping(source = "nomePai", target = "nomePai")
    @Mapping(source = "nomeMae", target = "nomeMae")
    @Mapping(source = "cpf", target = "cpf")
    @Mapping(source = "dataNascimento", target = "dataNascimento")
    @Mapping(source = "escolaridade", target = "escolaridade")
    @Mapping(source = "intolerancia", target = "intolerancia")
    @Mapping(source = "observacao", target = "observacao")
    @Mapping(source = "fotoPerfil", target = "fotoPerfil", qualifiedByName = "converterImagemParaByte")
    Beneficiario toEntity(BeneficiarioAtualizaDTO beneficiarioAtualizaDTO);

    @Mapping(source = "fotoPerfil", target = "fotoPerfilBase64", qualifiedByName = "converterByteParaBase64")
    BeneficiarioDetalhesDTO toDetalhesDto(Beneficiario beneficiario);

    BeneficiarioDTO toDto(Beneficiario beneficiario);

    Beneficiario toEntity(BeneficiarioDetalhesDTO beneficiarioDetalhesDTO);

//    @Mapping(source = "fotoPerfilBase64", target = "fotoPerfil" , qualifiedByName = "converterBase64ParaImagem")
//    BeneficiarioAtualizaDTO toAtualizaDto(BeneficiarioDetalhesDTO beneficiarioDetalhesDTO);
}
