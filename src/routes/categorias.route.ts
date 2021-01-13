import { Router } from 'express';

import  CategoriasController  from '../controller/CategoriasController';

const routes = Router();
const controlador = new CategoriasController();

routes.get('/', controlador.all);
routes.get('/:id', controlador.one);
routes.post('/', controlador.save);
routes.put('/:id', controlador.update);
routes.delete('/:id', controlador.cancel);

export default routes;
