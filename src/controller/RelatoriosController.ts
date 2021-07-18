import { getRepository } from "typeorm";
import { Request, Response } from "express";

import RelatoriosServiceResumoContas  from '../services/RelatoriosServiceResumoContas';

export default class MovimentosController {
  public async resumo_contas(request: Request, response: Response): Promise<Response> {
    const data = request.params.data

    const service = new RelatoriosServiceResumoContas()

    const registro = await service.execute(data)

    return response.json(registro);

  }
  public async detalhes_contas(request: Request, response: Response): Promise<void> {
  }
  public async resumo_categorias(request: Request, response: Response): Promise<void> {
  }
}
