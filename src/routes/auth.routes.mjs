import { Router } from 'express';
import authController from '../controllers/auth.controller.mjs';

const router = Router();

/** Define rutas principales */
router.post( '/api/auth', authController.loginUser );
router.get( '/api/auth/status', authController.statusUser );



export default router;