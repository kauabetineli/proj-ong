package com.github.onganiza.controller.mapper;

import com.github.onganiza.controller.dto.EstoqueProdutoDTO;
import com.github.onganiza.entity.Estoque;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EstoqueMapper {

    EstoqueProdutoDTO toEstoqueProdutoDTO(Estoque estoque);

}
