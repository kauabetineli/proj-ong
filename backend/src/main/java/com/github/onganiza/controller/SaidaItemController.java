package com.github.onganiza.controller;

import com.github.onganiza.entity.saida.SaidaItem;
import com.github.onganiza.service.SaidaItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/saidas")
@RequiredArgsConstructor
public class SaidaItemController {

    private final SaidaItemService service;

    @PostMapping
    public ResponseEntity<SaidaItem> salvar(
            @RequestBody SaidaItem saidaItem
    ){
        try {
            SaidaItem saida = service.salvar(saidaItem);
            return ResponseEntity.ok(saida);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<SaidaItem>> listarTodas(){
        try {
            return ResponseEntity.ok(service.listar());
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<SaidaItem>> detalharSaida(
            @PathVariable(name = "id") Integer id
    ){
        try {
            return ResponseEntity.ok(service.detalharSaidaItem(id));
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<SaidaItem> atualizar(
            @PathVariable("id") Integer id,
            @RequestBody SaidaItem saidaItem
    ) {
        try {
            return ResponseEntity.ok(service.atualizar(id, saidaItem));
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletar(
            @PathVariable Integer id
//            @RequestBody SaidaItem saidaItem
    ){
        try {
            service.deletar(id/*, saidaItem*/);
            return ResponseEntity.ok().build();
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }


}
