import express from 'express';
import { createAccount, login } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', createAccount);

router.post('/login', login);

export default router;
