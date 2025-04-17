import { Router } from 'express';

import cartController from '../controllers/cart.controller.mjs';

const router = Router();

/** Define rutas principales */
router.post( '/api/cart', cartController.addToCart );
router.get( '/api/cart/status', cartController.statusCart );


export default router;