package com.github.onganiza.controller.mapper;

import com.github.onganiza.controller.dto.doador.DoadorListagemDTO;
import com.github.onganiza.controller.dto.doador.DoadorPessoaFisicaDTO;
import com.github.onganiza.controller.dto.doador.DoadorPessoaJuridicaDTO;
import com.github.onganiza.entity.doador.Doador;
import com.github.onganiza.entity.doador.DoadorPessoaFisica;
import com.github.onganiza.entity.doador.DoadorPessoaJuridica;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DoadorMapper {

    DoadorPessoaFisica toEntity(DoadorPessoaFisicaDTO doadorPessoaFisicaDTO);

    DoadorPessoaFisicaDTO toDto(DoadorPessoaFisica doadorPessoaFisica);

    DoadorPessoaJuridica toEntity(DoadorPessoaJuridicaDTO doadorPessoaJuridicaDTO);

    DoadorPessoaJuridicaDTO toDto(DoadorPessoaJuridica doadorPessoaJuridica);

    @Mapping(target = "identificador", expression = "java(getIdentificador(doador))")
    @Mapping(target = "documento", expression = "java(getDocumento(doador))")
    DoadorListagemDTO toListagemDto(Doador doador);

    default String getIdentificador(Doador doador) {
        if (doador instanceof DoadorPessoaFisica pf) return pf.getNome();
        if (doador instanceof DoadorPessoaJuridica pj) return pj.getRazaoSocial();
        return null;
    }

    default String getDocumento(Doador doador) {
        if (doador instanceof DoadorPessoaFisica pf) return pf.getCpf();
        if (doador instanceof DoadorPessoaJuridica pj) return pj.getCnpj();
        return null;
    }

}
