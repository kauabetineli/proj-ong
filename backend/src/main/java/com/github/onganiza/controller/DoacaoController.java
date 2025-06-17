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

    private final DoacaoService doacaoService;

    @GetMapping
    public ResponseEntity<List<DoacaoDTO>> listarDoacoes() {
        try {
            List<DoacaoDTO> lista = doacaoService.listarDoacoes();
            return ResponseEntity.ok(lista);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Doacao> salvarDoacao(@RequestBody DoacaoCadastroDTO doacaoCadastroDTO) {
        try{
            return ResponseEntity.ok(doacaoService.salvarDoacao(doacaoCadastroDTO));
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
            Doacao doacaoAtualizada = doacaoService.atualizarDoacao(id, doacaoCadastroDTO);
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
            doacaoService.excluirDoacao(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }



}
