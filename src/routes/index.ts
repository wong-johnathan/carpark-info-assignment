import express from 'express';
import healthRouter from './health.route';
import carparkRouter from './carpark.routes';
import authRouter from './auth.routes';
import favouriteRouter from './favourite.routes';
const router = express.Router();

router.use('/health', healthRouter);

router.use('/carparks', carparkRouter);

router.use('/auth', authRouter);

router.use('/favourites', favouriteRouter);

export default router;
