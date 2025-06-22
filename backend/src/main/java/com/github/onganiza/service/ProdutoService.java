package com.github.onganiza.service;

import com.github.onganiza.controller.dto.produto.ProdutoCadastroDTO;
import com.github.onganiza.controller.dto.produto.ProdutoDTO;
import com.github.onganiza.controller.mapper.ProdutoMapper;
import com.github.onganiza.entity.Beneficiario;
import com.github.onganiza.entity.Escolaridade;
import com.github.onganiza.entity.produto.ClassificacaoProduto;
import com.github.onganiza.entity.produto.Produto;
import com.github.onganiza.entity.produto.UnidadeMedida;
import com.github.onganiza.repository.EstoqueRepository;
import com.github.onganiza.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository repository;
    private final ProdutoMapper mapper;
    private final EstoqueRepository estoqueRepository;
//    private final EstoqueService estoqueService;

//    public ProdutoDTO salvar(ProdutoCadastroDTO produtoCadastroDTO) {
//        Produto produtoSalvo = repository.save(mapper.toEntity(produtoCadastroDTO));
//        estoqueService.criarEstoque(produtoSalvo);
//        return mapper.toDto(produtoSalvo);
//    }

    public List<ProdutoDTO> listarTodos(){
        return repository.findAll()
                .stream()
                .map(mapper::toDto)
                .toList();
    }

    public ProdutoDTO atualizar(ProdutoDTO produtoDTO) {
        return mapper.toDto(repository.save(mapper.toEntity(produtoDTO)));
    }

    public ProdutoDTO buscarPorId(Integer id) {
        return mapper.toDto(repository.findById(id).orElse(null));
    }

    public void deletar(Integer id) {
        estoqueRepository.deleteById(id);
        repository.deleteById(id);
    }

    public boolean produtoExiste(Integer id) {
        return repository.existsById(id);
    }

    public List<ProdutoDTO> filtrar(Map<String, String> parametros) {

        Map<String, Function<String, List<Produto>>> filtros = new HashMap<>();

        filtros.put("id", valor -> {
            Integer id = Integer.parseInt(valor);
            return Collections.singletonList(repository.findById(id).orElse(null));
        });
        filtros.put("nome", repository::findAllByNomeContainingIgnoreCase);
        filtros.put("unidadeMedida", valor -> {
            UnidadeMedida unidadeMedida = UnidadeMedida.valueOf(valor);
            return repository.findAllByUnidadeMedida(unidadeMedida);
        });
        filtros.put("classificacao", valor -> {
            ClassificacaoProduto classificacaoProduto = ClassificacaoProduto.valueOf(valor);
            return repository.findAllByClassificacao(classificacaoProduto);
        });

        List<Produto> produtos = parametros.entrySet().stream()
                .filter(entrada -> filtros.containsKey(entrada.getKey()))
                .map(entrada -> filtros.get(entrada.getKey()).apply(entrada.getValue()))
                .flatMap(List::stream)
                .toList();

        return produtos.stream()
                .filter(Objects::nonNull)
                .map(mapper::toDto)
                .toList();

    }
}
