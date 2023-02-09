import dotenv from 'dotenv';

dotenv.config();

import './src/database';

import express from 'express';
import homeRoutes from './src/routes/homeRoutes';
import usuarioRoutes from './src/routes/usuarioRoutes';
import tokenRoutes from './src/routes/tokenRoutes';

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/usuario/', usuarioRoutes);
    this.app.use('/tokens/', tokenRoutes);
  }
}

export default new App().app;
