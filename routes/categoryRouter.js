import { Router } from 'express';
import { categoryController } from '../controllers/categoryController.js';
export const categoryRouter = new Router();

categoryRouter.get('/', categoryController.getAll);
categoryRouter.get('/', categoryController.getById);
categoryRouter.post('/', categoryController.create);
categoryRouter.put('/', categoryController.edit);
categoryRouter.delete('/', categoryController.delete);
