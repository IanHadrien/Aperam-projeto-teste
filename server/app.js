import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './src/database';

import express from 'express';
import homeRoutes from './src/routes/homeRoutes';
import usuarioRoutes from './src/routes/usuarioRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import imageRoutes from './src/routes/imageRoutes';

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/usuario/', usuarioRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/image/', imageRoutes);
  }
}

export default new App().app;
