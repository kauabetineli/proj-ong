package com.github.onganiza.repository;

import com.github.onganiza.entity.doador.Doador;
import com.github.onganiza.entity.doador.DoadorPessoaFisica;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoadorPessoaFisicaRepository extends JpaRepository<DoadorPessoaFisica, Integer> {
    List<Doador> findAllByCpfContainingIgnoreCase(String cpf);

    List<Doador> findAllByNomeContainingIgnoreCase(String nome);
}
