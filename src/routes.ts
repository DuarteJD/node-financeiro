import { Router } from "express";

import contasRouter from './routes/contas.route';
import categoriasRouter from './routes/categorias.route';
import movimentosRouter from './routes/movimentos.route';
import saldosCalculadoRouter from './routes/saldoscalculado.route';

const routes = Router();

routes.use('/contas', contasRouter);
routes.use('/categorias', categoriasRouter);
routes.use('/movimentos', movimentosRouter);
routes.use('/saldos', saldosCalculadoRouter);

export default routes;
