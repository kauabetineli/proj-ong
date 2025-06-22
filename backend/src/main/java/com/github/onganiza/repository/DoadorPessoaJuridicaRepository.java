package com.github.onganiza.repository;

import com.github.onganiza.entity.doador.Doador;
import com.github.onganiza.entity.doador.DoadorPessoaJuridica;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoadorPessoaJuridicaRepository extends JpaRepository<DoadorPessoaJuridica, Integer> {
    List<Doador> findAllByCnpjContainingIgnoreCase(String cnpj);

    List<Doador> findAllByRazaoSocialContainingIgnoreCase(String razaoSocial);
}
