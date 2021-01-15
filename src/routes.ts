import { Router } from "express";

import contasRouter from './routes/contas.route';
import categoriasRouter from './routes/categorias.route';
import movimentosRouter from './routes/movimentos.route';

const routes = Router();

routes.use('/contas', contasRouter);
routes.use('/categorias', categoriasRouter);
routes.use('/movimentos', movimentosRouter)

export default routes;
