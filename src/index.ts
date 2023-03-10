import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import RecaptchaRoute from './routes/recaptcha.route';
import cors from 'cors'
import bodyParser from 'body-parser';
import { PORT } from './config/env';
import logger from './middleware/logger';
import path from 'path'
import hbs from 'hbs'
import { connectToDb } from './config/dbConnection';
import logRouter from './routes/logs.route';
import http from 'http'
import { Server } from 'socket.io'

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors<Request>())
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use('/recaptcha', RecaptchaRoute);
app.use('/api', logRouter)
app.use(logger)
const server = http.createServer(app)
export const io = new Server(server)
app.get('/', (req: Request, res: Response) => {
  res.render('main', { title: 'reCAPTCHA Microservice' })
})

const start = async () => {
  await connectToDb()
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

}

start()