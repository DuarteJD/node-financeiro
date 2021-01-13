import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Contas } from '../entity/Contas';

import ContasServiceCriar from "../services/ContasServiceCriar";
import ContasServiceAtualizar from "../services/ContasServiceAtualizar";
import ContasServiceCancelar from "../services/ContasServiceCancelar";


export default class ContasController {

  public async all(request: Request, response: Response): Promise<Response> {
    const todosRegistros = await getRepository(Contas).find();
    return response.json(todosRegistros)
  }

  public async one(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const umRegistro = await getRepository(Contas).findOneOrFail(id)
    return response.json(umRegistro)
  }

  async save(request: Request, response: Response): Promise<Response> {
    const corpo = request.body
    const service = new ContasServiceCriar()

    const registro = await service.execute(corpo)
    return response.json(registro)
  }

  async update(request: Request, response: Response): Promise<Response> {

    const id = request.params.id
    const corpo = request.body
    const service = new ContasServiceAtualizar()

    const registro = await service.execute(id, corpo)
    return response.json(registro)
  }

  async cancel(request: Request, response: Response): Promise<Response> {

    const id = request.params.id
    const service = new ContasServiceCancelar()
    await service.execute({ id })

    return response.status(204).json()
  }
}
