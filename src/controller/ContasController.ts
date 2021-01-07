import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Contas } from '../entity/Contas';

export default class ContasController {

  public async all(request: Request, response: Response): Promise<Response> {
    const todosMotivos = await getRepository(Contas).find();
    return response.json(todosMotivos)
  }

  public async one(request: Request, response: Response): Promise<Response> {
    const motivoID = request.params.id
    const umMotivo = await getRepository(Contas).findOne(motivoID)
    return response.json(umMotivo)
  }

  async save(request: Request, response: Response): Promise<Response> {
    const corpo = request.body
    const motivo = await getRepository(Contas).save(corpo)
    return response.json(motivo)
  }

  async update(request: Request, response: Response): Promise<Response> {

    const { id } = request.params
    const corpo = request.body
    const row = await getRepository(Contas).update(id, corpo)
    if(!row.affected) {
      return response.status(404).json({ message: 'Registro não encontrado!'})
    }

    const motivo = await getRepository(Contas).findOne(id)
    return response.json(motivo)
  }

  async remove(request: Request, response: Response): Promise<Response> {

    const motivoID = request.params.id
    const remover = await getRepository(Contas).findOne(motivoID)
    if(!remover) {
      return response.status(404).json({ message: 'Registro não encontrado!'})
    }

    await getRepository(Contas).remove(remover)
    return response.status(204).json()
  }
}
