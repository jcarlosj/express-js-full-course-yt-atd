import { Router } from 'express';

import rootRoutes from './root.routes.mjs';
import userRoutes from './user.routes.mjs';
import productRoutes from './product.routes.mjs';
import authRoutes from './auth.routes.mjs';
import cartRoutes from './cart.routes.mjs';

const router = Router();

/** Define rutas principales */
router.use( rootRoutes );
router.use( authRoutes );
router.use( userRoutes );
router.use( productRoutes );
router.use( cartRoutes );

export default router;