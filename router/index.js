import { Router } from 'express';
import { actionRouter } from './action.js';
import { categoryRouter } from './category.js';
import { userRouter } from './user.js'

export const router = new Router();

router.use('/action', actionRouter);
router.use('/category', categoryRouter);
router.use('/user', userRouter);