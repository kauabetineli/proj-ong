package com.github.onganiza.repository;

import com.github.onganiza.entity.doador.Doador;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoadorRepository extends JpaRepository<Doador, Integer> {
}
