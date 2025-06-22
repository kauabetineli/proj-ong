package com.github.onganiza.controller;

import com.github.onganiza.controller.dto.produto.ProdutoCadastroDTO;
import com.github.onganiza.controller.dto.produto.ProdutoDTO;
import com.github.onganiza.controller.mapper.ProdutoMapper;
import com.github.onganiza.entity.produto.Produto;
import com.github.onganiza.repository.ProdutoRepository;
import com.github.onganiza.service.EstoqueService;
import com.github.onganiza.service.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/produtos")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProdutoController {

    private final ProdutoService service;
    private final ProdutoMapper mapper;
    private final ProdutoRepository repository;
    private final EstoqueService estoqueService;

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
            Produto produtoSalvo = repository.save(mapper.toEntity(produtoCadastroDTO));
            estoqueService.criarEstoque(produtoSalvo);
            return ResponseEntity.ok(mapper.toDto(produtoSalvo));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // TODO Substituir esta função para uma de filtro dependendo do atributo/valor
    @GetMapping("/{id}")
    public ResponseEntity<ProdutoDTO> buscarPorId(@PathVariable(name = "id") Integer id){
        try {
            return ResponseEntity.ok(service.buscarPorId(id));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/busca")
    public ResponseEntity<List<ProdutoDTO>> filtrarProdutos(
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

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletar(@PathVariable(name = "id") Integer id){
        try {
            if(!service.produtoExiste(id)) return ResponseEntity.notFound().build();

            service.deletar(id);
            return ResponseEntity.ok("Produto deletado");
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
