package com.github.onganiza.entity.doador;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CNPJ;

@Entity
@Getter
@Setter
public class DoadorPessoaJuridica extends Doador {
    private String razaoSocial;

    @CNPJ
    @Column(unique = true)
    private String cnpj;
}
