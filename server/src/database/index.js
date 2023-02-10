import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Usuario from '../models/Usuario';
import Image from '../models/Image';

const models = [
  Usuario,
  Image,
];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
