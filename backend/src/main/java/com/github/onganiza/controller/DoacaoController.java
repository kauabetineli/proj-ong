package com.github.onganiza.controller;

import com.github.onganiza.controller.dto.DoacaoCadastroDTO;
import com.github.onganiza.entity.doacao.Doacao;
import com.github.onganiza.service.DoacaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/doacoes")
@CrossOrigin("*")
@RequiredArgsConstructor
public class DoacaoController {

    private final DoacaoService doacaoService;

    @PostMapping
    public ResponseEntity<Doacao> salvarDoacao(@RequestBody DoacaoCadastroDTO doacaoCadastroDTO) {
        try{
            return ResponseEntity.ok(doacaoService.salvarDoacao(doacaoCadastroDTO));
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

}
