import { Router } from 'express';

import RelatoriosController  from '../controller/RelatoriosController';

const routes = Router();
const controlador = new RelatoriosController();

routes.get('/resumo-contas/:data', controlador.resumo_contas);
routes.get('/detalhes-contas', controlador.detalhes_contas);
routes.get('/resumo-categoria', controlador.resumo_categorias);

export default routes;
