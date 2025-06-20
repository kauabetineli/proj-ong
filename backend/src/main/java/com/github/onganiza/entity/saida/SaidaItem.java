package com.github.onganiza.entity.saida;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class SaidaItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDate dataSaida;

    @OneToMany(mappedBy = "saida", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemSaida> produtos = new ArrayList<>();

}
