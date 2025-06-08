package com.github.onganiza.repository;

import com.github.onganiza.entity.Beneficiario;
import com.github.onganiza.entity.Escolaridade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BeneficiarioRepository extends JpaRepository<Beneficiario, Integer> {

    List<Beneficiario> findByNomeContaining(String nome);

    Beneficiario findByCpf(String cpf);

    List<Beneficiario> findByEscolaridade(Escolaridade escolaridade);


}
