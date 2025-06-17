package com.github.onganiza.service;

import com.github.onganiza.controller.dto.produto.ProdutoCadastroDTO;
import com.github.onganiza.controller.dto.produto.ProdutoDTO;
import com.github.onganiza.controller.mapper.ProdutoMapper;
import com.github.onganiza.entity.produto.Produto;
import com.github.onganiza.repository.EstoqueRepository;
import com.github.onganiza.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;

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

}
