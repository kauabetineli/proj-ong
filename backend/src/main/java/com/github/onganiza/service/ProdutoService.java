package com.github.onganiza.service;

import com.github.onganiza.controller.dto.produto.ProdutoCadastroDTO;
import com.github.onganiza.controller.dto.produto.ProdutoDTO;
import com.github.onganiza.controller.mapper.ProdutoMapper;
import com.github.onganiza.entity.produto.Produto;
import com.github.onganiza.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository repository;
    private final ProdutoMapper mapper;

    public ProdutoDTO salvar(ProdutoCadastroDTO produtoCadastroDTO) {
        return mapper.toDto(repository.save(mapper.toEntity(produtoCadastroDTO)));
    }

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
        repository.deleteById(id);
    }

    public boolean produtoExiste(Integer id) {
        return repository.existsById(id);
    }

}
