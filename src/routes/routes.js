import express from 'express';
import registerUserController from '../controllers/registerController.js';
import loginUserController from '../controllers/loginController.js';

const router = express.Router();

router.post('/register', registerUserController);
router.post('/login', loginUserController);

export default router;