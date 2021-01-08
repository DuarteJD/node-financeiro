import "reflect-metadata";
import 'express-async-errors'
import { createConnection } from 'typeorm'

import * as express from "express";
import * as bodyParser from "body-parser";

createConnection();

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

app.use(bodyParser.json())
app.use(routes)
app.use(errorHandler)

app.listen(3333, () => {
  console.log('Server started at 3333!');
})
