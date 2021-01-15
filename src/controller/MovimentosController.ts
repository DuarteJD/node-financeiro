import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Movimentos } from '../entity/Movimentos';

import MovimentosServiceCriar from "../services/MovimentosServiceCriar";
import MovimentosServiceAtualizar from "../services/MovimentosServiceAtualizar";
import MovimentosServiceCancelar from "../services/MovimentosServiceCancelar";


export default class MovimentosController {

  public async all(request: Request, response: Response): Promise<Response> {
    const todosRegistros = await getRepository(Movimentos).find();
    return response.json(todosRegistros)
  }

  public async one(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const umRegistro = await getRepository(Movimentos).findOneOrFail(id)
    return response.json(umRegistro)
  }

  async save(request: Request, response: Response): Promise<Response> {
    const corpo = request.body
    const service = new MovimentosServiceCriar()

    const registro = await service.execute(corpo)
    return response.json(registro)
  }

  async update(request: Request, response: Response): Promise<Response> {

    const id = request.params.id
    const corpo = request.body
    const service = new MovimentosServiceAtualizar()

    const registro = await service.execute(id, corpo)
    return response.json(registro)
  }

  async cancel(request: Request, response: Response): Promise<Response> {

    const id = request.params.id
    const service = new MovimentosServiceCancelar()
    await service.execute({ id })

    return response.status(204).json()
  }
}
