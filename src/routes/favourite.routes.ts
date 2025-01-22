import express from 'express';
import {
  addFavourite,
  removeFavourite,
  getFavourites,
} from '../controllers/favourite.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authenticateJWT, addFavourite);

router.delete('/', authenticateJWT, removeFavourite);

router.get('/', authenticateJWT, getFavourites);

export default router;
