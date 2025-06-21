package com.github.onganiza.util;

import java.time.LocalDate;
import java.time.Period;

public class VerificadorIdade {

    public static boolean possuiMaioridade(LocalDate dataNascimentoParametro){
        LocalDate dataAtual = LocalDate.now();
        Period periodo = Period.between(dataNascimentoParametro, dataAtual);
        System.out.println(
                "Dias: " + periodo.getDays() + "\n" +
                "Meses: " + periodo.getMonths() + "\n" +
                "Anos: " + periodo.getYears());
        int idadeDoCadastrado = periodo.getYears();
        System.out.println("Idade do usuario: " + idadeDoCadastrado);
        return idadeDoCadastrado >= 18;
    }

    public static boolean possuiIdadeAte18AnosCompletos(LocalDate dataNascimentoParametro){
        LocalDate dataAtual = LocalDate.now();
        Period periodo = Period.between(dataNascimentoParametro, dataAtual);
        System.out.println(
                "Dias: " + periodo.getDays() + "\n" +
                "Meses: " + periodo.getMonths() + "\n" +
                "Anos: " + periodo.getYears());
        int idadeDoCadastrado = periodo.getYears();
        System.out.println("Idade do usuario: " + idadeDoCadastrado);
        return idadeDoCadastrado < 19;
    }



}
