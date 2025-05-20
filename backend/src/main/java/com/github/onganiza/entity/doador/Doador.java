package com.github.onganiza.entity.doador;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Inheritance(strategy = InheritanceType.JOINED) // ou SINGLE_TABLE
@Getter
@Setter
public abstract class Doador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

}