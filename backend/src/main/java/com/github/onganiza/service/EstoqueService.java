package com.github.onganiza.service;

import com.github.onganiza.controller.dto.EstoqueProdutoDTO;
import com.github.onganiza.controller.dto.produto.ProdutoDTO;
import com.github.onganiza.controller.mapper.EstoqueMapper;
import com.github.onganiza.entity.Estoque;
import com.github.onganiza.entity.Usuario;
import com.github.onganiza.entity.produto.Produto;
import com.github.onganiza.repository.EstoqueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class EstoqueService {

    private final EstoqueRepository repository;
    private final EstoqueMapper mapper;
    private final ProdutoService produtoService;

    public void criarEstoque(Produto produto) {
        Estoque estoque = new Estoque();
        estoque.setProduto(produto);
        estoque.setQuantidade(0.0);
        repository.save(estoque);
    }

    public List<EstoqueProdutoDTO> listarEstoques() {
        List<Estoque> estoques = repository.findAll();
        List<EstoqueProdutoDTO> lista = new ArrayList<>();

        for (Estoque estoque : estoques) {
            ProdutoDTO produtoDTO = produtoService.buscarPorId(estoque.getProduto().getId());
            lista.add(new EstoqueProdutoDTO(produtoDTO, estoque.getQuantidade()));
        }

        return lista;
    }

    public List<EstoqueProdutoDTO> filtrarEstoque(Map<String, String> parametros){

        Map<String, Function<String, List<Estoque>>> filtros = new HashMap<>();

        filtros.put("id", valor -> {
            Integer id = Integer.parseInt(valor);
            return Collections.singletonList(repository.findById(id).orElse(null));
        });
        filtros.put("nome", repository::findByProdutoNomeContainingIgnoreCase);

        List<Estoque> estoques = parametros.entrySet().stream()
                .filter(entrada -> filtros.containsKey(entrada.getKey()))
                .map(entrada -> filtros.get(entrada.getKey()).apply(entrada.getValue()))
                .flatMap(List::stream)
                .filter(Objects::nonNull)
                .toList();

        return estoques.stream()
                .map(mapper::toEstoqueProdutoDTO)
                .toList();
    }

//    public void removerEstoque(Integer idEstoque) {
//        repository.deleteById(idEstoque);
//    }

}
