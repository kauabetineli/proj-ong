package com.github.onganiza.service;

import com.github.onganiza.controller.dto.usuario.UsuarioAtualizaDTO;
import com.github.onganiza.controller.dto.usuario.UsuarioCadastroDTO;
import com.github.onganiza.controller.dto.usuario.UsuarioDTO;
import com.github.onganiza.controller.dto.usuario.UsuarioDetalhesDTO;
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

    public UsuarioDetalhesDTO salvarUsuario(UsuarioCadastroDTO usuarioCadastroDTO) {
//        return repository.save(usuario);
        return mapper.toDetalhesDto(repository.save(mapper.toEntity(usuarioCadastroDTO)));
    }

    public List<UsuarioDTO> buscarTodos() {
        return repository.findAll()
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

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

    public Optional<UsuarioDetalhesDTO> buscarPorId(Integer id) {
        return repository.findById(id)
                .map(mapper::toDetalhesDto);
    }

    public boolean deletarUsuario(Integer id) {
        if(!usuarioExiste(id)) return false;

        repository.deleteById(id);

        return true;
    }

    public boolean atualizarUsuario(UsuarioAtualizaDTO usuarioAtualizaDTO) {
        if(!usuarioExiste(usuarioAtualizaDTO.id())) return false;

        Usuario usuario = mapper.toEntity(usuarioAtualizaDTO);
        Optional<Usuario> usuarioAtt = repository.findById(usuarioAtualizaDTO.id());

        usuarioAtt.ifPresent(value -> usuario.setSenha(value.getSenha()));

        repository.save(usuario);

        return true;
    }

    public UsuarioDetalhesDTO autenticar(String cpf, String senha) {
        Usuario usuario = repository.findByCpf(cpf);

        if(usuario == null) return null;

        if(!usuario.getSenha().equals(senha)) return null;

        return mapper.toDetalhesDto(usuario);
    }

    private boolean usuarioExiste(Integer id) {
        return repository.existsById(id);
    }

}
