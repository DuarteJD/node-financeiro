import { Router } from "express";

import contasRouter from './routes/contas.route';

const routes = Router();

routes.use('/contas', contasRouter);

export default routes;
