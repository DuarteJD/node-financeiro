import { Router } from 'express';

import  SaldosCalculadoController  from '../controller/SaldosCalculadoController';

const routes = Router();
const controlador = new SaldosCalculadoController();

routes.get('/', controlador.all);
routes.post('/', controlador.compute);

export default routes;
