package com.github.onganiza.service;

import com.github.onganiza.controller.dto.DoacaoCadastroDTO;
import com.github.onganiza.controller.dto.DoacaoDTO;
import com.github.onganiza.controller.mapper.DoacaoMapper;
import com.github.onganiza.entity.Estoque;
import com.github.onganiza.entity.doacao.Doacao;
import com.github.onganiza.entity.doacao.ItemDoacao;
import com.github.onganiza.entity.doador.Doador;
import com.github.onganiza.entity.produto.Produto;
import com.github.onganiza.repository.DoacaoRepository;
import com.github.onganiza.repository.DoadorRepository;
import com.github.onganiza.repository.EstoqueRepository;
import com.github.onganiza.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoacaoService {

    private final DoacaoRepository repository;
    private final ProdutoRepository produtoRepository;
    private final EstoqueRepository estoqueRepository;
    private final DoadorRepository doadorRepository;
    private final DoacaoMapper mapper;

    public Doacao salvarDoacao(DoacaoCadastroDTO dto) {
        Doacao doacao = mapper.toEntity(dto);

        Doador doador = doadorRepository.findById(dto.doadorId())
                .orElseThrow(() -> new RuntimeException("doador nao encontrado"));
        doacao.setDoador(doador);

        List<ItemDoacao> itens = dto.itens().stream().map(itemDTO -> {
            Produto produto = produtoRepository.findById(itemDTO.produtoId())
                    .orElseThrow(() -> new RuntimeException("produto nao encontrado"));

            // Incrementa o estoque
            Estoque estoque = estoqueRepository.findByProduto(produto)
                    .orElse(new Estoque(produto, 0.0)); // cria se não existir
            estoque.setQuantidade(estoque.getQuantidade() + itemDTO.quantidade());
            estoqueRepository.save(estoque);

            ItemDoacao item = new ItemDoacao();
            item.setProduto(produto);
            item.setQuantidade(itemDTO.quantidade());
            item.setDoacao(doacao);
            return item;
        }).toList();

        doacao.setItens(itens);
        return repository.save(doacao);
    }

    public List<DoacaoDTO> listarDoacoes() {
        return repository.findAll().stream()
                .map(mapper::toDto)
                .toList();
    }

    public void excluirDoacao(Integer id) {
        Doacao doacao = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doação não encontrada"));

        // Decrementa o estoque
        for (ItemDoacao item : doacao.getItens()) {
            Produto produto = item.getProduto();
            Estoque estoque = estoqueRepository.findByProduto(produto)
                    .orElseThrow(() -> new RuntimeException("Estoque do produto não encontrado"));

            Double novaQuantidade = estoque.getQuantidade() - item.getQuantidade();
            // evita negativo
            estoque.setQuantidade(Math.max(novaQuantidade, 0));
            estoqueRepository.save(estoque);
        }

        repository.delete(doacao);
    }
}

