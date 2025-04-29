package com.github.onganiza.controller;

import com.github.onganiza.controller.dto.UsuarioCadastroDTO;
import com.github.onganiza.controller.dto.UsuarioDTO;
import com.github.onganiza.controller.dto.UsuarioDetalhesDTO;
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
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:63343"})
public class UsuarioController {

    private final UsuarioService service;

    @PostMapping
    public ResponseEntity<UsuarioDetalhesDTO> save(
            @ModelAttribute @Valid UsuarioCadastroDTO usuarioCadastroDTO // modelattribute devido a conter arquivo ao passar como parametro
            ) {

        return ResponseEntity.ok(service.save(usuarioCadastroDTO));
    }

    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<UsuarioDetalhesDTO>> findById(
            @PathVariable Integer id
    ) {
        return ResponseEntity.ok(service.findById(id));
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
    public ResponseEntity<String> delete(
            @PathVariable Integer id
    ) {
        boolean deleted = service.delete(id);
        if (deleted) {
            return ResponseEntity.ok("Usuário deletado com sucesso");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
