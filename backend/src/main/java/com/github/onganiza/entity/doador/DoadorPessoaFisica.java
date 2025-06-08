package com.github.onganiza.entity.doador;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class DoadorPessoaFisica extends Doador {
    private String nome;
    private String cpf;
}