package com.github.onganiza.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Beneficiario {

    @Column
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String nome;

    @Column
    private String nomePai;

    @Column
    private String nomeMae;

    @Column
    @CPF
    private String cpf;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @Enumerated(EnumType.STRING)
    private Escolaridade escolaridade;

    @Column
    private String intolerancia;

    @Column
    private String observacao;

    @Lob
    @Column(name = "foto_perfil")
    private byte[] fotoPerfil;

    @CreatedDate // coloca a data hora atual no banco
    @Column(name = "data_cadastro")
    private LocalDateTime dataCadastro;

    @LastModifiedDate // sempre que fazer um update, atualiza a data de atualizacao de cadastro
    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;

}
