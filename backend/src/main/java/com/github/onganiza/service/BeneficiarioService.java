package com.github.onganiza.service;

import com.github.onganiza.controller.dto.beneficiario.BeneficiarioAtualizaDTO;
import com.github.onganiza.controller.dto.beneficiario.BeneficiarioCadastroDTO;
import com.github.onganiza.controller.dto.beneficiario.BeneficiarioDTO;
import com.github.onganiza.controller.dto.beneficiario.BeneficiarioDetalhesDTO;
import com.github.onganiza.controller.mapper.BeneficiarioMapper;
import com.github.onganiza.entity.Beneficiario;
import com.github.onganiza.entity.Escolaridade;
import com.github.onganiza.repository.BeneficiarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class BeneficiarioService {

    private final BeneficiarioMapper mapper;
    private final BeneficiarioRepository repository;

    public BeneficiarioDetalhesDTO salvar(BeneficiarioCadastroDTO beneficiarioCadastroDTO) {
        return mapper.toDetalhesDto(repository.save(mapper.toEntity(beneficiarioCadastroDTO)));
    }

    public List<BeneficiarioDTO> buscarTodos(){
        return repository.findAll()
                .stream()
                .map(mapper::toDto)
                .toList();
    }

    public List<BeneficiarioDTO> filtrar(Map<String, String> parametros) {
//        if(parametros.isEmpty()) throw new IllegalArgumentException("Necessario informar um parametro");

        Map<String, Function<String, List<Beneficiario>>> filtros = new HashMap<>();

        filtros.put("id", valor -> {
            Integer id = Integer.parseInt(valor);
            return Collections.singletonList(repository.findById(id).orElse(null));
        });
        filtros.put("nome", repository::findByNomeContaining);
        filtros.put("escolaridade", valor -> {
            Escolaridade escolaridade = Escolaridade.valueOf(valor);
            return repository.findByEscolaridade(escolaridade);
        });
        filtros.put("cpf", valor -> Collections.singletonList(repository.findByCpf(valor)));

        List<Beneficiario> usuarios = parametros.entrySet().stream()
                .filter(entrada -> filtros.containsKey(entrada.getKey()))
                .map(entrada -> filtros.get(entrada.getKey()).apply(entrada.getValue()))
                .flatMap(List::stream)
                .toList();

//        if (usuarios.isEmpty()) throw new IllegalArgumentException("Nenhum usuario encontrado");

        return usuarios.stream()
                .filter(Objects::nonNull)
                .map(mapper::toDto)
                .toList();
    }

    public Optional<BeneficiarioDetalhesDTO> buscarPorId(Integer id) {
        return repository.findById(id)
                .map(mapper::toDetalhesDto);
    }

    public void deletar(Integer id) {
        repository.deleteById(id);
    }

    public boolean beneficiarioExiste(Integer id) {
        return repository.existsById(id);
    }

    public void atualizar(BeneficiarioAtualizaDTO beneficiarioAtualizaDTO) {
        repository.save(mapper.toEntity(beneficiarioAtualizaDTO));
    }
}
