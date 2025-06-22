package com.github.onganiza.controller;

import com.github.onganiza.controller.dto.DoacaoCadastroDTO;
import com.github.onganiza.controller.dto.DoacaoDTO;
import com.github.onganiza.entity.doacao.Doacao;
import com.github.onganiza.service.DoacaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doacoes")
@CrossOrigin("*")
@RequiredArgsConstructor
public class DoacaoController {

    private final DoacaoService service;

    @GetMapping
    public ResponseEntity<List<DoacaoDTO>> listarDoacoes() {
        try {
            List<DoacaoDTO> lista = service.listarDoacoes();
            return ResponseEntity.ok(lista);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoacaoDTO> detalharDoacao(
            @PathVariable(name = "id") Integer id
    ) {
        try {
            return ResponseEntity.ok(service.detalharDoacao(id));
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Doacao> salvarDoacao(@RequestBody DoacaoCadastroDTO doacaoCadastroDTO) {
        try{
            return ResponseEntity.ok(service.salvarDoacao(doacaoCadastroDTO));
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Doacao> atualizarDoacao(
            @PathVariable Integer id,
            @RequestBody DoacaoCadastroDTO doacaoCadastroDTO) {
        try {
            Doacao doacaoAtualizada = service.atualizarDoacao(id, doacaoCadastroDTO);
            return ResponseEntity.ok(doacaoAtualizada);
        } catch (RuntimeException e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirDoacao(
            @PathVariable Integer id
    ) {
        try {
            service.excluirDoacao(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }



}
