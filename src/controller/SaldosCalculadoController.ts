import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { SaldosCalculado } from '../entity/SaldosCalculado';

export default class MovimentosController {

  public async all(request: Request, response: Response): Promise<Response> {
    const todosRegistros = await getRepository(SaldosCalculado).find();
    return response.json(todosRegistros)
  }
}
