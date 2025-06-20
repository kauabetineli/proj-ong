package com.github.onganiza.controller;

import com.github.onganiza.controller.dto.LoginDTO;
import com.github.onganiza.controller.dto.usuario.UsuarioDTO;
import com.github.onganiza.controller.dto.usuario.UsuarioDetalhesDTO;
import com.github.onganiza.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {

    private final UsuarioService service;

    @PostMapping("/login")
    public ResponseEntity<UsuarioDetalhesDTO> login(
            @RequestBody LoginDTO login
    ){
        try{
            UsuarioDetalhesDTO usuario = service.autenticar(login.cpf(), login.senha());
            if(usuario == null) return ResponseEntity.notFound().build();
            return ResponseEntity.ok(usuario);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }
}
