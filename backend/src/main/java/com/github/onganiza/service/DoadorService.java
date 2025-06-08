package com.github.onganiza.service;

import com.github.onganiza.controller.dto.doador.DoadorListagemDTO;
import com.github.onganiza.controller.dto.doador.DoadorPessoaFisicaDTO;
import com.github.onganiza.controller.dto.doador.DoadorPessoaJuridicaDTO;
import com.github.onganiza.controller.mapper.DoadorMapper;
import com.github.onganiza.entity.doador.Doador;
import com.github.onganiza.entity.doador.DoadorPessoaFisica;
import com.github.onganiza.entity.doador.DoadorPessoaJuridica;
import com.github.onganiza.repository.DoadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoadorService {

    private final DoadorRepository repository;
    private final DoadorMapper mapper;

    public DoadorPessoaFisicaDTO salvar(DoadorPessoaFisicaDTO doadorPessoaFisicaDTO) {
        repository.save(mapper.toEntity(doadorPessoaFisicaDTO));
        return doadorPessoaFisicaDTO;
    }

    public DoadorPessoaJuridicaDTO salvar(DoadorPessoaJuridicaDTO doadorPessoaJuridicaDTO) {
        repository.save(mapper.toEntity(doadorPessoaJuridicaDTO));
        return doadorPessoaJuridicaDTO;
    }

    public List<DoadorListagemDTO> listarTodos() {
        List<Doador> lista = repository.findAll();
        return lista
                .stream()
                .map(mapper::toListagemDto)
                .toList();
    }
}
