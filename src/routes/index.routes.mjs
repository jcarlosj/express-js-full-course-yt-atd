import { Router } from 'express';

import rootRoutes from './root.routes.mjs';
import userRoutes from './user.routes.mjs';
import productRoutes from './product.routes.mjs';

const router = Router();

/** Define rutas principales */
router.use( rootRoutes );
router.use( userRoutes );
router.use( productRoutes );

export default router;