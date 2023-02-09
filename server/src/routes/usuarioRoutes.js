import { Router } from 'express';
import usuarioController from '../controllers/UsuarioController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', usuarioController.store);
router.get('/', loginRequired, usuarioController.index);
router.get('/:id', usuarioController.show);
router.put('/:id', usuarioController.update);
router.delete('/:id', usuarioController.delete);

export default router;

/*
index -> lista todos os usuarios - GET
store/create -> cria um novo usuaria - POST
delete -> apaga um usuaria - DELETE
show -> mostra um usuaria - GET
update -> atualiza um usuaria - PATCH ou PUT
*/
