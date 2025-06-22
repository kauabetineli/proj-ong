package com.github.onganiza.service;

import com.github.onganiza.entity.Estoque;
import com.github.onganiza.entity.produto.Produto;
import com.github.onganiza.entity.saida.ItemSaida;
import com.github.onganiza.entity.saida.SaidaItem;
import com.github.onganiza.repository.EstoqueRepository;
import com.github.onganiza.repository.SaidaItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SaidaItemService {

    private final SaidaItemRepository repository;
    private final EstoqueRepository estoqueRepository;

    public SaidaItem salvar(SaidaItem saidaItem){
        SaidaItem novaSaida = repository.save(saidaItem);

        novaSaida.getProdutos().forEach(prodLista -> {
            Produto produto = prodLista.getProduto();
            Estoque estoque = estoqueRepository.findByProduto(produto)
                    .orElseThrow(() -> new RuntimeException("Estoque não existe"));
            Double quantidadeEmEstoque = estoque.getQuantidade();
            Double quantidadeSaidaItem = prodLista.getQuantidade();
            Double quantidadeQueDecrementaraEstoque = quantidadeEmEstoque - quantidadeSaidaItem;
            estoque.setQuantidade(quantidadeQueDecrementaraEstoque);
            estoqueRepository.save(estoque);
        });

        return novaSaida;
    }

    public SaidaItem atualizar(Integer id, SaidaItem saidaItemParametro){
        Optional<SaidaItem> saidaAtual = repository.findById(id);

        if(saidaAtual.isEmpty()) throw new RuntimeException("Saida não existe.");

        saidaAtual.get().getProdutos().forEach( prodLista -> {
            Produto produto = prodLista.getProduto();
            Estoque estoque = estoqueRepository.findByProduto(produto)
                    .orElseThrow(() -> new RuntimeException("Estoque não existe"));
            Double quantidadeEmEstoque = estoque.getQuantidade();
            Double quantidadeSaidaItem = prodLista.getQuantidade();
            Double quantidadeAoSerRemovidoItemSaida = quantidadeEmEstoque + quantidadeSaidaItem;
            estoque.setQuantidade(quantidadeAoSerRemovidoItemSaida);
            estoqueRepository.save(estoque);
        });

        SaidaItem novaSaida = new SaidaItem();

        List<ItemSaida> itens = saidaItemParametro.getProdutos()
                .stream()
                .map(itemParam -> {
                        Produto produto = itemParam.getProduto();
                        Estoque estoque = estoqueRepository.findByProduto(produto)
                                .orElseThrow(() -> new RuntimeException("Estoque não existe"));
                        Double qtdeItemNaSaida = itemParam.getQuantidade();
                        Double quantidadeAtualEmEstoque = estoque.getQuantidade();
                        estoque.setQuantidade(quantidadeAtualEmEstoque - qtdeItemNaSaida);

                        ItemSaida item = new ItemSaida();
                        item.setProduto(produto);
                        item.setQuantidade(qtdeItemNaSaida);
                        item.setSaida(novaSaida);

                    return item;
                }).toList();

        novaSaida.setId(saidaAtual.get().getId());
        novaSaida.setDataSaida(saidaAtual.get().getDataSaida());
        novaSaida.setProdutos(itens);
        return repository.save(novaSaida);
    }

    public void deletar(Integer id/*, SaidaItem saidaItem*/){

        Optional<SaidaItem> saida = repository.findById(id);

        if(saida.isEmpty()) throw new RuntimeException("Saida de Itens não existente.");

        saida.get().getProdutos().forEach(prodLista -> {
            Produto produto = prodLista.getProduto();
            Estoque estoque = estoqueRepository.findByProduto(produto)
                    .orElseThrow(() -> new RuntimeException("Estoque não existe"));
            Double quantidadeEmEstoque = estoque.getQuantidade();
            Double quantidadeSaidaItem = prodLista.getQuantidade();
            Double quantidadeQueIncrementaraEstoque = quantidadeEmEstoque + quantidadeSaidaItem;
            estoque.setQuantidade(quantidadeQueIncrementaraEstoque);
            estoqueRepository.save(estoque);
        });

//        saidaItem.getProdutos().forEach(prodLista -> {
//            Produto produto = prodLista.getProduto();
//            Estoque estoque = estoqueRepository.findByProduto(produto)
//                    .orElseThrow(() -> new RuntimeException("Estoque não existe"));
//            Double quantidadeEmEstoque = estoque.getQuantidade();
//            Double quantidadeSaidaItem = prodLista.getQuantidade();
//            Double quantidadeQueIncrementaraEstoque = quantidadeEmEstoque + quantidadeSaidaItem;
//            estoque.setQuantidade(quantidadeQueIncrementaraEstoque);
//            estoqueRepository.save(estoque);
//        });

        repository.deleteById(id);
    }

    public List<SaidaItem> listar(){
        return repository.findAll();
    }

    public Optional<SaidaItem> detalharSaidaItem(Integer id) {
        Optional<SaidaItem> saida = repository.findById(id);
        return saida;

    }
}
