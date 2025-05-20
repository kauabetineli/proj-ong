package com.github.onganiza.entity.doador;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class DoadorPessoaJuridica extends Doador {
    private String razaoSocial;
    private String cnpj;
}
