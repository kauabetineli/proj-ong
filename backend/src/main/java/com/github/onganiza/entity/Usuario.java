package com.github.onganiza.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.validator.constraints.br.CPF;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
//@NoArgsConstructor
//@AllArgsConstructor
@Entity
@Getter
@Setter
@ToString
@EntityListeners(AuditingEntityListener.class)
public class Usuario {

    @Column
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String nome;

    @Column
    @CPF
    private String cpf;

    @Column
    private String senha;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @Column
    private String endereco;

    @Column
    @Enumerated(EnumType.STRING)
    private Setor setor;

    @Lob
    @Column(name = "foto_perfil")
    private byte[] fotoPerfil;

    @Column(name = "tipo_usuario")
    @Enumerated(EnumType.STRING)
    private TipoUsuario tipoUsuario;

    @CreatedDate // coloca a data hora atual no banco
    @Column(name = "data_cadastro")
    private LocalDateTime dataCadastro;

    @LastModifiedDate // sempre que fazer um update, atualiza a data de atualizacao de cadastro
    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;



}
