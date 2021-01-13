import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Categorias } from '../entity/Categorias';

import CategoriasServiceCriar from "../services/CategoriasServiceCriar";
import CategoriasServiceAtualizar from "../services/CategoriasServiceAtualizar";
import CategoriasServiceCancelar from "../services/CategoriasServiceCancelar";


export default class CategoriasController {

  public async all(request: Request, response: Response): Promise<Response> {
    const todosRegistros = await getRepository(Categorias).find();
    return response.json(todosRegistros)
  }

  public async one(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const umRegistro = await getRepository(Categorias).findOneOrFail(id)
    return response.json(umRegistro)
  }

  async save(request: Request, response: Response): Promise<Response> {
    const corpo = request.body
    const service = new CategoriasServiceCriar()

    const registro = service.execute(corpo)
    return response.json(registro)
  }

  async update(request: Request, response: Response): Promise<Response> {

    const id = request.params.id
    const corpo = request.body
    const service = new CategoriasServiceAtualizar()

    const registro = await service.execute(id, corpo)
    return response.json(registro)
  }

  async cancel(request: Request, response: Response): Promise<Response> {

    const id = request.params.id
    const service = new CategoriasServiceCancelar()
    await service.execute({ id })

    return response.status(204).json()
  }
}
