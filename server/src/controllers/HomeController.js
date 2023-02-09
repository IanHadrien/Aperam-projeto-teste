import Usuario from '../models/Usuario';

class HomeController {
  async index(req, res) {
    const novoUsuario = await Usuario.create({
      name: 'Ian Teste',
      email: 'Ian@teste.com',
      password: 'test12334',
    });

    res.json(novoUsuario);
  }
}

export default new HomeController();
