import { Router } from 'express';
import { actionController } from '../controllers/actionController.js';

export const actionRouter = new Router();

actionRouter.get('/', actionController.getAll);
actionRouter.post('/', actionController.create);
actionRouter.put('/', actionController.edit);
actionRouter.delete('/', actionController.delete);