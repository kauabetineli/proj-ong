package com.github.onganiza.entity.produto;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nome;

    @Enumerated(EnumType.STRING)
    private ClassificacaoProduto classificacao;

    @Enumerated(EnumType.STRING)
    private UnidadeMedida unidadeMedida;

//    @CreatedDate // coloca a data hora atual no banco
//    @Column(name = "data_cadastro")
//    private LocalDateTime dataCadastro;
//
//    @LastModifiedDate // sempre que fazer um update, atualiza a data de atualizacao de cadastro
//    @Column(name = "data_atualizacao")
//    private LocalDateTime dataAtualizacao;
}
