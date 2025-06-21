package com.github.onganiza.controller;

import com.github.onganiza.controller.dto.beneficiario.BeneficiarioAtualizaDTO;
import com.github.onganiza.controller.dto.beneficiario.BeneficiarioCadastroDTO;
import com.github.onganiza.controller.dto.beneficiario.BeneficiarioDTO;
import com.github.onganiza.controller.dto.beneficiario.BeneficiarioDetalhesDTO;
import com.github.onganiza.service.BeneficiarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.github.onganiza.util.VerificadorIdade.possuiIdadeAte18AnosCompletos;
import static com.github.onganiza.util.VerificadorIdade.possuiMaioridade;

@RestController
@RequestMapping("/beneficiarios")
@CrossOrigin("*")
@RequiredArgsConstructor
public class BeneficiarioController {

    private final BeneficiarioService service;

    @PostMapping
    public ResponseEntity<BeneficiarioDetalhesDTO> salvar(
            @ModelAttribute @Valid BeneficiarioCadastroDTO beneficiarioCadastroDTO
    ) {
        try {

            if(!possuiIdadeAte18AnosCompletos(beneficiarioCadastroDTO.dataNascimento())) throw new Exception();

            return ResponseEntity.ok(service.salvar(beneficiarioCadastroDTO));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<BeneficiarioDTO>> buscarTodos() {
        return ResponseEntity.ok(service.buscarTodos());
    }

    @GetMapping("/busca")
    public ResponseEntity<List<BeneficiarioDTO>> filtrarUsuarios(
            @RequestParam String chave,
            @RequestParam String valor
    ) {
        try {
            Map<String, String> parametros = Map.of(chave, valor);
            return ResponseEntity.ok(service.filtrar(parametros));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<BeneficiarioDetalhesDTO>> buscarPorId(
            @PathVariable Integer id
    ) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletar(
            @PathVariable Integer id
    ){
        try {
            if(!service.beneficiarioExiste(id)) return ResponseEntity.notFound().build();
            service.deletar(id);
            return ResponseEntity.ok("Beneficiario deletado com sucesso");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PatchMapping()
    public ResponseEntity<String> atualizar(
            @ModelAttribute @Valid BeneficiarioAtualizaDTO beneficiarioAtualizaDTO
    ){
        try {
            if(!possuiIdadeAte18AnosCompletos(beneficiarioAtualizaDTO.dataNascimento())) throw new Exception();
          service.atualizar(beneficiarioAtualizaDTO);
          return ResponseEntity.ok("Beneficiario atualizado com sucesso");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

}
