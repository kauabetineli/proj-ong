package com.github.onganiza.entity.doacao;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.github.onganiza.entity.produto.Produto;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class ItemDoacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "doacao_id")
    @JsonBackReference
    private Doacao doacao;

    @ManyToOne
    @JoinColumn(name = "produto_id")
    private Produto produto;

    private Double quantidade;

}
