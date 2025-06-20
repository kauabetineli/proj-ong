package com.github.onganiza.entity.saida;

import com.github.onganiza.entity.produto.Produto;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ItemSaida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "produto_id")
    private Produto produto;

    private Double quantidade;

    @ManyToOne
    @JoinColumn(name = "saida_item_id")
    private SaidaItem saida;

}
