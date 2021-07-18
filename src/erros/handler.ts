import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

import TratamentoErros from "../erros/TratamentoErros";

interface ValidationErrors {
  [key: string] : string[]
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if(error instanceof ValidationError) {
    let erros: ValidationErrors = {};

    error.inner.forEach(err => {
      erros[err.path] = err.errors;
    });

    return response.status(400).json({erro: true, erros})
  }

  if(error instanceof TratamentoErros) {
    return response.status(error.statusCode).json({
      status: 'erro',
      message: error.message
    })
  }

  return response.status(500).json({
    erro: true,
    mensage: JSON.stringify(error.message),
    mensagem: 'Já fomos reportados com este problema e já estamos trabalhando em uma solução, tente novamente mais tarde!',
  })
}

export default errorHandler;
