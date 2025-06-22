package com.github.onganiza.entity.doador;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CPF;

@Entity
@Getter
@Setter
public class DoadorPessoaFisica extends Doador {
    private String nome;

    @CPF
    @Column(unique = true)
    private String cpf;
}