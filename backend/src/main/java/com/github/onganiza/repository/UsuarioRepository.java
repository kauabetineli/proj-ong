package com.github.onganiza.repository;

import com.github.onganiza.entity.Setor;
import com.github.onganiza.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    List<Usuario> findByNomeContaining(String nome);

    List<Usuario> findBySetor(Setor setor);

    Usuario findByCpf(String cpf);

}
