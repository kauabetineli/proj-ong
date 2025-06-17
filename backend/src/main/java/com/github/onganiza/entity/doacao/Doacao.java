package com.github.onganiza.entity.doacao;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.github.onganiza.entity.doador.Doador;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Doacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "doador_id")
    private Doador doador;

    private LocalDateTime data;

    @OneToMany(mappedBy = "doacao", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ItemDoacao> itens = new ArrayList<>();

}
