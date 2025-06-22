package com.github.onganiza.controller;

import com.github.onganiza.controller.dto.doador.DoadorListagemDTO;
import com.github.onganiza.controller.dto.doador.DoadorPessoaFisicaDTO;
import com.github.onganiza.controller.dto.doador.DoadorPessoaJuridicaDTO;
import com.github.onganiza.service.DoadorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/doadores")
@CrossOrigin("*")
@RequiredArgsConstructor
public class DoadorController {

    private final DoadorService service;

    @PostMapping("/fisico")
    public ResponseEntity<DoadorPessoaFisicaDTO> salvar(
            @RequestBody @Valid DoadorPessoaFisicaDTO doadorPessoaFisicaDTO
    ) {
        try{
            return ResponseEntity.ok(service.salvar(doadorPessoaFisicaDTO));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/juridico")
    public ResponseEntity<DoadorPessoaJuridicaDTO> salvar(
            @RequestBody @Valid DoadorPessoaJuridicaDTO doadorPessoaJuridicaDTO
    ) {
        try{
            return ResponseEntity.ok(service.salvar(doadorPessoaJuridicaDTO));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<DoadorListagemDTO>> listarTodos() {
        try {
            return ResponseEntity.ok(service.listarTodos());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/busca")
    public ResponseEntity<List<DoadorListagemDTO>> filtrarDoadores(
            @RequestParam String chave,
            @RequestParam String valor
    ){
        try {
            Map<String, String> parametros = Map.of(chave, valor);
            return ResponseEntity.ok(service.filtrar(parametros));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoadorListagemDTO> detalharDoador(
            @PathVariable(name = "id") Integer id
    ) {
        try {
            return ResponseEntity.ok(service.detalharDoador(id));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(
            @PathVariable(name = "id") Integer id
    ){
        try {
            service.deletarDoador(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

}
