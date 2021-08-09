import { getRepository } from "typeorm";
import { Request, Response } from "express";

import RelatoriosServiceResumoContas  from '../services/RelatoriosServiceResumoContas';
import RelatoriosServiceResumoCategorias  from '../services/RelatoriosServiceResumoCategorias';
import RelatoriosServiceDetalhesConta  from '../services/RelatoriosServiceDetalhesConta';

export default class MovimentosController {
  public async resumo_contas(request: Request, response: Response): Promise<Response> {
    const data = request.params.data

    const service = new RelatoriosServiceResumoContas()

    const registro = await service.execute(data)

    return response.json(registro);
  }

  public async detalhes_conta(request: Request, response: Response): Promise<Response> {
    const conta = request.params.conta

    const service = new RelatoriosServiceDetalhesConta()

    const registro = await service.execute(conta)

    return response.json(registro);
  }

  public async resumo_categorias(request: Request, response: Response): Promise<Response> {

    const dataI = request.query.data_inicial ? request.query.data_inicial.toString() : ''
    const dataF = request.query.data_final ? request.query.data_final.toString() : ''

    const service = new RelatoriosServiceResumoCategorias()

    const registro = await service.execute(dataI, dataF)

    return response.json(registro);
  }
}
