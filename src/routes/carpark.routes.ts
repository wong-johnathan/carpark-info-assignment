import express from 'express';
import { getCarParks, getCarParkById } from '../controllers/carpark.controller';

const router = express.Router();

router.get('/', getCarParks);

router.get('/:car_park_no', getCarParkById);

export default router;
