package com.github.onganiza.controller;

import com.github.onganiza.controller.dto.usuario.UsuarioAtualizaDTO;
import com.github.onganiza.controller.dto.usuario.UsuarioCadastroDTO;
import com.github.onganiza.controller.dto.usuario.UsuarioDTO;
import com.github.onganiza.controller.dto.usuario.UsuarioDetalhesDTO;
import com.github.onganiza.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UsuarioController {

    private final UsuarioService service;

    @PostMapping
    public ResponseEntity<UsuarioDetalhesDTO> salvarUsuario(
            @ModelAttribute @Valid UsuarioCadastroDTO usuarioCadastroDTO // modelattribute devido a conter arquivo ao passar como parametro
            ) {

        return ResponseEntity.ok(service.salvarUsuario(usuarioCadastroDTO));
    }

    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> buscarTodos() {
        return ResponseEntity.ok(service.buscarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDetalhesDTO> buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/busca")
    public ResponseEntity<List<UsuarioDTO>> filtrarUsuarios(
            @RequestParam String chave,
            @RequestParam String valor
    ) {
        Map<String, String> parametros = Map.of(chave, valor);
        return ResponseEntity.ok(service.filtrarUsuarios(parametros));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletarUsuario(
            @PathVariable Integer id
    ) {
        boolean usuarioDeletado = service.deletarUsuario(id);
        if (usuarioDeletado) {
            return ResponseEntity.ok("Usuário deletado com sucesso");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping()
    public ResponseEntity<String> atualizarUsuario(
            @ModelAttribute @Valid UsuarioAtualizaDTO usuarioAtualizaDTO
    ) {

        boolean usuarioAtualizado = service.atualizarUsuario(usuarioAtualizaDTO);

        if(usuarioAtualizado) {
            return ResponseEntity.ok("Usuário atualizado com sucesso");
        } else {
            return ResponseEntity.notFound().build();
        }

    }
}
