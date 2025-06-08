package com.github.onganiza.repository;

import com.github.onganiza.entity.doacao.Doacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoacaoRepository extends JpaRepository<Doacao, Integer> {
}
