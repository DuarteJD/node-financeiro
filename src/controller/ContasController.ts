import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Contas } from '../entity/Contas';
import ContasServiceExcluir from "../services/ContasServiceExcluir";


export default class ContasController {

  public async all(request: Request, response: Response): Promise<Response> {
    const todosRegistros = await getRepository(Contas).find();
    return response.json(todosRegistros)
  }

  public async one(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const umRegistro = await getRepository(Contas).findOne(id)
    return response.json(umRegistro)
  }

  async save(request: Request, response: Response): Promise<Response> {
    const corpo = request.body
    const registro = await getRepository(Contas).save(corpo)
    return response.json(registro)
  }

  async update(request: Request, response: Response): Promise<Response> {

    const id = request.params.id
    const corpo = request.body
    const linhas = await getRepository(Contas).update(id, corpo)
    if(!linhas.affected) {
      return response.status(404).json({ message: 'Registro não encontrado!'})
    }

    const registro = await getRepository(Contas).findOne(id)
    return response.json(registro)
  }

  async remove(request: Request, response: Response): Promise<Response> {

    const id = request.params.id
    const remover = await getRepository(Contas).findOne(id)
    if(!remover) {
      return response.status(404).json({ message: 'Registro não encontrado!'})
    }

    await getRepository(Contas).remove(remover)
    return response.status(204).json()
  }
}
