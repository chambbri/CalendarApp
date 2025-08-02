import express from 'express';
import { createUserHandler, loginUserHandler } from '../controllers/userController';

const router = express.Router();

router.post('/auth/register', createUserHandler);
router.post('/auth/login', loginUserHandler);

export default router;