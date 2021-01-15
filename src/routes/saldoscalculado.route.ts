import { Router } from 'express';

import  SaldosCalculadoController  from '../controller/SaldosCalculadoController';

const routes = Router();
const controlador = new SaldosCalculadoController();

routes.get('/', controlador.all);

export default routes;
