import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { SaldosCalculado } from '../entity/SaldosCalculado';

import SaldosCalculadoServiceCalcular from "../services/SaldosCalculadoServiceCalcular";

export default class MovimentosController {

  public async all(request: Request, response: Response): Promise<Response> {
    const todosRegistros = await getRepository(SaldosCalculado).find();
    return response.json(todosRegistros)
  }

  async compute(request: Request, response: Response): Promise<Response> {
    const { conta_id } = request.body
    const service = new SaldosCalculadoServiceCalcular()

    await service.execute(conta_id)

    const todosRegistros = await getRepository(SaldosCalculado).find();
    return response.json(todosRegistros)
  }
}
