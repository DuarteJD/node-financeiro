import dotenv from 'dotenv';
import "reflect-metadata";
import 'express-async-errors'

import express from "express";

dotenv.config();

import routes from "./routes";
import errorHandler from './erros/handler';

declare global {
  namespace Express {
    interface Request {
      usuario: {
        id: string;
        tipo: number;
      }
    }
  }
}

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)
app.use(errorHandler)

app.listen(process.env.PORT || 3333, () => {
  console.log('Servidor iniciado. ' + process.env.PORT);
})
