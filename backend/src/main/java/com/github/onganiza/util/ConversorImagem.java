package com.github.onganiza.util;

import org.mapstruct.Named;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.naming.InvalidNameException;
import java.io.IOException;
import java.util.Base64;

@Component
public class ConversorImagem {

    @Named("converterImagemParaByte")
    public byte[] converterImagemParaByte(MultipartFile arquivo) throws IOException, InvalidNameException {
        // verifica se o arquivo é uma imagem válida

        if (arquivo == null || arquivo.isEmpty()) {
            return new byte[0];
        }

        String tipoArquivo = arquivo.getContentType();

        if (tipoArquivo != null && !tipoArquivo.startsWith("image")) {
            throw new InvalidNameException("O arquivo não é uma imagem válida");
        }

        return arquivo.getBytes();  // converte a imagem para byte[]
    }

    @Named("converterByteParaBase64")
    public static String converterByteParaBase64(byte[] imagem) {
        if (imagem == null || imagem.length == 0) {
            return null;
        }
        return Base64.getEncoder().encodeToString(imagem);
    }



}
