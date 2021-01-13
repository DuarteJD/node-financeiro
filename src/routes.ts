import { Router } from "express";

import contasRouter from './routes/contas.route';
import categoriasRouter from './routes/categorias.route';

const routes = Router();

routes.use('/contas', contasRouter);
routes.use('/categorias', categoriasRouter);

export default routes;
