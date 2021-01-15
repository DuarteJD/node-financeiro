import { Router } from 'express';

import  MovimentosController  from '../controller/MovimentosController';

const routes = Router();
const controlador = new MovimentosController();

routes.get('/', controlador.all);
routes.get('/:id', controlador.one);
routes.post('/', controlador.save);
routes.put('/:id', controlador.update);
routes.delete('/:id', controlador.cancel);

export default routes;
