import { Router } from 'express';
import usuarioController from '../controllers/UsuarioController';

const router = new Router();

router.post('/', usuarioController.store);

export default router;

/*
index -> lista todos os usuarios - GET
store/create -> cria um novo usuaria - POST
delete -> apaga um usuaria - DELETE
show -> mostra um usuaria - GET
update -> atualiza um usuaria - PATCH ou PUT
*/
