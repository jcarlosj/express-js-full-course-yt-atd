import { Router } from 'express';
import authController from '../controllers/auth.controller.mjs';
import { loginUserValidationSchema } from '../utils/login-user-validation.schema.mjs';

const router = Router();

/** Define rutas principales */
router.post( '/api/auth', loginUserValidationSchema , authController.loginUser );
router.get( '/api/auth/status', authController.statusUser );



export default router;