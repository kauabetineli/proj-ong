package com.github.onganiza.controller;

import com.github.onganiza.controller.dto.produto.ProdutoCadastroDTO;
import com.github.onganiza.controller.dto.produto.ProdutoDTO;
import com.github.onganiza.service.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProdutoController {

    private final ProdutoService service;

    @GetMapping
    public ResponseEntity<List<ProdutoDTO>> listarTodos(){
        try{
            return ResponseEntity.ok(service.listarTodos());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<ProdutoDTO> salvar(@RequestBody ProdutoCadastroDTO produtoCadastroDTO){
        try {
            return ResponseEntity.ok(service.salvar(produtoCadastroDTO));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // TODO Substituir esta função para uma de filtro dependendo do atributo/valor
    @GetMapping("/{id}")
    public ResponseEntity<ProdutoDTO> buscarPorId(@PathVariable Integer id){
        try {
            return ResponseEntity.ok(service.buscarPorId(id));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletar(@PathVariable Integer id){
        try {
            if(!service.produtoExiste(id)) return ResponseEntity.notFound().build();
            service.deletar(id);
            return ResponseEntity.ok("Produto deletado com sucesso");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PatchMapping()
    public ResponseEntity<ProdutoDTO> atualizar(@RequestBody ProdutoDTO produtoDTO){
        try {
            return ResponseEntity.ok(service.atualizar(produtoDTO));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }




}
