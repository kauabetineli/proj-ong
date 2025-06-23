package com.github.onganiza.controller;

import com.github.onganiza.controller.dto.EstoqueProdutoDTO;
import com.github.onganiza.service.EstoqueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/estoque")
@RequiredArgsConstructor
public class EstoqueController {

    private final EstoqueService service;

    @GetMapping
    public ResponseEntity<List<EstoqueProdutoDTO>> listarTodos() {
        try{
            return ResponseEntity.ok(service.listarEstoques());
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/busca")
    public ResponseEntity<List<EstoqueProdutoDTO>> filtrarEstoque(
            @RequestParam(name = "chave") String chave,
            @RequestParam(name = "valor") String valor
    ) {
        Map<String, String> parametros = Map.of(chave, valor);
        return ResponseEntity.ok(service.filtrarEstoque(parametros));
    }

}
