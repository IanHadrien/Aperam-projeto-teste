import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Usuario from '../models/Usuario';

const models = [Usuario];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
