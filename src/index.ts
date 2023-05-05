import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import usersRouter from './routes/user';
import mongoose, { MongooseOptions } from 'mongoose';

const app = express();

// Configuración
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const mongodbUri = 'mongodb://localhost/my-db';


mongoose
  .connect(mongodbUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

// Manejadores de rutas
app.use('/users', usersRouter);

// Inicialización del servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});