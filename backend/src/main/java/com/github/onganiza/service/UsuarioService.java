package com.github.onganiza.service;

import com.github.onganiza.controller.dto.UsuarioCadastroDTO;
import com.github.onganiza.controller.dto.UsuarioDTO;
import com.github.onganiza.controller.dto.UsuarioDetalhesDTO;
import com.github.onganiza.controller.mapper.UsuarioMapper;
import com.github.onganiza.entity.Setor;
import com.github.onganiza.entity.Usuario;
import com.github.onganiza.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository repository;
    private final UsuarioMapper mapper;

    public UsuarioDetalhesDTO save(UsuarioCadastroDTO usuarioCadastroDTO) {
//        return repository.save(usuario);
        return mapper.toDetalhesDto(repository.save(mapper.toEntity(usuarioCadastroDTO)));
    }

    public List<UsuarioDTO> findAll() {
        return repository.findAll()
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Filtra e recupera uma lista de usuários com base em parâmetros específicos de busca.
     * O método suporta filtragem por atributos como 'id', 'nome', 'setor' e 'cpf'.
     *
     * @param parametros um mapa contendo critérios de busca onde as chaves são nomes de atributos
     *                   (ex: "id", "nome") e os valores são os valores correspondentes para filtro.
     * @return uma lista de usuários filtrados representados como {@link UsuarioDTO}, ou uma lista vazia
     * se nenhum usuário corresponder aos critérios.
     */
    public List<UsuarioDTO> filtrarUsuarios(Map<String, String> parametros) {
//        if(parametros.isEmpty()) throw new IllegalArgumentException("Necessario informar um parametro");

        Map<String, Function<String, List<Usuario>>> filtros = new HashMap<>();

        filtros.put("id", valor -> {
            Integer id = Integer.parseInt(valor);
            return Collections.singletonList(repository.findById(id).orElse(null));
        });
        filtros.put("nome", repository::findByNomeContaining);
        filtros.put("setor", valor -> {
            Setor setor = Setor.valueOf(valor);
            return repository.findBySetor(setor);
        });
        filtros.put("cpf", valor -> Collections.singletonList(repository.findByCpf(valor)));

        List<Usuario> usuarios = parametros.entrySet().stream()
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

    public Optional<UsuarioDetalhesDTO> findById(Integer id) {
        return repository.findById(id)
                .map(mapper::toDetalhesDto);
    }



}
