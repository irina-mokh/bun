import { Router } from 'express';
import { actionRouter } from './actionRouter.js';
import { categoryRouter } from './categoryRouter.js';
import { userRouter } from './userRouter.js'

export const router = new Router();

router.use('/action', actionRouter);
router.use('/category', categoryRouter);
router.use('/user', userRouter);