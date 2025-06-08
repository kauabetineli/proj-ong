package com.github.onganiza.controller.mapper;

import com.github.onganiza.controller.dto.DoacaoCadastroDTO;
import com.github.onganiza.controller.dto.DoacaoDTO;
import com.github.onganiza.controller.dto.ItemDoacaoCadastroDTO;
import com.github.onganiza.controller.dto.ItemDoacaoDTO;
import com.github.onganiza.entity.doacao.Doacao;
import com.github.onganiza.entity.doacao.ItemDoacao;
import com.github.onganiza.entity.doador.Doador;
import com.github.onganiza.entity.doador.DoadorPessoaFisica;
import com.github.onganiza.entity.doador.DoadorPessoaJuridica;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DoacaoMapper {

    @Mapping(target = "data", expression = "java(java.time.LocalDateTime.now())")
    @Mapping(target = "doador", ignore = true) // setado manualmente no service
    @Mapping(target = "itens", ignore = true) // setado manualmente no service
    Doacao toEntity(DoacaoCadastroDTO dto);

    ItemDoacao toEntity(ItemDoacaoCadastroDTO dto);

    // será usado para listagem
    @Mapping(source = "doador", target = "doador")
    DoacaoDTO toDto(Doacao doacao);

    @Mapping(source = "produto.nome", target = "nomeProduto")
    ItemDoacaoDTO toDto(ItemDoacao item);

    default String mapDoadorToString(Doador doador) {
        if (doador == null) {
            return null;
        }
        if (doador instanceof DoadorPessoaFisica pf) {
            return pf.getNome();
        }
        if (doador instanceof DoadorPessoaJuridica pj) {
            return pj.getRazaoSocial();
        }
        return null;
    }
}
