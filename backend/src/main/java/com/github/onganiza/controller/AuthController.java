package com.github.onganiza.controller;

import com.github.onganiza.controller.dto.LoginDTO;
import com.github.onganiza.controller.dto.usuario.UsuarioDTO;
import com.github.onganiza.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UsuarioService service;

    @PostMapping("/login")
    public ResponseEntity<UsuarioDTO> login(
            @RequestBody LoginDTO login
    ){
        UsuarioDTO usuario = service.autenticar(login.cpf(), login.senha());
        if(usuario == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(usuario);
    }
}
