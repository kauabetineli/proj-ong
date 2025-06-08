package com.github.onganiza.entity;

import com.github.onganiza.entity.produto.Produto;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Estoque {

    @Id
    private Integer id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "produto_id")
    private Produto produto;

    private Double quantidade;

    public Estoque() {}

    public Estoque(Produto produto, Double quantidade) {
        this.id = produto.getId();
        this.produto = produto;
        this.quantidade = quantidade;
    }
}
