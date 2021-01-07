import { Router } from 'express';

import  ContasController  from '../controller/ContasController';

const routes = Router();
const controlador = new ContasController();

routes.get('/', controlador.all);
routes.get('/:id', controlador.one);
routes.post('/', controlador.save);
routes.put('/:id', controlador.update);
routes.delete('/:id', controlador.remove);

export default routes;
