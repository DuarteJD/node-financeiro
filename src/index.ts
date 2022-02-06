import "reflect-metadata";
import 'express-async-errors'
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';

import express, { Application } from "express";

dotenv.config();

createConnection().catch(error => console.log('Erro de conexão ' + error));

import routes from "./routes";
import errorHandler from './erros/handler';

declare global {
  namespace Express {
    interface Request {
      usuario: {
        id: string;
        tipo: number;
        empresa: string;
      }
    }
  }
}

const app : Application = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)
app.use(errorHandler)

app.listen(process.env.PORT || 3333, () => {
  console.log('Servidor iniciado. ' + process.env.PORT);
})
