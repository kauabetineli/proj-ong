package com.github.onganiza.service;

import com.github.onganiza.controller.dto.doador.DoadorListagemDTO;
import com.github.onganiza.controller.dto.doador.DoadorPessoaFisicaDTO;
import com.github.onganiza.controller.dto.doador.DoadorPessoaJuridicaDTO;
import com.github.onganiza.controller.mapper.DoadorMapper;
import com.github.onganiza.entity.Beneficiario;
import com.github.onganiza.entity.doador.Doador;
import com.github.onganiza.entity.doador.DoadorPessoaFisica;
import com.github.onganiza.entity.doador.DoadorPessoaJuridica;
import com.github.onganiza.repository.DoadorPessoaFisicaRepository;
import com.github.onganiza.repository.DoadorPessoaJuridicaRepository;
import com.github.onganiza.repository.DoadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class DoadorService {

    private final DoadorRepository repository;
    private final DoadorPessoaFisicaRepository fisicaRepository;
    private final DoadorPessoaJuridicaRepository juridicaRepository;
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

    public DoadorListagemDTO detalharDoador(Integer id) {
        Optional<Doador> doador = repository.findById(id);

        if(doador.isEmpty()) return null;

        return mapper.toListagemDto(doador.get());
    }

    public void deletarDoador(Integer id){
        repository.deleteById(id);
    }

    public List<DoadorListagemDTO> filtrar(Map<String, String> parametros) {

        Map<String, Function<String, List<Doador>>> filtros = new HashMap<>();

        filtros.put("nome", fisicaRepository::findAllByNomeContainingIgnoreCase);
        filtros.put("cpf", fisicaRepository::findAllByCpfContainingIgnoreCase);
        filtros.put("cnpj", juridicaRepository::findAllByCnpjContainingIgnoreCase);
        filtros.put("razaoSocial", juridicaRepository::findAllByRazaoSocialContainingIgnoreCase);

        List<Doador> doadores = parametros.entrySet().stream()
                .filter(entrada -> filtros.containsKey(entrada.getKey()))
                .map(entrada -> filtros.get(entrada.getKey()).apply(entrada.getValue()))
                .flatMap(List::stream)
                .toList();

//        if (usuarios.isEmpty()) throw new IllegalArgumentException("Nenhum usuario encontrado");

        return doadores.stream()
                .filter(Objects::nonNull)
                .map(mapper::toListagemDto)
                .toList();

    }
}
