import { Model, DataTypes } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class Usuario extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false,
        validate: {
          len: {
            args: [3, 255],
            msg: 'O nome deve ter entre 3 e 255 caracteres.',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false,
        unique: {
          args: true,
          msg: 'O e-mail informado já está sendo utilizado.',
        },
        validate: {
          isEmail: {
            msg: 'Email inválido.',
          },
        },
      },
      password_hash: { // senha COM hash
        type: DataTypes.STRING,
        defaultValue: '',
      },
      password: { // senha SEM hash
        type: DataTypes.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [8, 50],
            msg: 'A senha deve ter entre 8 e 50 caracteres.',
          },
        },
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (usuario) => {
      usuario.password_hash = await bcryptjs.hash(usuario.password, 8);
    });

    return this;
  }
}
