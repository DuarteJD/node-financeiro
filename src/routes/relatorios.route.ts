import { Router } from 'express';

import RelatoriosController  from '../controller/RelatoriosController';

const routes = Router();
const controlador = new RelatoriosController();

routes.get('/resumo-categoria', controlador.resumo_categorias);
routes.get('/resumo-contas/:data', controlador.resumo_contas);
routes.get('/detalhes-conta/:conta', controlador.detalhes_conta);

export default routes;
