import { Router, Request, Response } from "express";

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  return response.json({message: "Hellow Word"})
})

export default routes;
