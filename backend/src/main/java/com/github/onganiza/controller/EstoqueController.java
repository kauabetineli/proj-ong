package com.github.onganiza.controller;

import com.github.onganiza.controller.dto.EstoqueProdutoDTO;
import com.github.onganiza.entity.Estoque;
import com.github.onganiza.entity.produto.Produto;
import com.github.onganiza.service.EstoqueService;
import com.github.onganiza.service.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/estoque")
@RequiredArgsConstructor
public class EstoqueController {

    private final EstoqueService estoqueService;

    @GetMapping
    public ResponseEntity<List<EstoqueProdutoDTO>> listarTodos() {
        try{
            return ResponseEntity.ok(estoqueService.listarEstoques());
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

}
