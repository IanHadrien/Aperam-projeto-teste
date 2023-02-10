import { Router } from 'express';

import imageController from '../controllers/ImageController';

const router = new Router();

router.post('/', imageController.store);
router.get('/', imageController.index);
router.get('/search/:search', imageController.search);
router.put('/:id', imageController.update);
router.delete('/:id', imageController.destroy);

export default router;
